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

  it('passes the encoded query and limit to the backend', () => {
    apiService.get.mockReturnValue(of({
      isSuccess: true,
      data: [{
        code: 'CAI',
        icaoCode: 'HECA',
        name: 'Cairo International Airport',
        city: 'Cairo',
        country: 'Egypt',
        countryCode: 'EG',
        value: 'CAI - Cairo International Airport',
        displayName: 'CAI - Cairo International Airport, Cairo, Egypt',
      }],
    }));

    let results: unknown;
    service.search({ query: ' Cairo & Giza ', limit: 10 }).subscribe((value) => results = value);

    expect(apiService.get).toHaveBeenCalledWith('Airports/search?query=Cairo%20%26%20Giza&limit=10');
    expect(results).toEqual([{
      code: 'CAI',
      icaoCode: 'HECA',
      name: 'Cairo International Airport',
      city: 'Cairo',
      country: 'Egypt',
      countryCode: 'EG',
      value: 'CAI - Cairo International Airport',
      displayName: 'CAI - Cairo International Airport, Cairo, Egypt',
    }]);
  });

  it('normalizes PascalCase rows and builds the missing value and display name', () => {
    apiService.get.mockReturnValue(of({
      IsSuccess: true,
      Data: [{ Code: 'lhr', Name: 'Heathrow', City: 'London', Country: 'United Kingdom' }],
    }));

    let results: unknown;
    service.search({ query: 'LHR' }).subscribe((value) => results = value);

    expect(apiService.get).toHaveBeenCalledWith('Airports/search?query=LHR&limit=20');
    expect(results).toEqual([{
      code: 'LHR',
      icaoCode: '',
      name: 'Heathrow',
      city: 'London',
      country: 'United Kingdom',
      countryCode: '',
      value: 'LHR - Heathrow',
      displayName: 'LHR - Heathrow, London, United Kingdom',
    }]);
  });

  it('loads the full catalog only once', () => {
    apiService.get.mockReturnValue(of({ isSuccess: true, data: [{ code: 'JED', name: 'Jeddah' }] }));

    service.loadAll().subscribe();
    service.loadAll().subscribe();

    expect(apiService.get).toHaveBeenCalledTimes(1);
    expect(apiService.get).toHaveBeenCalledWith('Airports/GetAll');
  });
});
