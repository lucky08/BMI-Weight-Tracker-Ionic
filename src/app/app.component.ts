import { Component, OnInit } from '@angular/core';

// service
import { DeviceService } from 'src/app/core/services/device.service';
import { SettingService } from 'src/app/core/services/setting.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {
  constructor(
    private deviceService: DeviceService,
    private settingService: SettingService,
  ) {}

  async ngOnInit() {
    const identifier = await this.deviceService.getDeviceId();
    const info = await this.deviceService.getDeviceInfo();

    this.deviceService.getByUuid(identifier).subscribe((device) => {
      console.log(!device);
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

        this.deviceService.save(device).subscribe((createdDevice) => {
          if (createdDevice) {
            // Add default setting
            const setting = {
              unit: 'china',
              darkMode: false,
              uuid: identifier,
            };

            this.settingService.save(setting).subscribe();
          }
        });
      }
    });
  }
}
