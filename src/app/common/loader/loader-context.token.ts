// loading-context.token.ts
import { HttpContextToken } from '@angular/common/http';

export const SHOW_LOADER = new HttpContextToken<boolean>(() => false);
