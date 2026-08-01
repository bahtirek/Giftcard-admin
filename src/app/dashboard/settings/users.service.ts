import { HttpClient, HttpContext, HttpHeaders, HttpParams, httpResource } from '@angular/common/http';
import { computed, inject, Service, signal } from '@angular/core';
import { API_URL } from '../../app.config.tokens';
import { SHOW_LOADER } from '../../core/loader/loader-context.token';
import { rxResource, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { StatusEnum } from '../../interfaces/status';
import { debounceTime } from 'rxjs';
import { UserModel, User } from './settings.interface';
import { ToastService } from '../../common/toast/toast.service';

@Service()
export class UserService {
  private http = inject(HttpClient);
  private baseUrl = inject(API_URL);
  private toastService = inject(ToastService);

  users = signal<User[]>([]);
  userId = signal<string>('');

  setUserId(id: string | undefined) {
    if (id) {
      this.userId.set(id);
    }
  }

  resetUserId () {
    this.userId.set('')
  }

  postUser(user: User, onComplteCallback: () => void) {
    user.createdAt = Date.now();
    user.status = StatusEnum.Active;

    this.http.post<User>( `${this.baseUrl}/users`, user, {
      context: new HttpContext().set(SHOW_LOADER, true)
    }).subscribe({
      next: (response) => {
        this.users.update(value => [...value, response])
        this.userId.set(response.id)
      },
      complete: () => {
        onComplteCallback()
      },
    })
  }

  putUser(user: User, onComplteCallback: () => void) {
    user.updatedAt = Date.now();
    user.status = StatusEnum.Active;
    const headers = new HttpHeaders().set('Content-Type', 'application/json')

    this.http.put<User>( `${this.baseUrl}/users/${user.id}`, user, {
      headers,
      context: new HttpContext().set(SHOW_LOADER, true)
    }).subscribe({
      complete: () => {
        onComplteCallback()
      },
    })
  }

  deleteUser(user: User, onComplteCallback: () => void) {
    this.http.delete<User>( `${this.baseUrl}/users/${user.id}`, {
      context: new HttpContext().set(SHOW_LOADER, true)
    }).subscribe({
      complete: () => {
        onComplteCallback()
        this.toastService.success('User deleted successfully');
      },
      error: (error) => {
        this.toastService.error('Error deleting user: ' + error.message);
      }
    })
  }

  getAllUsers() {
    this.http.get<User[]>( `${this.baseUrl}/users`, {
      context: new HttpContext().set(SHOW_LOADER, true)
    }).subscribe({
      next: (response) => {
        this.users.set(response)
      },
    })
  }

  private usersResource = rxResource({
    stream: () => this.http.get<User[]>( `${this.baseUrl}/users`)
  })

  currentUser = httpResource<User>(() => `${this.baseUrl}/users/${this.userId()}`)


  patchUserStatus(status: string, onCompleteCallback: () => void) {
    this.http.patch(`${this.baseUrl}/users/${this.userId()}`, {status: status}, {
      context: new HttpContext().set(SHOW_LOADER, true),
    }).subscribe({
      next: (response) => {
        console.log('User satus updated:', response);
      },
      complete: () => {
        this.currentUser.reload(); // Refresh the current user resource to get the updated data
        onCompleteCallback();
      },
    });
  }

  /* User Search  */

  usersSearchQuery = signal<string>('');

  setUsersSearchQuery(query: string) {
    if (query) {
      this.usersSearchQuery.set(query);
    }
  }

  debouncedUsersSearchQuery = toSignal(
    toObservable(this.usersSearchQuery).pipe(debounceTime(300))
  )

  usersSearchResults = httpResource<User[]>(() => `${this.baseUrl}/users?businessName_like=${this.debouncedUsersSearchQuery()}`)
}
