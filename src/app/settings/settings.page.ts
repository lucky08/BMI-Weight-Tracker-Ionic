import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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

  settings = {
    unit: 'china',
    darkMode: false,
  };

  constructor(
    private userProfileService: UserProfileService,
    private deviceService: DeviceService,
    private route: ActivatedRoute,
  ) {}

  async ngOnInit() {
    const identifier = await this.deviceService.getDeviceId();
    this.checkIsNewUserProfile(identifier);

    this.route.queryParams.subscribe((params) => {
      if (params['refresh']) {
        this.checkIsNewUserProfile(identifier);
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

  toggleDarkMode(event: any) {
    const shouldAdd = event.detail.checked;

    document.body.classList.toggle('dark-theme', shouldAdd);
  }
}
