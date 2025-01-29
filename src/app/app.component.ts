import { Component, OnInit } from '@angular/core';
import { Device } from '@capacitor/device';

// service
import { DeviceService } from 'src/app/core/services/device.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {
  constructor(private deviceService: DeviceService) {}

  async ngOnInit() {
    const identifier = await this.getDeviceId();
    const info = await this.getDeviceInfo();

    this.deviceService.getByUuid(identifier).subscribe((device) => {
      if (!device) {
        const device = {
          uuid: identifier,
          isVirtual: info.isVirtual,
          manufacturer: info.manufacturer,
          model: info.model,
          operatingSystem: info.operatingSystem,
          osVersion: info.osVersion,
          platform: info.platform,
          webViewVersion: info.webViewVersion,
        };
        this.deviceService.save(device).subscribe();
      }
    });
  }

  async getDeviceId() {
    const info = await Device.getId();
    return info.identifier;
  }

  async getDeviceInfo() {
    const info = await Device.getInfo();
    return info;
  }
}
