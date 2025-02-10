import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { WeightDateModalPage } from 'src/app/weight-date-modal/weight-date-modal.page';

// rxjs
import { Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';

// services
import { DeviceService } from 'src/app/core/services/device.service';
import { UserProfileService } from 'src/app/core/services/user-profile.service';
import { SettingService } from 'src/app/core/services/setting.service';
import { WeightDateService } from 'src/app/core/services/weight-date.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { EventService } from 'src/app/core/services/event.service';

// constants
import { WeightDate } from 'src/app/core/models/weight-date.model';
import { poundsToKilogram } from 'src/app/shared/constants/pounds-to-kilogram';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.page.html',
  styleUrls: ['dashboard.page.scss'],
  standalone: false,
})
export class DashboardPage implements OnInit, OnDestroy {
  histories: WeightDate[] = [];
  uuid: any;
  isEdit: boolean = false;
  userProfileId: any;
  unit: string = 'china';
  kilogramsUSAValues: any;
  private historiesSubscription!: Subscription;
  latestHistory: WeightDate = {
    id: 0,
    weight: 0,
    dateTime: '',
    userProfileId: 0,
    bmi: 0,
    status: '',
    bodyFatPercentage: 0,
  };

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

    this.historiesSubscription = this.eventService
      .getReloadHistories()
      .pipe(startWith(null))
      .subscribe(() => {
        this.reloadPage();
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

  reloadPage() {
    this.userProfileService.getByUuid(this.uuid).subscribe((userProfile) => {
      if (userProfile && typeof userProfile.id === 'number') {
        this.weightDateService.getAllByUserProfileId(userProfile.id).subscribe((histories) => {
          this.settingService.getByUuid(this.uuid).subscribe((updatedSetting) => {
            this.unit = updatedSetting.unit;

            histories.map((history) => {
              if (updatedSetting && updatedSetting.unit === 'usa') {
                const closestHistoryWeight = this.kilogramsUSAValues.reduce((prev: any, curr: any) =>
                  Math.abs(curr - history.weight) < Math.abs(prev - history.weight) ? curr : prev,
                );

                history.weight = poundsToKilogram.filter((item) => item.value === closestHistoryWeight)[0].text;
              } else if (updatedSetting && updatedSetting.unit === 'china') {
                const roundWeight = Number.isInteger(history.weight) ? history.weight : Math.round(history.weight);
                history.weight = roundWeight;
              }
            });
          });

          this.histories = histories;
          this.latestHistory = histories.reduce((prev, current) =>
            new Date(current.dateTime) > new Date(prev.dateTime) ? current : prev,
          );
        });
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
            this.eventService.triggerReloadProgresses();
          }
        });
      }
    });

    await modal.present();
  }

  ngOnDestroy() {
    this.historiesSubscription.unsubscribe();
  }
}
