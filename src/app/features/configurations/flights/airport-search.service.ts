import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiService } from '../../../core/services/apiservice.service';

export interface AirportSearchResult {
  placeId: string;
  name: string;
  description: string;
  displayName: string;
}

export interface AirportSearchRequest {
  query: string;
  language: string;
  sessionToken: string;
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
  constructor(private readonly apiService: ApiService) {}

  search(request: AirportSearchRequest): Observable<AirportSearchResult[]> {
    const query = request.query.trim();
    const language = request.language.toLowerCase().startsWith('ar') ? 'ar' : 'en';
    const url = [
      `Airports/search?query=${encodeURIComponent(query)}`,
      `language=${encodeURIComponent(language)}`,
      `sessionToken=${encodeURIComponent(request.sessionToken)}`,
    ].join('&');

    return this.apiService.get(url).pipe(
      map((response: unknown) => this.parseResponse(response)),
    );
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
      if (airport && !uniqueResults.has(airport.placeId)) {
        uniqueResults.set(airport.placeId, airport);
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

    const placeId = this.readString(record, 'placeId', 'PlaceId');
    const name = this.readString(record, 'name', 'Name');
    const description = this.readString(record, 'description', 'Description');
    const displayName = this.readString(record, 'displayName', 'DisplayName') || description || name;

    if (!placeId || !displayName) return null;
    return {
      placeId,
      name: name || displayName,
      description: description || displayName,
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
