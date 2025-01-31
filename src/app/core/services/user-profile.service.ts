import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { UserProfile } from 'src/app/core/models/user-profile.model';
import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.apiUrl;

@Injectable({ providedIn: 'root' })
export class UserProfileService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<UserProfile[]>(`${BACKEND_URL}/user-profile`);
  }

  getByUuid(uuid: string) {
    return this.http.get<UserProfile>(`${BACKEND_URL}/user-profile/${uuid}`).pipe(take(1));
  }

  save(userProfile: UserProfile) {
    return this.http.post<UserProfile>(`${BACKEND_URL}/user-profile`, userProfile);
  }
}
