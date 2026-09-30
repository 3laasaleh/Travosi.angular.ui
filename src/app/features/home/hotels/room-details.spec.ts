import { TestBed } from '@angular/core/testing';
import { convertToParamMap, ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import Swal from 'sweetalert2';
import { ApiService } from '../../../core/services/apiservice.service';
import { CurrencyService } from '../../../core/services/currency.service';
import { LanguageService } from '../../../core/services/language.service';
import { SeoService } from '../../../core/services/seo.service';
import { UtilityService } from '../../../core/services/utilityservice';
import { AuthService } from '../../user/_services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { RoomDetails } from './room-details';

const hotel = {
  id: 10,
  routeName: 'seaside',
  rooms: [{ id: 20, routeName: 'double-room', name: 'Double room', roomPeriodPrices: [] }],
};

describe('RoomDetails booking', () => {
  let api: {
    getUnauthntecated: ReturnType<typeof vi.fn>;
    postUnauthenticated: ReturnType<typeof vi.fn>;
    post: ReturnType<typeof vi.fn>;
  };
  let auth: { getCurentUser: ReturnType<typeof vi.fn>; isTokenExpired: ReturnType<typeof vi.fn> };

  async function setup(query: Record<string, string | string[]> = {}) {
    api = {
      getUnauthntecated: vi.fn().mockReturnValue(of({ data: hotel })),
      postUnauthenticated: vi.fn((url: string) => of(url === 'Bookings/CheckAvailability'
        ? { isSuccess: true, data: { isAvailable: true } }
        : { isSuccess: true, data: { id: 7, bookingNo: 'B-0000007' } })),
      post: vi.fn().mockReturnValue(of({ isSuccess: true, data: { id: 7, bookingNo: 'B-0000007' } })),
    };
    auth = { getCurentUser: vi.fn().mockReturnValue(null), isTokenExpired: vi.fn().mockReturnValue(true) };
    await TestBed.configureTestingModule({
      imports: [RoomDetails],
      providers: [
        { provide: ActivatedRoute, useValue: {
          snapshot: { queryParamMap: convertToParamMap(query) },
          paramMap: of(convertToParamMap({ routeName: 'seaside', roomRouteName: 'double-room' })),
        } },
        { provide: Router, useValue: { url: '/en/hotels/seaside/rooms/double-room', navigate: vi.fn() } },
        { provide: ApiService, useValue: api },
        { provide: AuthService, useValue: auth },
        { provide: CurrencyService, useValue: { currentCurrency: () => ({ code: 'USD' }) } },
        { provide: LanguageService, useValue: { currentLanguage: () => 'en' } },
        { provide: SeoService, useValue: { updateFrom: vi.fn(), markNotFound: vi.fn() } },
        { provide: UtilityService, useValue: { imageUrl: vi.fn(), imageAlt: vi.fn() } },
        { provide: TranslateService, useValue: { instant: (key: string) => key, currentLang: () => 'en' } },
      ],
    }).overrideComponent(RoomDetails, { set: { template: '' } }).compileComponents();
    const fixture = TestBed.createComponent(RoomDetails);
    const component = fixture.componentInstance;
    component.ngOnInit();
    return component;
  }

  afterEach(() => vi.restoreAllMocks());

  it('uses the selected stay for availability before opening guest booking', async () => {
    vi.spyOn(Swal, 'fire').mockResolvedValue({ isConfirmed: true } as any);
    const component = await setup({
      checkIn: '2030-05-10', checkOut: '2030-05-14', rooms: '2',
      adults: '2', children: '1', infants: '0', childrenAges: ['8'],
    });

    component.checkAvailability();
    const expectedStay = {
      HotelId: 10, HotelRoomId: 20, RoomCount: 2,
      Adults: 2, Children: 1, ChildrenAges: [8], Infants: 0,
      NumberOfTravelers: 3, DateFrom: '2030-05-10', DateTo: '2030-05-14',
    };
    expect(api.postUnauthenticated).toHaveBeenCalledWith('Bookings/CheckAvailability', expectedStay);
    expect(component.availabilityStatus).toBe('available');
    expect(component.guestBookingOpen).toBe(false);

    component.openGuestBookingModal();
    expect(component.guestBookingOpen).toBe(true);

    component.guestBookingForm.setValue({
      firstName: 'Sam', lastName: 'Guest', email: 'sam@example.com', mobile: '+1234567890',
    });
    component.submitGuestBooking();
    expect(api.postUnauthenticated).toHaveBeenCalledWith('Bookings/Guest', {
      ...expectedStay,
      GuestFirstName: 'Sam', GuestLastName: 'Guest',
      GuestEmail: 'sam@example.com', GuestMobile: '+1234567890',
    });
    expect(component.guestBookingOpen).toBe(false);
  });

  it('submits a signed-in booking after availability is confirmed', async () => {
    vi.spyOn(Swal, 'fire').mockResolvedValue({ isConfirmed: true } as any);
    const component = await setup({ checkIn: '2030-05-10', checkOut: '2030-05-14' });
    auth.getCurentUser.mockReturnValue({ userId: '1' });
    auth.isTokenExpired.mockReturnValue(false);

    component.checkAvailability();
    component.bookNow();

    expect(api.post).toHaveBeenCalledWith('Bookings', expect.objectContaining({
      HotelId: 10, HotelRoomId: 20, DateFrom: '2030-05-10', DateTo: '2030-05-14',
    }));
    expect(Swal.fire).toHaveBeenCalledWith(expect.objectContaining({
      icon: 'success', text: expect.stringContaining('B-0000007'),
    }));
  });

  it('asks for a hotel stay when a room is opened directly', async () => {
    const component = await setup();

    component.checkAvailability();

    expect(component.error).toBe('hotelStayRequired');
    expect(api.postUnauthenticated).not.toHaveBeenCalled();
    expect(api.post).not.toHaveBeenCalled();
  });
});
