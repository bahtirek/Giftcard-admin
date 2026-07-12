import { HttpClient, HttpContext, HttpHeaders, HttpParams, httpResource } from '@angular/common/http';
import { computed, effect, inject, Service, signal } from '@angular/core';
import { AccountModel, Account } from './account-interface';
import { API_URL } from '../../app.config.tokens';
import { SHOW_LOADER } from '../../core/loader/loader-context.token';
import { rxResource } from '@angular/core/rxjs-interop';
import { StatusEnum } from '../../interfaces/status';

@Service()
export class AccountService {
  private http = inject(HttpClient);
  private baseUrl = inject(API_URL);

  accounts = signal<Account[]>([]);
  accountId = signal<string>('');

  setAccountId(id: string | undefined) {
    if (id) {
      this.accountId.set(id);
    }
  }

  postAccount(account: AccountModel, onComplteCallback: () => void) {
    account.createdAt = Date.now();
    account.status = StatusEnum.Active;

    this.http.post<Account>( `${this.baseUrl}/accounts`, account, {
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

  putAccount(account: Account, onComplteCallback: () => void) {
    account.updatedAt = Date.now();
    account.status = StatusEnum.Active;
    const headers = new HttpHeaders().set('Content-Type', 'application/json')

    this.http.put<Account>( `${this.baseUrl}/accounts/${account.id}`, account, {
      headers,
      context: new HttpContext().set(SHOW_LOADER, true)
    }).subscribe({
      complete: () => {
        onComplteCallback()
      },
    })
  }

  getAllAccounts() {
    this.http.get<Account[]>( `${this.baseUrl}/accounts`, {
      context: new HttpContext().set(SHOW_LOADER, true)
    }).subscribe({
      next: (response) => {
        this.accounts.set(response)
      },
    })
  }

  exampleResponse = computed(() => this.accountsResource.value())

  private accountsResource = rxResource({
    stream: () => this.http.get<Account[]>( `${this.baseUrl}/accounts`)
  })

  currentAccount = httpResource<Account>(() => `${this.baseUrl}/accounts/${this.accountId()}`)


  patchAccountGiftCards(account: Account, giftCardId: string, onCompleteCallback: () => void) {
    this.http.patch(`${this.baseUrl}/accounts/${account.id}`, {
      giftCards: [...account.giftCards || [], giftCardId]
    }).subscribe({
      next: (response) => {
        console.log('Account updated with new gift card:', response);
      },
      complete: () => {
        this.currentAccount.reload(); // Refresh the current account resource to get the updated data
        onCompleteCallback();
      },
    });
  }

/*   currentAccount = computed(() => this.currentAccountResource.value());

  private currentAccountResource = rxResource({
    request: () => ({id: this.accountId()}),
    stream: () => this.http.get<Account>( `${this.baseUrl}/accounts/1`)
  }) */

/*   getAccountById(accountId: string) {
    this.http.get<Account>( `${this.baseUrl}/accounts/${accountId}`, {
      context: new HttpContext().set(SHOW_LOADER, true)
    }).subscribe({
      next: (response) => {
        this.currentAccount.set(response)
      },
    })
  } */


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
