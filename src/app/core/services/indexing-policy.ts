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

/** The client-rendered shell must agree with the noindex response header. */
export function withNoindexRobotsMeta(html: string): string {
  const tag = '<meta name="robots" content="noindex, nofollow">';
  let found = false;
  const updated = html.replace(/<meta\b(?=[^>]*\bname\s*=\s*["']robots["'])[^>]*>/gi, () => {
    if (found) return '';
    found = true;
    return tag;
  });
  return found ? updated : updated.replace(/<\/head>/i, `${tag}\n</head>`);
}
