import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Device } from 'src/app/core/models/device.model';
import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.apiUrl;

@Injectable({ providedIn: 'root' })
export class DeviceService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Device[]>(`${BACKEND_URL}/device`);
  }

  getByUuid(uuid: string) {
    return this.http.get<Device>(`${BACKEND_URL}/device/${uuid}`);
  }

  save(device: Device) {
    return this.http.post<Device>(`${BACKEND_URL}/device`, device);
  }
}
