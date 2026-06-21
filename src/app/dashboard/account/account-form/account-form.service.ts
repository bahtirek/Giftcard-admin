import { HttpClient, HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Account, AccountResponse } from './account-form-interface';
import { API_URL } from '../../../app.config.tokens';
import { SHOW_LOADER } from '../../../core/loader/loader-context.token';

@Service()
export class AccountService {
  private http = inject(HttpClient);
  private baseUrl = inject(API_URL);

  postAccount(account: Account) {
    return this.http.post<AccountResponse>( `${this.baseUrl}/accounts`, account,
      {
        context: new HttpContext().set(SHOW_LOADER, true)
      }
    )
  }

  getUserDetails(userId: string) {
    // PARAMS EXAMPLE
    // 1. Build Query Parameters (?role=admin&version=2)
    const params = new HttpParams()
      .set('role', 'admin')
      .set('version', '2');

    // 2. Build Structural Request Headers
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer dummy-token')
      .set('X-Custom-Client-Time', new Date().toISOString());

    // 3. Inject options into the final config slot
    return this.http.get(`${this.baseUrl}/users/${userId}`, {
      headers,
      params
    });
  }
}
