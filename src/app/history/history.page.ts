import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { WeightDateModalPage } from 'src/app/weight-date-modal/weight-date-modal.page';

// services
import { WeightDateService } from 'src/app/core/services/weight-date.service';
import { UserProfileService } from 'src/app/core/services/user-profile.service';
import { DeviceService } from 'src/app/core/services/device.service';
import { ToastService } from 'src/app/core/services/toast.service';

// constants
import { WeightDate } from 'src/app/core/models/weight-date.model';

@Component({
  selector: 'app-history',
  templateUrl: 'history.page.html',
  styleUrls: ['history.page.scss'],
  standalone: false,
})
export class HistoryPage implements OnInit {
  histories: WeightDate[] = [];
  uuid: any;

  constructor(
    private weightDateService: WeightDateService,
    private userProfileService: UserProfileService,
    private deviceService: DeviceService,
    private modalController: ModalController,
    private toastService: ToastService,
  ) {}

  async ngOnInit() {
    this.uuid = await this.deviceService.getDeviceId();

    this.userProfileService.getByUuid(this.uuid).subscribe((userProfile) => {
      if (userProfile && typeof userProfile.id === 'number') {
        this.weightDateService.getAllByUserProfileId(userProfile.id).subscribe((histories) => {
          this.histories = histories;
        });
      }
    });
  }

  async editHistory(index: number) {
    const originalWeightDateTime = this.histories.filter((history) => history.id === index)[0];
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
          weight: detail.data.result.weight,
          dateTime: detail.data.result.dateTime,
          userProfileId: originalWeightDateTime && originalWeightDateTime.userProfileId,
        };

        this.weightDateService.update(weightDate).subscribe((createdWeightDate) => {
          if (createdWeightDate) {
            this.toastService.info('Your weight has been updated successfully', 2000, 'bottom');
          }
        });
      }
    });

    await modal.present();
  }

  deleteHistory(index: number) {
    console.log('index: ' + index);
  }
}
