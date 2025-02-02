import { Component, OnInit } from '@angular/core';

// services
import { UserProfileService } from 'src/app/core/services/user-profile.service';
import { DeviceService } from 'src/app/core/services/device.service';
import { SettingService } from 'src/app/core/services/setting.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: false,
})
export class SettingsPage implements OnInit {
  isEdit: boolean = false;
  uuid: string = '';
  settings = {
    unit: 'china',
    darkMode: false,
  };

  constructor(
    private userProfileService: UserProfileService,
    private deviceService: DeviceService,
    private settingService: SettingService,
  ) {}

  async ngOnInit() {
    this.uuid = await this.deviceService.getDeviceId();
    this.checkIsNewUserProfile(this.uuid);
    this.settingService.getByUuid(this.uuid).subscribe((updatedSetting) => {
      this.settings = {
        unit: updatedSetting.unit,
        darkMode: updatedSetting.darkMode,
      };
    });
  }

  checkIsNewUserProfile(identifier: any) {
    this.userProfileService.getByUuid(identifier).subscribe((userProfile) => {
      if (userProfile) {
        this.isEdit = true;
      } else {
        this.isEdit = false;
      }
    });
  }

  toggleDarkMode(event: any) {
    const shouldAdd = event.detail.checked;

    document.body.classList.toggle('dark-theme', shouldAdd);
  }
}
