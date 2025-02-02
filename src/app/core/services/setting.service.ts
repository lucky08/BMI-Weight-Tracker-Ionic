import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Setting } from 'src/app/core/models/setting.model';

const BACKEND_URL = environment.apiUrl;

@Injectable({ providedIn: 'root' })
export class SettingService {
  constructor(private http: HttpClient) {}

  getByUuid(uuid: string) {
    return this.http.get<Setting>(`${BACKEND_URL}/setting/${uuid}`).pipe(take(1));
  }

  save(setting: Setting) {
    return this.http.post<Setting>(`${BACKEND_URL}/setting`, setting);
  }

  update(setting: Setting) {
    return this.http.patch<Setting>(`${BACKEND_URL}/setting`, setting);
  }
}
