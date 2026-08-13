import { HttpContextToken } from '@angular/common/http';
/** Marks requests that must not be blocked by local authentication session state. */
export const IS_PUBLIC_API_REQUEST = new HttpContextToken(() => false);
