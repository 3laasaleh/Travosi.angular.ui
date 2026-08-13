import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ApiService } from '../../../core/services/apiservice.service';
import { AirportSearchService } from './airport-search.service';

describe('AirportSearchService', () => {
  let service: AirportSearchService;
  let apiService: { get: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    apiService = { get: vi.fn() };
    TestBed.configureTestingModule({
      providers: [
        AirportSearchService,
        { provide: ApiService, useValue: apiService },
      ],
    });
    service = TestBed.inject(AirportSearchService);
  });

  it('passes encoded query, normalized language, and session token to the backend', () => {
    apiService.get.mockReturnValue(of({
      isSuccess: true,
      data: [{ placeId: 'abc', name: 'Cairo Airport', description: 'Cairo Airport, Egypt', displayName: 'CAI - Cairo' }],
    }));

    let results: unknown;
    service.search({ query: ' Cairo & Giza ', language: 'ar-EG', sessionToken: 'session token' })
      .subscribe((value) => results = value);

    expect(apiService.get).toHaveBeenCalledWith(
      'Airports/search?query=Cairo%20%26%20Giza&language=ar&sessionToken=session%20token',
    );
    expect(results).toEqual([{
      placeId: 'abc',
      name: 'Cairo Airport',
      description: 'Cairo Airport, Egypt',
      displayName: 'CAI - Cairo',
    }]);
  });

  it('normalizes PascalCase rows and falls back to the description for display', () => {
    apiService.get.mockReturnValue(of({
      IsSuccess: true,
      Data: [{ PlaceId: 'xyz', Name: 'Heathrow', Description: 'Heathrow Airport, London' }],
    }));

    let results: unknown;
    service.search({ query: 'LHR', language: 'en', sessionToken: 'session' })
      .subscribe((value) => results = value);

    expect(results).toEqual([{
      placeId: 'xyz',
      name: 'Heathrow',
      description: 'Heathrow Airport, London',
      displayName: 'Heathrow Airport, London',
    }]);
  });
});
