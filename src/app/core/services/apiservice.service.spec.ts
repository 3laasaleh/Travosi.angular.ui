import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { AuthService } from '../../features/user/_services/auth.service';
import { IS_PUBLIC_API_REQUEST } from '../interceptors/public-api-context';
import { ApiService } from './apiservice.service';

describe('ApiService unauthenticated requests', () => {
  it('marks unauthenticated GET and POST requests as public', () => {
    const http = {
      get: vi.fn().mockReturnValue(of({})),
      post: vi.fn().mockReturnValue(of({})),
    };
    const service = new ApiService(
      http as unknown as HttpClient,
      {} as AuthService,
      'https://api.example.test/',
    );

    service.getUnauthntecated('Currencies').subscribe();
    service.postUnauthenticated('NewsletterSubscriptions/Subscribe', {
      email: 'guest@example.com',
    }).subscribe();

    expect(http.get.mock.calls[0][1].context.get(IS_PUBLIC_API_REQUEST)).toBe(true);
    expect(http.post.mock.calls[0][2].context.get(IS_PUBLIC_API_REQUEST)).toBe(true);
  });
});
