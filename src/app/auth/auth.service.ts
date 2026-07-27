import { Service, signal, inject } from '@angular/core';
import { initialUserData, User } from '../dashboard/settings/settings.interface';
import { HttpClient, HttpContext, httpResource } from '@angular/common/http';
import { API_URL } from '../app.config.tokens';
import { SHOW_LOADER } from '../core/loader/loader-context.token';
import { Credentials, initialCredentialsData } from './login/login.interface';
import { HttpResponse } from '../interfaces/common.interface';

@Service()
export class AuthService {
  private http = inject(HttpClient);
  private baseUrl = inject(API_URL);

  loggedUser = signal<User>(initialUserData as User);
  token = signal<string>('')

  login(credentials: Credentials, onComplteCallback: (result: HttpResponse) => void) {
    if (credentials.email === 'sam@quickmart.com' && credentials.password === 'admin') {
      this.http.get<User>( `${this.baseUrl}/users/1`, {
        context: new HttpContext().set(SHOW_LOADER, true)
      }).subscribe({
        next: (response) => {
          this.loggedUser.set(response);
          this.setMockToken(response.firstName)
          onComplteCallback({success: true, error: ''})
        },
        error: () => {
          onComplteCallback({success: false, error: 'Something went wrong. Try again later.'})
        }
      })
    } else {
      onComplteCallback({success: false, error: 'Wrong email or password'})
    }
  }

  setMockToken(username: string) {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(JSON.stringify({ sub: username, role: 'admin', exp: Date.now() + 3600000 }));
    const signature = 'mock_signature_hash';
    const fakeToken = `${header}.${payload}.${signature}`;

    // Save token locally to stay logged in across reloads
    localStorage.setItem('mock_token', fakeToken);
    this.token.set(fakeToken);
  }

  isAuthenticated(): boolean {
    if (!this.token()) {
      const tokenFromStorage = localStorage.getItem('mock_token');
      if(!tokenFromStorage) {
        return false
      } else {
        this.token.set(tokenFromStorage!)
      }
    }

    try {
      // Split JWT format: header.payload.signature
      const parts = this.token().split('.');
      if (parts.length !== 3) return false;

      // Decode the payload base64 string
      const decodedPayload = JSON.parse(atob(parts[1]));

      // Check if exp claim exists
      if (!decodedPayload.exp) return true;

      // Get current time in seconds to match JWT format
      const currentTime = Math.floor(Date.now() / 1000);

      // Return true if current time has not passed expiration time
      return decodedPayload.exp > currentTime;
    } catch (error) {
      // Return false if token is corrupted or malformed
      return false;
    }
  }

  hasRole(role: string) {
    if(this.isAuthenticated() && this.loggedUser().role === role) return true;
    return false;
  }

  logout(): void {
    localStorage.removeItem('mock_token');
    this.loggedUser.set(initialUserData as User)
    this.token.set('');
  }
}
