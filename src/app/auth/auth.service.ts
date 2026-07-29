import { Service, signal, inject } from '@angular/core';
import { initialUserData, User } from '../dashboard/settings/settings.interface';
import { HttpClient, HttpContext } from '@angular/common/http';
import { API_URL } from '../app.config.tokens';
import { SHOW_LOADER } from '../core/loader/loader-context.token';
import { Credentials } from './login/login.interface';
import { HttpResponse } from '../interfaces/common.interface';

@Service()
export class AuthService {
  private http = inject(HttpClient);
  private baseUrl = inject(API_URL);

  loggedUser = signal<User>(initialUserData as User);
  token = signal<string>('')

  login(credentials: Credentials, onComplteCallback: (result: HttpResponse) => void) {
    this.http.get<User[]>( `${this.baseUrl}/users?email=${credentials.email}&password=${credentials.password}`, {
      context: new HttpContext().set(SHOW_LOADER, true)
    }).subscribe({
      next: (response) => {
        console.log(response)
        if(response && response.length > 0) {
          this.loggedUser.set(response[0]);
          this.setMockToken(this.loggedUser())
          onComplteCallback({success: true, error: ''})
        } else {
          onComplteCallback({success: false, error: 'Wrong email or password'})
        }
      },
      error: (error: Error) => {
        onComplteCallback({success: false, error: 'Something went wrong. Try again later.'})
      }
    })
  }

  getUserDetailsByEmail(email: string){
    this.http.get<User>( `${this.baseUrl}/users?email=${email}`, {
      context: new HttpContext().set(SHOW_LOADER, true)
    }).subscribe({
      next: (response) => {
        this.loggedUser.set(response);
      }
    })
  }

  getUserDetailsById(id: string){
    this.http.get<User>( `${this.baseUrl}/users/${id}`, {
      context: new HttpContext().set(SHOW_LOADER, true)
    }).subscribe({
      next: (response) => {
        this.loggedUser.set(response);
      }
    })
  }

  setMockToken(user: User) {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(JSON.stringify({email: user.email, role: user.role, name: user.lastName, exp: Date.now() + 3600000, }));
    const signature = 'mock_signature_hash';
    const fakeToken = `${header}.${payload}.${signature}`;

    this.token.set(fakeToken);
  }

  isAuthenticated(): boolean {
    if (!this.token()) {
      const tokenFromStorage = localStorage.getItem('mock_token');
      if(!tokenFromStorage) {
        return false
      } else {
        this.token.set(tokenFromStorage!)
        const email = this.retrieveDataFromTokenPayload(tokenFromStorage, 'email')
        this.getUserDetailsByEmail(email)
      }
    }

    try {
      // Split JWT format: header.payload.signature
      const exp = this.retrieveDataFromTokenPayload(this.token(), 'exp')

      // Check if exp claim exists
      if (!exp) return false;

      // Get current time in seconds to match JWT format
      const currentTime = Math.floor(Date.now() / 1000);

      // Return true if current time has not passed expiration time
      return exp > currentTime;
    } catch (error) {
      // Return false if token is corrupted or malformed
      return false;
    }
  }

  retrieveDataFromTokenPayload(payload: string, part: string) {
    const parts = this.token().split('.');
    if (parts.length !== 3) throw new Error('Disrupted token');
    const decodedPayload = JSON.parse(atob(parts[1]));
    return decodedPayload[part]
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
