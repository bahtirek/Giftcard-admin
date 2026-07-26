import { HttpClient, HttpContext, HttpHeaders, HttpParams, httpResource } from '@angular/common/http';
import { computed, inject, Service, signal } from '@angular/core';
import { API_URL } from '../../app.config.tokens';
import { SHOW_LOADER } from '../../core/loader/loader-context.token';
import { rxResource, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { StatusEnum } from '../../interfaces/status';
import { debounceTime } from 'rxjs';
import { ProfileModel, Profile } from './settings.interface';

@Service()
export class ProfileService {
  private http = inject(HttpClient);
  private baseUrl = inject(API_URL);

  profiles = signal<Profile[]>([]);
  profileId = signal<string>('');

  setProfileId(id: string | undefined) {
    if (id) {
      this.profileId.set(id);
    }
  }

  resetProfileId () {
    this.profileId.set('')
  }

  postProfile(profile: Profile, onComplteCallback: () => void) {
    profile.createdAt = Date.now();
    profile.status = StatusEnum.Active;

    this.http.post<Profile>( `${this.baseUrl}/users`, profile, {
      context: new HttpContext().set(SHOW_LOADER, true)
    }).subscribe({
      next: (response) => {
        this.profiles.update(value => [...value, response])
        this.profileId.set(response.id)
      },
      complete: () => {
        onComplteCallback()
      },
    })
  }

  putProfile(profile: Profile, onComplteCallback: () => void) {
    profile.updatedAt = Date.now();
    profile.status = StatusEnum.Active;
    const headers = new HttpHeaders().set('Content-Type', 'application/json')

    this.http.put<Profile>( `${this.baseUrl}/users/${profile.id}`, profile, {
      headers,
      context: new HttpContext().set(SHOW_LOADER, true)
    }).subscribe({
      complete: () => {
        onComplteCallback()
      },
    })
  }

  getAllProfiles() {
    this.http.get<Profile[]>( `${this.baseUrl}/users`, {
      context: new HttpContext().set(SHOW_LOADER, true)
    }).subscribe({
      next: (response) => {
        this.profiles.set(response)
      },
    })
  }

  private profilesResource = rxResource({
    stream: () => this.http.get<Profile[]>( `${this.baseUrl}/users`)
  })

  currentProfile = httpResource<Profile>(() => `${this.baseUrl}/users/${this.profileId()}`)


  patchProfileStatus(status: string, onCompleteCallback: () => void) {
    this.http.patch(`${this.baseUrl}/users/${this.profileId()}`, {status: status}, {
      context: new HttpContext().set(SHOW_LOADER, true),
    }).subscribe({
      next: (response) => {
        console.log('Profile satus updated:', response);
      },
      complete: () => {
        this.currentProfile.reload(); // Refresh the current profile resource to get the updated data
        onCompleteCallback();
      },
    });
  }

  /* Profile Search  */

  profilesSearchQuery = signal<string>('');

  setProfilesSearchQuery(query: string) {
    if (query) {
      this.profilesSearchQuery.set(query);
    }
  }

  debouncedProfilesSearchQuery = toSignal(
    toObservable(this.profilesSearchQuery).pipe(debounceTime(300))
  )

  profilesSearchResults = httpResource<Profile[]>(() => `${this.baseUrl}/users?businessName_like=${this.debouncedProfilesSearchQuery()}`)
}
