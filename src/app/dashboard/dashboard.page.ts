import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { WeightDateModalPage } from 'src/app/weight-date-modal/weight-date-modal.page';

// services
import { DeviceService } from 'src/app/core/services/device.service';
import { UserProfileService } from 'src/app/core/services/user-profile.service';
import { SettingService } from 'src/app/core/services/setting.service';
import { WeightDateService } from 'src/app/core/services/weight-date.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { EventService } from 'src/app/core/services/event.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.page.html',
  styleUrls: ['dashboard.page.scss'],
  standalone: false,
})
export class DashboardPage implements OnInit {
  uuid: any;
  isEdit: boolean = false;
  userProfileId: any;

  constructor(
    private router: Router,
    private userProfileService: UserProfileService,
    private modalController: ModalController,
    private deviceService: DeviceService,
    private settingService: SettingService,
    private weightDateService: WeightDateService,
    private toastService: ToastService,
    private eventService: EventService,
  ) {}

  async ngOnInit() {
    this.uuid = await this.deviceService.getDeviceId();

    this.checkIsNewUserProfile();

    this.settingService.getByUuid(this.uuid).subscribe((updatedSetting) => {
      if (updatedSetting && updatedSetting.darkMode) {
        document.body.classList.toggle('dark-theme', updatedSetting.darkMode);
      }
    });
  }

  ionViewWillEnter() {
    this.checkIsNewUserProfile();
  }

  checkIsNewUserProfile() {
    this.userProfileService.getByUuid(this.uuid).subscribe((userProfile) => {
      if (userProfile) {
        this.isEdit = true;
        this.userProfileId = userProfile.id;
      } else {
        this.isEdit = false;
      }
    });
  }

  navigateToBMIDetail() {
    this.router.navigate(['/tabs/dashboard/bmi-detail']);
  }

  navigateToBodyFatPercentageDetail() {
    this.router.navigate(['/tabs/dashboard/body-fat-percentage-detail']);
  }

  async onAddWeight() {
    const modal = await this.modalController.create({
      component: WeightDateModalPage, // open Modal page
      componentProps: {
        isEdit: false,
      },
      breakpoints: [0, 1],
      initialBreakpoint: 1,
    });

    modal.onDidDismiss().then((detail) => {
      if (detail !== null && detail.data.result !== 'closed') {
        const weightDate = {
          weight: detail.data.result.weight,
          dateTime: detail.data.result.dateTime,
          userProfileId: this.userProfileId,
        };

        this.weightDateService.save(weightDate).subscribe((createdWeightDate) => {
          if (createdWeightDate) {
            this.toastService.info('Your weight has been added successfully', 2000, 'bottom');
            this.eventService.triggerReloadHistories();
          }
        });
      }
    });

    await modal.present();
  }
}
