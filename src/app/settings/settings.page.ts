import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

//modules
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  IonContent,
  IonList,
  IonItem,
  IonIcon,
  IonLabel,
  IonButton,
  IonSelect,
  IonSelectOption,
  IonToggle,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { personOutline, scaleOutline, moonOutline } from 'ionicons/icons';

// utils
import { enableDarkMode } from 'src/app/shared/utils/common-utils';

// rxjs
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// services
import { UserProfileService } from 'src/app/core/services/user-profile.service';
import { DeviceService } from 'src/app/core/services/device.service';
import { SettingService } from 'src/app/core/services/setting.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { EventService } from 'src/app/core/services/event.service';

addIcons({
  personOutline,
  scaleOutline,
  moonOutline,
});

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    IonContent,
    IonList,
    IonItem,
    IonIcon,
    IonLabel,
    IonButton,
    IonSelect,
    IonSelectOption,
    IonToggle,
  ],
  standalone: true,
})
export class SettingsPage implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();

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
    private eventService: EventService,
    private route: ActivatedRoute,
  ) {}

  async ngOnInit() {
    this.uuid = await this.deviceService.getDeviceId();
    this.handleUserProfileUpdate(false);

    this.route.queryParams.pipe(takeUntil(this.unsubscribe$)).subscribe((params) => {
      if (params['refresh']) {
        this.handleUserProfileUpdate(true);
      }
    });

    this.settingService.getByUuid(this.uuid).subscribe((updatedSetting) => {
      this.settings = {
        unit: updatedSetting?.unit || 'china',
        darkMode: updatedSetting?.darkMode || false,
      };

      if (this.settings.darkMode) {
        enableDarkMode(this.settings.darkMode);
      }
    });
  }

  private handleUserProfileUpdate(isRefresh: boolean) {
    if (isRefresh) {
      console.log('Triggered by refresh:', this.uuid);
    } else {
      console.log('Initial page load:', this.uuid);
    }
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
        this.handleSettingUpdated();
      }
    });
  }

  private handleSettingUpdated() {
    this.toastService.info('Your setting has been updated successfully', 2000, 'bottom');
    this.eventService.triggerReloadHistories();
    this.eventService.triggerReloadProgresses();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
