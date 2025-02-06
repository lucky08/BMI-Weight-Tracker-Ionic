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
  originalWeightDateTime: any;
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
    this.originalWeightDateTime = this.navParams.get('originalWeightDateTime');

    this.weightDateForm = this.fb.group({
      weight: ['', [Validators.required]],
      dateTime: ['', [Validators.required]],
    });

    const now = new Date();
    this.today = now.toISOString().split('T')[0];
  }

  async ngOnInit() {
    this.uuid = await this.deviceService.getDeviceId();
    this.kilogramsUSAValues = poundsToKilogram.map((item) => item.value);

    this.settingService.getByUuid(this.uuid).subscribe((updatedSetting) => {
      this.weightOptions = this.generateKGWeightOptions(updatedSetting.unit);
      this.selectedWeight = updatedSetting.unit === 'usa' ? 24.04 : 25;

      if (this.isEdit && this.originalWeightDateTime) {
        if (updatedSetting.unit === 'china') {
          this.selectedWeight = this.originalWeightDateTime.weight;
          this.weightDateForm.patchValue({ weight: this.originalWeightDateTime.weight });
        } else if (updatedSetting.unit === 'usa') {
          const closestUserWeight = this.kilogramsUSAValues.reduce((prev: any, curr: any) =>
            Math.abs(curr - this.originalWeightDateTime.weight) < Math.abs(prev - this.originalWeightDateTime.weight)
              ? curr
              : prev,
          );
          this.selectedWeight = closestUserWeight;
          this.weightDateForm.patchValue({ weight: closestUserWeight });
        }
      }

      const dateString = this.originalWeightDateTime.dateTime;
      const dateObj = new Date(dateString.replace(' ', 'T') + 'Z');
      const isoString = dateObj.toISOString();
      this.weightDateForm.patchValue({ dateTime: isoString });
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
      weight: this.weightDateForm.value.weight,
      dateTime: this.weightDateForm.value.dateTime,
    };

    this.modalController.dismiss({ result: data });
  }
}
