import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { WeightDateModalPage } from 'src/app/weight-date-modal/weight-date-modal.page';

// services
import { DeviceService } from 'src/app/core/services/device.service';
import { UserProfileService } from 'src/app/core/services/user-profile.service';
import { SettingService } from 'src/app/core/services/setting.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.page.html',
  styleUrls: ['dashboard.page.scss'],
  standalone: false,
})
export class DashboardPage implements OnInit {
  uuid: any;
  isEdit: boolean = false;

  constructor(
    private router: Router,
    private userProfileService: UserProfileService,
    private modalController: ModalController,
    private deviceService: DeviceService,
    private settingService: SettingService,
  ) {}

  async ngOnInit() {
    this.uuid = await this.deviceService.getDeviceId();

    this.settingService.getByUuid(this.uuid).subscribe((updatedSetting) => {
      if (updatedSetting.darkMode) {
        document.body.classList.toggle('dark-theme', updatedSetting.darkMode);
      }
    });

    this.userProfileService.getByUuid(this.uuid).subscribe((userProfile) => {
      if (userProfile) {
        this.isEdit = true;
      }
    });
  }

  navigateToBMIDetail() {
    this.router.navigate(['/tabs/dashboard/bmi-detail']);
  }

  navigateToBodyFatPercentageDetail() {
    this.router.navigate(['/tabs/dashboard/body-fat-percentage-detail']);
  }

  async onAddWeight(isEdit: boolean) {
    const modal = await this.modalController.create({
      component: WeightDateModalPage, // open Modal page
      componentProps: {
        isEdit: isEdit,
      },
      breakpoints: [0, 1],
      initialBreakpoint: 1,
    });

    modal.onDidDismiss().then((detail) => {
      if (detail !== null && detail.data.result !== 'closed') {
        const weightDate = {
          weight: detail.data.result.weight,
          date: detail.data.result.date,
        };

        console.log(weightDate);
      }
    });

    await modal.present();
  }

  /* formatDate(dateTime: string): string {
    const date = new Date(dateTime);
    return date.toISOString().split('T')[0];
  }*/
}
