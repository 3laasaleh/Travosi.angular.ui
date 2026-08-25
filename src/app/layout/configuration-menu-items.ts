export interface ConfigurationMenuItem {
  label: string;
  path: string;
  icon: string;
}

export const CONFIGURATION_MENU_ITEMS: readonly ConfigurationMenuItem[] = [
  { label: 'destinations', path: '/configurations/destinations', icon: 'mdi-map-marker-outline' },
  { label: 'tours', path: '/configurations/tours', icon: 'mdi-compass-outline' },
  { label: 'packages', path: '/configurations/packages', icon: 'mdi-package-variant-closed' },
  { label: 'bookings', path: '/configurations/bookings', icon: 'mdi-calendar-check-outline' },
  { label: 'customers', path: '/configurations/customers', icon: 'mdi-account-group-outline' },
  { label: 'tasks', path: '/configurations/tasks', icon: 'mdi-checkbox-marked-outline' },
  { label: 'airlines', path: '/configurations/airlines', icon: 'mdi-airplane' },
  { label: 'hotels', path: '/configurations/hotels', icon: 'mdi-bed-outline' },
  { label: 'flights', path: '/configurations/flights', icon: 'mdi-airplane-takeoff' },
  { label: 'cities', path: '/configurations/cities', icon: 'mdi-city-variant-outline' },
  { label: 'blogs', path: '/configurations/blogs', icon: 'mdi-post-outline' },
  { label: 'quotations', path: '/configurations/quotations', icon: 'mdi-file-document-outline' },
  { label: 'invoices', path: '/configurations/invoices', icon: 'mdi-receipt-text-outline' },
  { label: 'vouchers', path: '/configurations/vouchers', icon: 'mdi-ticket-confirmation-outline' },
  { label: 'customerQuestions', path: '/configurations/contact-messages', icon: 'mdi-comment-question-outline' },
];
