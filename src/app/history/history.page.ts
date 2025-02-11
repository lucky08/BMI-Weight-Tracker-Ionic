import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { WeightDateModalPage } from 'src/app/weight-date-modal/weight-date-modal.page';

// rxjs
import { Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';

// services
import { WeightDateService } from 'src/app/core/services/weight-date.service';
import { UserProfileService } from 'src/app/core/services/user-profile.service';
import { DeviceService } from 'src/app/core/services/device.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { SettingService } from 'src/app/core/services/setting.service';
import { EventService } from 'src/app/core/services/event.service';

// constants
import { WeightDate } from 'src/app/core/models/weight-date.model';
import { poundsToKilogram } from 'src/app/shared/constants/pounds-to-kilogram';

@Component({
  selector: 'app-history',
  templateUrl: 'history.page.html',
  styleUrls: ['history.page.scss'],
  standalone: false,
})
export class HistoryPage implements OnInit, OnDestroy {
  histories: WeightDate[] = [];
  uuid: any;
  unit: string = 'china';
  kilogramsUSAValues: any;
  allKilogramsHistories: WeightDate[] = [];
  private historiesSubscription!: Subscription;

  constructor(
    private weightDateService: WeightDateService,
    private userProfileService: UserProfileService,
    private deviceService: DeviceService,
    private modalController: ModalController,
    private toastService: ToastService,
    private settingService: SettingService,
    private alertController: AlertController,
    private eventService: EventService,
  ) {}

  async ngOnInit() {
    this.uuid = await this.deviceService.getDeviceId();
    this.kilogramsUSAValues = poundsToKilogram.map((item) => item.value);

    this.historiesSubscription = this.eventService
      .getReloadHistories()
      .pipe(startWith(null))
      .subscribe(() => {
        this.reloadPage();
      });
  }

  reloadPage() {
    this.userProfileService.getByUuid(this.uuid).subscribe((userProfile) => {
      if (userProfile && typeof userProfile.id === 'number') {
        this.weightDateService.getAllByUserProfileId(userProfile.id).subscribe((histories) => {
          histories.sort((a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime()); //sort by dateTime

          this.settingService.getByUuid(this.uuid).subscribe((updatedSetting) => {
            this.unit = updatedSetting.unit;
            this.allKilogramsHistories = histories.map((item) => ({ ...item })); //deep copy array

            this.allKilogramsHistories.forEach((history) => this.convertWeight(history, updatedSetting));
            histories.forEach((history) => this.convertWeight(history, updatedSetting, true));

            this.histories = histories;
          });
        });
      }
    });
  }

  convertWeight(history: any, updatedSetting: any, isTextFormat: boolean = false) {
    if (!updatedSetting) return;

    if (updatedSetting.unit === 'usa') {
      const closestHistoryWeight = this.kilogramsUSAValues.reduce((prev: any, curr: any) =>
        Math.abs(curr - history.weight) < Math.abs(prev - history.weight) ? curr : prev,
      );

      const matchedWeight = poundsToKilogram.find((item) => item.value === closestHistoryWeight);
      if (matchedWeight) {
        history.weight = isTextFormat ? matchedWeight.text : matchedWeight.value;
      }
    } else if (updatedSetting.unit === 'china') {
      history.weight = Number.isInteger(history.weight) ? history.weight : Math.round(history.weight);
    }
  }

  async editHistory(index: number) {
    const originalWeightDateTime = this.allKilogramsHistories.filter((history) => history.id === index)[0];

    const modal = await this.modalController.create({
      component: WeightDateModalPage, // open Modal page
      componentProps: {
        isEdit: true,
        originalWeightDateTime: originalWeightDateTime,
      },
      breakpoints: [0, 1],
      initialBreakpoint: 1,
    });

    modal.onDidDismiss().then((detail) => {
      if (detail !== null && detail.data.result !== 'closed') {
        const weightDate = {
          id: originalWeightDateTime && originalWeightDateTime.id,
          weight: detail.data.result.weight,
          dateTime: detail.data.result.dateTime,
          userProfileId: originalWeightDateTime && originalWeightDateTime.userProfileId,
        };

        this.weightDateService.update(weightDate).subscribe((createdWeightDate) => {
          if (createdWeightDate) {
            this.toastService.info('Your weight has been updated successfully', 2000, 'bottom');
            this.eventService.triggerReloadHistories();
            this.eventService.triggerReloadProgresses();
          }
        });
      }
    });

    await modal.present();
  }

  async deleteHistory(index: number) {
    const alert = await this.alertController.create({
      header: 'Confirmation',
      message: `Are you sure you want to delete this record?`,
      cssClass: 'delete-alert',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Yes',
          handler: () => {
            this.weightDateService.delete(index).subscribe((res) => {
              if (res) {
                this.histories = this.histories.filter((history) => history.id !== index);
                this.eventService.triggerReloadProgresses();
                this.toastService.info('Your history has been deleted successfully', 2000, 'bottom');
              }
            });
          },
        },
      ],
    });
    await alert.present();
  }

  ngOnDestroy() {
    this.historiesSubscription.unsubscribe();
  }
}
