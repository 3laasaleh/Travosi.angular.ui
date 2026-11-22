/** Only the configured production origin may be indexed, even with a production build on staging. */
export function mayIndexRequest(enabled: boolean, publicBaseUrl: string, requestUrl?: string): boolean {
  if (!enabled) return false;
  if (!requestUrl) return enabled;
  try {
    return new URL(requestUrl).origin === new URL(publicBaseUrl).origin;
  } catch {
    return false;
  }
}

export function blockedRobotsContent(): string {
  return 'User-agent: *\nDisallow: /\n';
}
