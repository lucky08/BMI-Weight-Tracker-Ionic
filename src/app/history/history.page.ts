import { Component, OnInit } from '@angular/core';

// services
import { WeightDateService } from 'src/app/core/services/weight-date.service';
import { UserProfileService } from 'src/app/core/services/user-profile.service';
import { DeviceService } from 'src/app/core/services/device.service';

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

  editHistory(index: number) {
    console.log('index: ' + index);
  }

  deleteHistory(index: number) {
    console.log('index: ' + index);
  }
}
