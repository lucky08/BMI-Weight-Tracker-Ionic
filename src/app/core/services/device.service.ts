import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { Device as ModelDevice } from 'src/app/core/models/device.model';
import { Device as CapacitorDevice } from '@capacitor/device';
import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.apiUrl;

@Injectable({ providedIn: 'root' })
export class DeviceService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<ModelDevice[]>(`${BACKEND_URL}/device`);
  }

  getByUuid(uuid: string) {
    return this.http.get<ModelDevice>(`${BACKEND_URL}/device/${uuid}`).pipe(take(1));
  }

  save(device: ModelDevice) {
    return this.http.post<ModelDevice>(`${BACKEND_URL}/device`, device);
  }

  /*async getDeviceId() {
    const info = await CapacitorDevice.getId();
    return info.identifier;
  }

  async getDeviceInfo() {
    const info = await CapacitorDevice.getInfo();
    return info;
  } */

  // Add demo uuid
  async getDeviceId() {
    const info = { identifier: 'f47ac10b-58cc-4372-a567-0e02b2c3d479' };
    return info.identifier;
  }

  // Add demo device info
  async getDeviceInfo() {
    const info = {
      uuid: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
      isVirtual: false,
      manufacturer: 'Google Inc.',
      model: 'Macintosh',
      operatingSystem: 'mac',
      osVersion: '11.16.8',
      platform: 'web',
      webViewVersion: '135.1.2.0',
    };
    return info;
  }
}
