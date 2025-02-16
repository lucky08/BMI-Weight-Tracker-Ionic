import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

// modules
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonContent,
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonDatetime,
} from '@ionic/angular/standalone';

// utils
import {
  convertDateTimeFromISOStringToOriginal,
  convertDateTimeFromOriginalToISOString,
  convertHistoryWeight,
} from 'src/app/shared/utils/common-utils';

// services
import { SettingService } from 'src/app/core/services/setting.service';
import { DeviceService } from 'src/app/core/services/device.service';

// constants
import { poundsToKilogram } from 'src/app/shared/constants/pounds-to-kilogram';

@Component({
  selector: 'app-weight-date-modal',
  templateUrl: './weight-date-modal.page.html',
  styleUrls: ['./weight-date-modal.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonContent,
    IonRow,
    IonCol,
    IonItem,
    IonLabel,
    IonSelect,
    IonSelectOption,
    IonDatetime,
  ],
  standalone: true,
})
export class WeightDateModalPage implements OnInit {
  weightDateForm: FormGroup;
  @Input() isEdit: boolean = false;
  @Input() originalWeightDateTime: any;
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
    private settingService: SettingService,
    private deviceService: DeviceService,
  ) {
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
        this.originalWeightDateTime = convertHistoryWeight(
          this.originalWeightDateTime,
          updatedSetting,
          this.kilogramsUSAValues,
          false,
        );

        this.weightDateForm.patchValue({ weight: this.originalWeightDateTime.weight });
        const dateString = this.originalWeightDateTime.dateTime;
        const isoString = convertDateTimeFromOriginalToISOString(dateString);
        this.weightDateForm.patchValue({ dateTime: isoString });
      }
    });
  }

  generateKGWeightOptions(unit: any) {
    let options = [];

    if (unit === 'usa') {
      for (let poundToKilogram of poundsToKilogram) {
        options.push({ text: `${poundToKilogram.text} lb`, value: poundToKilogram.value });
      }
    } else if (unit === 'china') {
      for (let i = 20; i <= 200; i++) {
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
      dateTime: convertDateTimeFromISOStringToOriginal(this.weightDateForm.value.dateTime),
    };

    this.modalController.dismiss({ result: data });
  }
}
