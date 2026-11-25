import { describe, expect, it } from 'vitest';

import { ConfigurationsNavbar } from './configurations-navbar';

function createNavbar(role: string | undefined = 'Agent'): ConfigurationsNavbar {
  const navbar = Object.create(ConfigurationsNavbar.prototype) as ConfigurationsNavbar;
  Object.defineProperty(navbar, 'authService', {
    value: { getCurrentUserRole: () => role },
  });
  Object.defineProperty(navbar, 'languageService', {
    value: { currentLanguage: () => 'en' },
  });
  return navbar;
}

describe('ConfigurationsNavbar notifications', () => {
  it.each(['Admin', 'Agent'])('shows notifications for the %s role', (role) => {
    expect(createNavbar(role).isStaff).toBe(true);
  });

  it('links a booking notification to the referenced booking details', () => {
    expect(createNavbar().notificationLink({ type: 5, relatedEntityId: 42 }))
      .toEqual(['/', 'en', 'configurations', 'bookings', '42']);
  });

  it('keeps task notifications linked to the task board', () => {
    expect(createNavbar().notificationLink({ type: 1, relatedEntityId: 42 }))
      .toEqual(['/', 'en', 'configurations', 'tasks']);
  });
});
