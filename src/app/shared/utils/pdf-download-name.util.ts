/**
 * Produces a readable, filesystem-safe name for CRM document downloads.
 * Keep Unicode letters so Arabic customer names remain meaningful to the user.
 */
export function customerPdfDownloadName(customerName: unknown, fallback: string, today = new Date()): string {
  const safeCustomer = String(customerName ?? '')
    .normalize('NFKC')
    .replace(/[\\/:*?"<>|]+/g, '')
    .trim()
    .replace(/\s+/g, '-');
  const safeFallback = String(fallback || 'document')
    .replace(/[\\/:*?"<>|]+/g, '')
    .trim()
    .replace(/\s+/g, '-') || 'document';

  const date = [today.getFullYear(), String(today.getMonth() + 1).padStart(2, '0'), String(today.getDate()).padStart(2, '0')]
    .join('-');
  return `${safeCustomer || safeFallback}-${date}.pdf`;
}
