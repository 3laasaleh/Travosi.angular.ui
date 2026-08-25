import { ChangeDetectorRef, SimpleChange } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { of, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { ApiService } from '../../../../core/services/apiservice.service';
import {
  QuotationDTO,
  QuotationStatusEnum,
  QuotationsFromCard,
} from './quotations-from-card';

describe('QuotationsFromCard', () => {
  let component: QuotationsFromCard;
  let apiService: {
    get: ReturnType<typeof vi.fn>;
    post: ReturnType<typeof vi.fn>;
    put: ReturnType<typeof vi.fn>;
  };

  const flight = {
    id: 41,
    flightNumber: 'SW 104',
    airlineName: 'Sea World Air',
    airlineLogoUrl: '/images/airlines/sea-world-air.webp',
    departureAirport: 'CAI - Cairo International Airport',
    arrivalAirport: 'DXB - Dubai International Airport',
    departureTime: '2030-05-10T08:00:00',
    arrivalTime: '2030-05-10T12:00:00',
    price: 125,
    availableSeats: 12,
    isActive: true,
  };
  const hotel = {
    id: 31,
    name: 'Nile View Hotel',
    isActive: true,
    rooms: [{
      id: 301,
      name: 'Deluxe room',
      roomTypeName: 'Deluxe',
      mealPlanName: 'Breakfast',
      maxAdults: 2,
      maxChildren: 1,
      costPrice: 70,
      sellingPrice: 100,
      isActive: true,
    }],
  };

  beforeEach(() => {
    vi.restoreAllMocks();
    vi.spyOn(Swal, 'fire').mockResolvedValue({ isConfirmed: true } as any);
    apiService = {
      get: vi.fn((url: string) => {
        if (url.startsWith('Customers')) {
          return of({ data: { data: [{ id: 7, firstName: 'Mona', lastName: 'Ali' }] } });
        }
        if (url.startsWith('Packages')) {
          return of({ data: { items: [{ id: 11, nameEng: 'Dubai package' }] } });
        }
        if (url.startsWith('Tours')) {
          return of({ data: { tours: [{ id: 21, titleEng: 'City tour' }] } });
        }
        if (url.startsWith('Hotels')) {
          return of({ data: { data: [hotel] } });
        }
        if (url.startsWith('Flights/GetAll')) {
          return of({ data: { data: [flight] } });
        }
        return of({ data: [] });
      }),
      post: vi.fn().mockReturnValue(of({ isSuccess: true, message: 'Saved' })),
      put: vi.fn().mockReturnValue(of({ isSuccess: true, message: 'Updated' })),
    };

    TestBed.configureTestingModule({});
    component = TestBed.runInInjectionContext(() => new QuotationsFromCard(
      apiService as unknown as ApiService,
      { markForCheck: vi.fn() } as unknown as ChangeDetectorRef,
      { instant: (key: string) => key } as unknown as TranslateService,
    ));
  });

  it('loads and parses flights with the other quotation options on init', () => {
    component.ngOnInit();

    expect(apiService.get).toHaveBeenCalledWith('Customers?page=1&pageSize=100');
    expect(apiService.get).toHaveBeenCalledWith('Packages?page=1&pageSize=100');
    expect(apiService.get).toHaveBeenCalledWith('Tours?page=1&pageSize=100');
    expect(apiService.get).toHaveBeenCalledWith('Hotels?page=1&pageSize=100');
    expect(apiService.get).toHaveBeenCalledWith('Flights/GetAll?page=1&pageSize=100');
    expect(component.customers).toEqual([{ id: 7, firstName: 'Mona', lastName: 'Ali' }]);
    expect(component.packages).toEqual([{ id: 11, nameEng: 'Dubai package' }]);
    expect(component.tours).toEqual([{ id: 21, titleEng: 'City tour' }]);
    expect(component.hotels).toEqual([hotel]);
    expect(component.flights).toEqual([flight]);
    expect(component.optionsLoading).toBe(false);
  });

  it('uses the airline logo as the flight thumbnail', () => {
    expect(component.thumbnail(flight)).toMatch(/\/images\/airlines\/sea-world-air\.webp$/);
  });

  it('saves a hotel using its lowest active room rate and the quotation stay dates', () => {
    component.hotels = [hotel];
    component.toggleHotel(hotel, true);
    fillRequiredFields(component);

    component.saveQuotation();

    const [, payload] = apiService.post.mock.calls[0];
    expect(payload.items).toContainEqual(expect.objectContaining({
      itemType: 3,
      hotelId: hotel.id,
      description: 'Nile View Hotel - Deluxe room',
      quantity: 10,
      costPrice: 70,
      sellingPrice: 100,
      serviceStartDate: '2030-05-10',
      serviceEndDate: '2030-05-20',
      roomType: 'Deluxe',
      numberOfRooms: 1,
      mealPlan: 'Breakfast',
    }));
  });

  it('hides generated fields and initializes all quotation dates', () => {
    expect(component.quotationForm.contains('quotationNo')).toBe(false);
    expect(component.quotationForm.contains('exchangeRate')).toBe(false);
    expect(component.quotationForm.contains('status')).toBe(false);
    expect(component.quotationForm.controls.travelStartDate.value).toBe(component.defaultTravelStartDate);
    expect(component.quotationForm.controls.travelEndDate.value).toBe(component.defaultTravelEndDate);
    expect(component.quotationForm.controls.validUntil.value).toBe(component.defaultValidUntil);
  });

  it('keeps the quotation date validator bound to the component', () => {
    expect(() => component.quotationForm.controls.validUntil.setValue('2020-01-01')).not.toThrow();
    expect(component.quotationForm.hasError('invalidValidityPeriod')).toBe(true);
  });

  it('saves a selected flight, trimmed policies, and normalized transfer times', () => {
    component.flights = [flight];
    component.toggleFlight(flight, true);
    fillRequiredFields(component);
    component.quotationForm.patchValue({ adults: 2, children: 1, infants: 1 });

    component.addPolicy();
    component.policiesArray.at(0).patchValue({ value: '  Non-refundable after confirmation  ' });

    component.addTransfer();
    component.transfersArray.at(0).patchValue({
      from: '  Cairo Airport  ',
      to: '  Downtown Hotel  ',
      transferDate: '2030-05-10',
      fromTime: '09:30',
      arrivalTime: '10:45',
    });

    component.saveQuotation();

    expect(apiService.post).toHaveBeenCalledTimes(1);
    const [endpoint, payload] = apiService.post.mock.calls[0];
    expect(endpoint).toBe('Quotations');
    expect(payload.quotationNo).toBeUndefined();
    expect(payload.exchangeRate).toBeUndefined();
    expect(payload.status).toBeUndefined();
    expect(payload.policies).toEqual([{
      id: 0,
      value: 'Non-refundable after confirmation',
    }]);
    expect(payload.items.find((item: any) => item.itemType === 4)).toMatchObject({
      itemType: 4,
      flightId: flight.id,
      quantity: 4,
      sellingPrice: 125,
    });
    expect(payload.items.find((item: any) => item.itemType === 5)).toMatchObject({
      itemType: 5,
      description: 'Cairo Airport - Downtown Hotel',
      quantity: 1,
      from: 'Cairo Airport',
      to: 'Downtown Hotel',
      transferDate: '2030-05-10',
      fromTime: '09:30:00',
      arrivalTime: '10:45:00',
    });
    expect(Swal.fire).toHaveBeenCalledWith(expect.objectContaining({ toast: true, icon: 'success' }));
  });

  it('blocks the HTTP request and marks each invalid date before saving', () => {
    component.flights = [flight];
    component.toggleFlight(flight, true);
    fillRequiredFields(component);
    component.quotationForm.patchValue({
      travelStartDate: '2030-05-10',
      travelEndDate: '2030-05-10',
      validUntil: '2020-01-01',
    });

    component.saveQuotation();

    expect(component.quotationForm.controls.travelEndDate.hasError('dateNotAfterStart')).toBe(true);
    expect(component.quotationForm.controls.validUntil.hasError('validityNotFuture')).toBe(true);
    expect(component.quotationForm.controls.travelEndDate.touched).toBe(true);
    expect(component.quotationForm.controls.validUntil.touched).toBe(true);
    expect(apiService.post).not.toHaveBeenCalled();
    expect(apiService.put).not.toHaveBeenCalled();
    expect(Swal.fire).toHaveBeenCalledWith(expect.objectContaining({ toast: true, icon: 'warning' }));
  });

  it('enables saving only after all fields and one travel item are valid', () => {
    expect(component.canSave).toBe(false);
    expect(component.travelServicesInvalid).toBe(true);

    component.flights = [flight];
    component.toggleFlight(flight, true);
    fillRequiredFields(component);
    expect(component.canSave).toBe(true);
    expect(component.travelServicesInvalid).toBe(false);

    component.quotationForm.controls.travelEndDate.setValue('2030-05-10');
    expect(component.canSave).toBe(false);
  });

  it('shows an error toast when the save API fails', () => {
    apiService.post.mockReturnValueOnce(throwError(() => ({ error: { message: 'Server rejected quotation' } })));
    component.flights = [flight];
    component.toggleFlight(flight, true);
    fillRequiredFields(component);

    component.saveQuotation();

    expect(Swal.fire).toHaveBeenCalledWith(expect.objectContaining({
      toast: true,
      icon: 'error',
      title: 'Server rejected quotation',
    }));
  });

  it('hydrates selected flights, policies, and transfer times for editing', () => {
    const quotation: QuotationDTO = {
      id: 73,
      quotationNo: 'QT-2030-73',
      customerId: 7,
      currencyId: 2,
      travelStartDate: '2030-05-10',
      travelEndDate: '2030-05-20',
      adults: 2,
      children: 1,
      infants: 0,
      subTotal: 375,
      discount: 0,
      taxRate: 0,
      tax: 0,
      totalAmount: 375,
      totalCost: 0,
      status: QuotationStatusEnum.Draft,
      validUntil: '2030-05-01',
      notes: null,
      policies: [{ id: 9, value: 'Passport must be valid for six months.' }],
      items: [
        { id: 101, itemType: 4, flightId: flight.id },
        {
          id: 102,
          itemType: 5,
          from: 'Cairo Airport',
          to: 'Downtown Hotel',
          transferDate: '2030-05-10',
          fromTime: '09:30:00',
          arrivalTime: '10:45:00',
        },
      ],
    };
    component.selectedQuotation = quotation;

    component.ngOnChanges({
      selectedQuotation: new SimpleChange(null, quotation, true),
    });
    component.ngOnInit();

    expect(component.selectedFlightIds).toEqual(new Set([flight.id]));
    expect(component.selectedFlights).toEqual([flight]);
    expect(component.policiesArray.getRawValue()).toEqual([{
      id: 9,
      value: 'Passport must be valid for six months.',
    }]);
    expect(component.transfersArray.getRawValue()).toEqual([{
      id: 102,
      from: 'Cairo Airport',
      to: 'Downtown Hotel',
      transferDate: '2030-05-10',
      fromTime: '09:30',
      arrivalTime: '10:45',
    }]);
  });

  it('does not save while an added transfer is blank', () => {
    component.flights = [flight];
    component.toggleFlight(flight, true);
    fillRequiredFields(component);
    component.addTransfer();

    component.saveQuotation();

    expect(component.quotationForm.invalid).toBe(true);
    expect(component.transfersArray.at(0).controls['from'].touched).toBe(true);
    expect(apiService.post).not.toHaveBeenCalled();
    expect(apiService.put).not.toHaveBeenCalled();
  });

  it('rejects a transfer pickup date and time in the past', () => {
    component.addTransfer();
    component.transfersArray.at(0).patchValue({
      from: 'Cairo Airport',
      to: 'Downtown Hotel',
      transferDate: '2020-01-01',
      fromTime: '09:30',
      arrivalTime: '10:30',
    });

    expect(component.transfersArray.at(0).hasError('transferTimeInPast')).toBe(true);
  });

  it('requires arrival time to be later than pickup time', () => {
    component.addTransfer();
    component.transfersArray.at(0).patchValue({
      from: 'Cairo Airport',
      to: 'Downtown Hotel',
      transferDate: '2030-05-10',
      fromTime: '11:00',
      arrivalTime: '10:30',
    });

    expect(component.transfersArray.at(0).hasError('invalidTransferTimeRange')).toBe(true);

    component.transfersArray.at(0).patchValue({ arrivalTime: '11:00' });
    expect(component.transfersArray.at(0).hasError('invalidTransferTimeRange')).toBe(true);
  });
});

function fillRequiredFields(component: QuotationsFromCard): void {
  component.quotationForm.patchValue({
    customerId: 7,
    currencyId: 2,
    travelStartDate: '2030-05-10',
    travelEndDate: '2030-05-20',
    adults: 1,
    children: 0,
    infants: 0,
    discount: 0,
    taxRate: 0,
    validUntil: '2030-05-01',
    notes: '',
  });
}
