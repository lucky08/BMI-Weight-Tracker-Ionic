import { Component, OnInit } from '@angular/core';

// rxjs
import { forkJoin } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

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

    forkJoin([this.settingService.getByUuid(identifier), this.deviceService.getByUuid(identifier)])
      .pipe(
        switchMap(([updatedSetting, device]) => {
          // Handle dark mode toggle based on settings
          if (updatedSetting && updatedSetting.darkMode) {
            document.body.classList.toggle('dark-theme', updatedSetting.darkMode);
          }

          // If no device exists, we save the new device data and settings
          if (!device) {
            const newDevice = {
              uuid: identifier,
              isVirtual: info.isVirtual,
              manufacturer: info.manufacturer,
              model: info.model,
              operatingSystem: info.operatingSystem,
              osVersion: info.osVersion,
              platform: info.platform,
              webViewVersion: info.webViewVersion,
            };

            return this.deviceService.save(newDevice).pipe(
              switchMap((createdDevice) => {
                if (createdDevice) {
                  const defaultSetting = {
                    unit: 'china',
                    darkMode: false,
                    uuid: identifier,
                  };

                  return this.settingService
                    .save(defaultSetting)
                    .pipe(tap(() => console.log('Setting has been saved successfully')));
                }
                return [];
              }),
            );
          }

          return [];
        }),
      )
      .subscribe();
  }
}
