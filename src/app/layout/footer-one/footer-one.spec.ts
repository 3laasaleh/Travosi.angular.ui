import { ChangeDetectorRef } from '@angular/core';
import { Subject, of, throwError } from 'rxjs';
import { ApiService } from '../../core/services/apiservice.service';
import { FooterOne } from './footer-one';

describe('FooterOne newsletter subscription', () => {
  let postUnauthenticated: ReturnType<typeof vi.fn>;
  let component: FooterOne;

  beforeEach(() => {
    postUnauthenticated = vi.fn();
    component = new FooterOne(
      { postUnauthenticated } as unknown as ApiService,
      { markForCheck: vi.fn() } as unknown as ChangeDetectorRef,
    );
  });

  it('trims and submits a new subscription, then resets the form', () => {
    postUnauthenticated.mockReturnValue(of({
      isSuccess: true,
      data: { isNewSubscription: true, welcomeEmailSent: true },
    }));
    component.emailControl.setValue('  guest@example.com  ');

    component.subscribeToNewsletter();

    expect(postUnauthenticated).toHaveBeenCalledWith(
      'NewsletterSubscriptions/Subscribe',
      { email: 'guest@example.com' },
    );
    expect(component.newsletterMessage).toBe('newsletterSubscribedSuccess');
    expect(component.emailControl.value).toBe('');
    expect(component.isSubmitting).toBe(false);
  });

  it('treats an existing subscription as success without resetting the email', () => {
    postUnauthenticated.mockReturnValue(of({
      isSuccess: true,
      data: { isNewSubscription: false, welcomeEmailSent: false },
    }));
    component.emailControl.setValue('guest@example.com');

    component.subscribeToNewsletter();

    expect(component.newsletterMessageKind).toBe('success');
    expect(component.newsletterMessage).toBe('newsletterAlreadySubscribed');
    expect(component.emailControl.value).toBe('guest@example.com');
  });

  it.each([
    ['', 'required'],
    ['not-an-email', 'email'],
    [`a@${'b'.repeat(250)}.com`, 'maxlength'],
  ])('does not submit invalid email %j', (email, expectedError) => {
    component.emailControl.setValue(email);

    component.subscribeToNewsletter();

    expect(component.emailControl.hasError(expectedError)).toBe(true);
    expect(component.emailControl.touched).toBe(true);
    expect(postUnauthenticated).not.toHaveBeenCalled();
  });

  it('shows an inline error and retains the email after an API failure', () => {
    postUnauthenticated.mockReturnValue(throwError(() => new Error('unavailable')));
    component.emailControl.setValue('guest@example.com');

    component.subscribeToNewsletter();

    expect(component.newsletterMessageKind).toBe('error');
    expect(component.newsletterMessage).toBe('newsletterSubscribeError');
    expect(component.emailControl.value).toBe('guest@example.com');
    expect(component.isSubmitting).toBe(false);
  });

  it('guards against a second submit while the first request is in flight', () => {
    const response = new Subject<unknown>();
    postUnauthenticated.mockReturnValue(response);
    component.emailControl.setValue('guest@example.com');

    component.subscribeToNewsletter();
    component.subscribeToNewsletter();

    expect(component.isSubmitting).toBe(true);
    expect(postUnauthenticated).toHaveBeenCalledTimes(1);
    response.complete();
    expect(component.isSubmitting).toBe(false);
  });
});
