import { Component, OnInit } from '@angular/core';

// services
import { UserProfileService } from 'src/app/core/services/user-profile.service';
import { DeviceService } from 'src/app/core/services/device.service';

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
  ) {}

  async ngOnInit() {
    this.uuid = await this.deviceService.getDeviceId();
    this.checkIsNewUserProfile(this.uuid);
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
