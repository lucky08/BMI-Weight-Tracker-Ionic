import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { WeightDateModalPage } from 'src/app/weight-date-modal/weight-date-modal.page';

// rxjs
import { Subscription, switchMap, map, forkJoin } from 'rxjs';
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

// utils
import { convertHistoryWeight } from 'src/app/shared/utils/common-utils';

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
  userName: string = '';
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
    this.kilogramsUSAValues = poundsToKilogram.map((item) => item.value);

    this.checkIsNewUserProfile();

    this.historiesSubscription = this.eventService
      .getReloadHistories()
      .pipe(startWith(null))
      .subscribe(() => {
        this.reloadDashboardPage();
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
        this.userName = userProfile.userName;
      } else {
        this.isEdit = false;
      }
    });
  }

  reloadDashboardPage() {
    this.userProfileService
      .getByUuid(this.uuid)
      .pipe(
        switchMap((userProfile) => {
          if (!userProfile || typeof userProfile.id !== 'number') {
            throw new Error('Invalid user profile');
          }

          return forkJoin({
            histories: this.weightDateService.getAllByUserProfileId(userProfile.id),
            updatedSetting: this.settingService.getByUuid(this.uuid),
          });
        }),
        map(({ histories, updatedSetting }) => {
          this.unit = updatedSetting.unit;

          return histories.map((history) => {
            return convertHistoryWeight(history, updatedSetting, this.kilogramsUSAValues, true);
          });
        }),
      )
      .subscribe((histories) => {
        this.histories = histories;
        this.latestHistory = histories.reduce((prev, current) =>
          new Date(current.dateTime) > new Date(prev.dateTime) ? current : prev,
        );
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
            this.handleWeightAdded();
          }
        });
      }
    });

    await modal.present();
  }

  private handleWeightAdded() {
    this.toastService.info('Your weight has been added successfully', 2000, 'bottom');
    this.eventService.triggerReloadHistories();
    this.eventService.triggerReloadProgresses();
  }

  ngOnDestroy() {
    this.historiesSubscription.unsubscribe();
  }
}
