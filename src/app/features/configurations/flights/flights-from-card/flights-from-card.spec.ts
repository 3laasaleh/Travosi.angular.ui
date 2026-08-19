import { ChangeDetectorRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ApiService } from '../../../../core/services/apiservice.service';
import { AirportSearchResult, AirportSearchService } from '../airport-search.service';
import { FlightsFromCard } from './flights-from-card';

describe('FlightsFromCard validation', () => {
  let component: FlightsFromCard;

  const cairo: AirportSearchResult = {
    code: 'CAI',
    icaoCode: 'HECA',
    name: 'Cairo International Airport',
    city: 'Cairo',
    country: 'Egypt',
    countryCode: 'EG',
    value: 'CAI - Cairo International Airport',
    displayName: 'CAI - Cairo International Airport, Cairo, Egypt',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: AirportSearchService,
          useValue: {
            search: vi.fn().mockReturnValue(of([])),
            loadAll: vi.fn().mockReturnValue(of([cairo])),
          },
        },
      ],
    });

    component = TestBed.runInInjectionContext(() => new FlightsFromCard(
      { get: vi.fn().mockReturnValue(of({ data: [] })) } as unknown as ApiService,
      { markForCheck: vi.fn() } as unknown as ChangeDetectorRef,
    ));
  });

  it('requires an airport picked from the results after free text is entered', () => {
    component.flightForm.patchValue({
      departureAirport: 'Typed airport',
      arrivalAirport: 'Another airport',
    });

    expect(component.flightForm.controls.departureAirportCode.hasError('required')).toBe(true);
    expect(component.flightForm.controls.arrivalAirportCode.hasError('required')).toBe(true);
    expect(component.flightForm.invalid).toBe(true);
  });

  it('stores the code and name of the selected airport', () => {
    component.selectAirport('departure', cairo);

    expect(component.flightForm.controls.departureAirport.value).toBe('CAI - Cairo International Airport');
    expect(component.flightForm.controls.departureAirportCode.value).toBe('CAI');
    expect(component.flightForm.controls.departureAirportCode.valid).toBe(true);
  });

  it('requires arrival time to be later than departure time', () => {
    component.flightForm.patchValue({
      departureTime: '2026-08-13T10:00',
      arrivalTime: '2026-08-13T09:59',
    });

    expect(component.flightForm.hasError('arrivalNotAfterDeparture')).toBe(true);
  });
});
