import { Component, OnInit } from '@angular/core';

// services
import { UserProfileService } from 'src/app/core/services/user-profile.service';
import { DeviceService } from 'src/app/core/services/device.service';
import { SettingService } from 'src/app/core/services/setting.service';
import { ToastService } from 'src/app/core/services/toast.service';

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
    private toastService: ToastService,
  ) {}

  async ngOnInit() {
    this.uuid = await this.deviceService.getDeviceId();
    this.checkIsNewUserProfile(this.uuid);
    this.settingService.getByUuid(this.uuid).subscribe((updatedSetting) => {
      this.settings = {
        unit: updatedSetting.unit,
        darkMode: updatedSetting.darkMode,
      };

      if (this.settings.darkMode) {
        document.body.classList.toggle('dark-theme', this.settings.darkMode);
      }
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

  updateSettings() {
    const shouldAdd = this.settings.darkMode;
    document.body.classList.toggle('dark-theme', shouldAdd);

    const updatedSetting = {
      unit: this.settings.unit,
      darkMode: this.settings.darkMode,
      uuid: this.uuid,
    };

    this.settingService.update(updatedSetting).subscribe((updatedSetting) => {
      if (updatedSetting) {
        this.toastService.info('Your setting has been updated successfully', 2000, 'bottom');
      }
    });
  }
}
