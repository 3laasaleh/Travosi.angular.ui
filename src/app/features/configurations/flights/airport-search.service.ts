import { Injectable } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';
import { ApiService } from '../../../core/services/apiservice.service';

export interface AirportSearchResult {
  code: string;
  icaoCode: string;
  name: string;
  city: string;
  country: string;
  countryCode: string;
  value: string;
  displayName: string;
}

export interface AirportSearchRequest {
  query: string;
  limit?: number;
}

interface AirportApiEnvelope {
  isSuccess?: boolean;
  IsSuccess?: boolean;
  message?: string;
  Message?: string;
  data?: unknown;
  Data?: unknown;
}

@Injectable({ providedIn: 'root' })
export class AirportSearchService {
  private allAirports$?: Observable<AirportSearchResult[]>;

  constructor(private readonly apiService: ApiService) {}

  search(request: AirportSearchRequest): Observable<AirportSearchResult[]> {
    const query = request.query.trim();
    const limit = request.limit && request.limit > 0 ? request.limit : 20;
    const url = `Airports/search?query=${encodeURIComponent(query)}&limit=${limit}`;

    return this.apiService.get(url).pipe(
      map((response: unknown) => this.parseResponse(response)),
    );
  }

  loadAll(): Observable<AirportSearchResult[]> {
    this.allAirports$ ??= this.apiService.get('Airports/GetAll').pipe(
      map((response: unknown) => this.parseResponse(response)),
      shareReplay({ bufferSize: 1, refCount: false }),
    );

    return this.allAirports$;
  }

  private parseResponse(response: unknown): AirportSearchResult[] {
    const envelope = this.asRecord(response) as AirportApiEnvelope | null;
    const succeeded = envelope?.isSuccess ?? envelope?.IsSuccess;
    if (succeeded === false) {
      throw new Error(envelope?.message ?? envelope?.Message ?? 'Airport search failed.');
    }

    const payload = envelope?.data ?? envelope?.Data ?? response;
    const rows = this.extractRows(payload);
    const uniqueResults = new Map<string, AirportSearchResult>();

    for (const row of rows) {
      const airport = this.normalizeAirport(row);
      if (airport && !uniqueResults.has(airport.code)) {
        uniqueResults.set(airport.code, airport);
      }
    }

    return [...uniqueResults.values()];
  }

  private extractRows(payload: unknown): unknown[] {
    if (Array.isArray(payload)) return payload;
    const record = this.asRecord(payload);
    if (!record) return [];

    for (const key of ['items', 'data', 'airports', 'results']) {
      if (Array.isArray(record[key])) return record[key];
    }

    return [];
  }

  private normalizeAirport(value: unknown): AirportSearchResult | null {
    const record = this.asRecord(value);
    if (!record) return null;

    const code = this.readString(record, 'code', 'Code').toUpperCase();
    const name = this.readString(record, 'name', 'Name');
    if (!code || !name) return null;

    const city = this.readString(record, 'city', 'City');
    const country = this.readString(record, 'country', 'Country');
    const location = [city, country].filter((part) => !!part).join(', ');
    const airportValue = this.readString(record, 'value', 'Value') || `${code} - ${name}`;
    const displayName = this.readString(record, 'displayName', 'DisplayName')
      || (location ? `${airportValue}, ${location}` : airportValue);

    return {
      code,
      icaoCode: this.readString(record, 'icaoCode', 'IcaoCode'),
      name,
      city,
      country,
      countryCode: this.readString(record, 'countryCode', 'CountryCode').toUpperCase(),
      value: airportValue,
      displayName,
    };
  }

  private readString(record: Record<string, unknown>, ...keys: string[]): string {
    for (const key of keys) {
      if (typeof record[key] === 'string') return record[key].trim();
    }
    return '';
  }

  private asRecord(value: unknown): Record<string, unknown> | null {
    return value !== null && typeof value === 'object' && !Array.isArray(value)
      ? value as Record<string, unknown>
      : null;
  }
}
