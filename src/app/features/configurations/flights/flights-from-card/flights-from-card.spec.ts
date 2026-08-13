import { ChangeDetectorRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { ApiService } from '../../../../core/services/apiservice.service';
import { AirportSearchService } from '../airport-search.service';
import { FlightsFromCard } from './flights-from-card';

describe('FlightsFromCard validation', () => {
  let component: FlightsFromCard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: TranslateService,
          useValue: { currentLang: () => 'en' },
        },
        {
          provide: AirportSearchService,
          useValue: { search: vi.fn().mockReturnValue(of([])) },
        },
      ],
    });

    component = TestBed.runInInjectionContext(() => new FlightsFromCard(
      { get: vi.fn().mockReturnValue(of({ data: [] })) } as unknown as ApiService,
      { markForCheck: vi.fn() } as unknown as ChangeDetectorRef,
    ));
  });

  it('requires an airport integration result after free text is entered', () => {
    component.flightForm.patchValue({
      departureAirport: 'Typed airport',
      arrivalAirport: 'Another airport',
    });

    expect(component.flightForm.controls.departureAirportPlaceId.hasError('required')).toBe(true);
    expect(component.flightForm.controls.arrivalAirportPlaceId.hasError('required')).toBe(true);
    expect(component.flightForm.invalid).toBe(true);
  });

  it('requires arrival time to be later than departure time', () => {
    component.flightForm.patchValue({
      departureTime: '2026-08-13T10:00',
      arrivalTime: '2026-08-13T09:59',
    });

    expect(component.flightForm.hasError('arrivalNotAfterDeparture')).toBe(true);
  });
});
