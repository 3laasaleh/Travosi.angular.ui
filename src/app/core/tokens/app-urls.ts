import { InjectionToken } from '@angular/core';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');
export const PUBLIC_BASE_URL = new InjectionToken<string>('PUBLIC_BASE_URL');

export function normalizeBaseUrl(value: string): string {
  return value.trim().replace(/\/+$/, '');
}

export function normalizeApiBaseUrl(value: string): string {
  return `${normalizeBaseUrl(value)}/`;
}
