import { ChangeDetectorRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { of, Subject, throwError } from 'rxjs';
import { ApiService } from '../../../../core/services/apiservice.service';
import { CurrencyService } from '../../../../core/services/currency.service';
import { AdminService } from '../../admin.service';
import { PackagesFromCard } from '../packages-from-card/packages-from-card';
import { PackageBenefitsEditor, packageRoomGroup } from './package-benefits-editor';

describe('Package destination and hotel selection', () => {
  const hotel = { id: 10, nameEng: 'Beach hotel', rooms: [
    { id: 101, nameEng: 'Family room', maxAdults: 2, maxChildren: 1, maxInfants: 1 },
    { id: 102, nameEng: 'Double room', maxAdults: 2, maxChildren: 0, maxInfants: 0 },
  ] };
  let api: { get: ReturnType<typeof vi.fn>; getUnauthntecated: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    api = {
      get: vi.fn(() => of({ isSuccess: true, data: [hotel] })),
      getUnauthntecated: vi.fn(() => of({ isSuccess: true, data: [{ id: 20, nameEng: 'City tour' }] })),
    };
    await TestBed.configureTestingModule({
      imports: [PackageBenefitsEditor],
      providers: [provideTranslateService(), { provide: ApiService, useValue: api },
        { provide: CurrencyService, useValue: { formatPrice: (value: number) => `$${value}` } }],
    }).compileComponents();
  });

  function setup(destinations: number[] = []) {
    const fixture = TestBed.createComponent(PackageBenefitsEditor);
    fixture.componentRef.setInput('rooms', new FormArray<FormGroup>([]));
    fixture.componentRef.setInput('transportations', new FormArray<FormGroup>([]));
    fixture.componentRef.setInput('tourIds', new FormControl<number[]>([], { nonNullable: true }));
    fixture.componentRef.setInput('destinationIds', destinations);
    return fixture;
  }

  it('does not crash when the tour control is temporarily undefined', () => {
    const fixture = setup();
    fixture.componentRef.setInput('tourIds', undefined);
    expect(() => fixture.detectChanges()).not.toThrow();
    expect(api.get).not.toHaveBeenCalled();
    fixture.componentRef.setInput('destinationIds', [1]);
    expect(() => fixture.detectChanges()).not.toThrow();
    expect(fixture.componentInstance.hotels()).toEqual([hotel]);
    const control = new FormControl<number[]>([], { nonNullable: true });
    fixture.componentRef.setInput('tourIds', control);
    fixture.detectChanges();
    fixture.componentInstance.toggleTour({ id: 20 });
    expect(control.value).toEqual([20]);
  });

  it('loads selected destinations and displays rooms only after hotel selection', () => {
    const fixture = setup([2, 1, 2]);
    fixture.detectChanges();
    expect(api.get).toHaveBeenCalledWith('Hotels/PackageBenefits?destinationIds=1&destinationIds=2');
    expect(api.getUnauthntecated).toHaveBeenCalledWith('Tours/ByDestination/1');
    expect(api.getUnauthntecated).toHaveBeenCalledWith('Tours/ByDestination/2');
    expect(fixture.nativeElement.querySelector('input[type=radio]')).toBeNull();
    fixture.nativeElement.querySelector('button[aria-controls="package-hotel-options"]').click();
    fixture.detectChanges();
    fixture.nativeElement.querySelector('#package-hotel-options input').click();
    fixture.detectChanges();
    expect(fixture.componentInstance.hotelNeedsRoom(hotel)).toBe(true);
    expect(fixture.componentInstance.rooms.invalid).toBe(true);
    expect(fixture.nativeElement.querySelectorAll('input[type=radio]').length).toBe(2);
    fixture.nativeElement.querySelector('input[type=radio]').click();
    fixture.detectChanges();
    expect(fixture.componentInstance.rooms.value[0].hotelRoomId).toBe(101);
    expect(fixture.componentInstance.rooms.valid).toBe(true);
    fixture.componentInstance.toggleRoom(hotel, hotel.rooms[1]);
    expect(fixture.componentInstance.rooms.length).toBe(1);
    expect(fixture.componentInstance.rooms.value[0].hotelRoomId).toBe(102);
  });

  it('keeps hotels usable when the tour endpoint fails', () => {
    api.getUnauthntecated.mockReturnValue(throwError(() => new Error('Tours failed')));
    const fixture = setup([1]);
    fixture.detectChanges();
    expect(fixture.componentInstance.hotels()).toEqual([hotel]);
    expect(fixture.componentInstance.loading()).toBe(false);
    expect(fixture.componentInstance.error()).toBe('');
    expect(fixture.componentInstance.toursError()).toBe('packageToursLoadError');
  });

  it('ignores old responses after destinations are cleared', () => {
    const hotelsResponse = new Subject<any>();
    const toursResponse = new Subject<any>();
    api.get.mockReturnValue(hotelsResponse);
    api.getUnauthntecated.mockReturnValue(toursResponse);
    const fixture = setup([1]);
    fixture.detectChanges();
    fixture.componentInstance.rooms.push(packageRoomGroup({ hotelId: 10, hotelRoomId: 101 }));
    fixture.componentRef.setInput('destinationIds', []);
    fixture.detectChanges();
    hotelsResponse.next({ data: [hotel] }); hotelsResponse.complete();
    toursResponse.next({ data: [{ id: 20 }] }); toursResponse.complete();
    expect(fixture.componentInstance.hotels()).toEqual([]);
    expect(fixture.componentInstance.tours()).toEqual([]);
    expect(fixture.componentInstance.rooms.length).toBe(0);
    expect(fixture.componentInstance.loading()).toBe(false);
    expect(fixture.componentInstance.toursLoading()).toBe(false);
  });

  it('preserves existing hotel and room selections on initial edit load', () => {
    const fixture = setup([1]);
    fixture.componentInstance.rooms.push(packageRoomGroup({ hotelId: 10, hotelRoomId: 101 }));
    fixture.detectChanges();
    expect(fixture.componentInstance.hotelSelected(hotel)).toBe(true);
    expect(fixture.componentInstance.selected(hotel.rooms[0])).toBe(true);
  });

  it.each(['checkbox', 'chip'])('resets hotels immediately when a destination is removed using %s', method => {
    const parent = new PackagesFromCard({} as AdminService,
      { markForCheck: vi.fn() } as unknown as ChangeDetectorRef, {} as TranslateService);
    parent.packageForm.controls.destinationIds.setValue([1, 2]);
    parent.packageForm.controls.hotelRooms.push(packageRoomGroup({ hotelId: 10, hotelRoomId: 101 }));
    if (method === 'checkbox') parent.toggleDestination({ id: 1 });
    else parent.removeDestination(1);
    expect(parent.packageForm.controls.destinationIds.value).toEqual([2]);
    expect(parent.packageForm.controls.hotelRooms.length).toBe(0);
    expect(parent.packageForm.controls.hotelRooms.dirty).toBe(true);
  });
});
