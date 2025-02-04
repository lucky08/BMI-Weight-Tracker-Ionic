import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// services
import { SettingService } from 'src/app/core/services/setting.service';
import { DeviceService } from 'src/app/core/services/device.service';

// constants
import { poundsToKilogram } from 'src/app/shared/constants/pounds-to-kilogram';

@Component({
  selector: 'app-weight-date-modal',
  templateUrl: './weight-date-modal.page.html',
  styleUrls: ['./weight-date-modal.page.scss'],
  standalone: false,
})
export class WeightDateModalPage implements OnInit {
  weightDateForm: FormGroup;
  isEdit: boolean;
  weight: number | null = null;
  selectedDate: string | null = null;
  selectedWeight: number = 25;
  weightOptions: any;
  uuid: any;
  kilogramsUSAValues: any;
  today: string;

  constructor(
    private fb: FormBuilder,
    private modalController: ModalController,
    private navParams: NavParams,
    private settingService: SettingService,
    private deviceService: DeviceService,
  ) {
    this.isEdit = this.navParams.get('isEdit');

    this.weightDateForm = this.fb.group({
      weight: ['', [Validators.required]],
      date: ['', [Validators.required]],
    });

    const now = new Date();
    this.today = now.toISOString().split('T')[0];
  }

  async ngOnInit() {
    this.uuid = await this.deviceService.getDeviceId();
    this.kilogramsUSAValues = poundsToKilogram.map((item) => item.value);

    this.settingService.getByUuid(this.uuid).subscribe((updatedSetting) => {
      console.log('unit: ' + updatedSetting.unit);
      this.weightOptions = this.generateKGWeightOptions(updatedSetting.unit);
      this.selectedWeight = updatedSetting.unit === 'usa' ? 24.04 : 25;
    });
  }

  generateKGWeightOptions(unit: any) {
    let options = [];

    if (unit === 'usa') {
      for (let poundToKilogram of poundsToKilogram) {
        options.push({ text: `${poundToKilogram.text} lb`, value: poundToKilogram.value });
      }
    } else if (unit === 'china') {
      for (let i = 25; i <= 200; i++) {
        options.push({ text: `${i} kg`, value: i });
      }
    }

    return options;
  }

  async closeModal() {
    await this.modalController.dismiss({ result: 'closed' });
  }

  submitForm() {
    const data = {
      weight: this.weight,
      date: this.selectedDate,
    };

    this.modalController.dismiss({ result: data });
  }
}
