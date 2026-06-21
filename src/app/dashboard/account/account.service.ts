import { HttpClient, HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';
import { computed, effect, inject, Service, signal } from '@angular/core';
import { Account, AccountResponse } from './account-form/account-form-interface';
import { API_URL } from '../../app.config.tokens';
import { SHOW_LOADER } from '../../core/loader/loader-context.token';
import { rxResource } from '@angular/core/rxjs-interop';
import { AccountStatusEnum } from './account-status.enum';

@Service()
export class AccountService {
  private http = inject(HttpClient);
  private baseUrl = inject(API_URL);

  accounts = signal<AccountResponse[]>([]);

  postAccount(account: Account, onComplteCallback: () => void) {
    account.createdAt = Date.now();
    account.status = AccountStatusEnum.Active;

    this.http.post<AccountResponse>( `${this.baseUrl}/accounts`, account, {
      context: new HttpContext().set(SHOW_LOADER, true)
    }).subscribe({
      next: (response) => {
        this.accounts.update(value => [...value, response])
      },
      complete: () => {
        onComplteCallback()
      },
    })
  }

  getAllAccounts() {
    this.http.get<AccountResponse[]>( `${this.baseUrl}/accounts`, {
      context: new HttpContext().set(SHOW_LOADER, true)
    }).subscribe({
      next: (response) => {
        this.accounts.set(response)
      },
    })
  }

  exampleResponse = computed(() => this.accountsResource.value())

  private accountsResource = rxResource({
    stream: () => this.http.get<AccountResponse[]>( `${this.baseUrl}/accounts`)
  })


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
