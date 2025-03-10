import { Component, OnInit, EnvironmentInjector } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

// modules
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonButton,
} from '@ionic/angular/standalone';

// utils
import { convertHeight } from 'src/app/shared/utils/common-utils';

// rjxs
import { forkJoin } from 'rxjs';

// services
import { UserProfileService } from 'src/app/core/services/user-profile.service';
import { DeviceService } from 'src/app/core/services/device.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { SettingService } from 'src/app/core/services/setting.service';
import { EventService } from 'src/app/core/services/event.service';

// constants
import { feetToCentimeters } from 'src/app/shared/constants/feet-to-centimeters';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonItem,
    IonLabel,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonButton,
  ],
  standalone: true,
})
export class UserProfilePage implements OnInit {
  profileForm: FormGroup;
  selectedGender: string = 'male';
  ageOptions: any;
  heightOptions: any;
  isToastOpen = false;
  selectedAge: number = 26;
  selectedHeight: number = 165;
  uuid: any;
  isEdit: boolean = false;
  centimetersUSAValues: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userProfileService: UserProfileService,
    private deviceService: DeviceService,
    private settingService: SettingService,
    private toastService: ToastService,
    private eventService: EventService,
    private route: ActivatedRoute,
    public environmentInjector: EnvironmentInjector,
  ) {
    this.profileForm = this.fb.group({
      userName: ['', [Validators.required]],
      age: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      height: ['', [Validators.required]],
    });
  }

  async ngOnInit() {
    this.ageOptions = this.generateAgeOptions();
    this.uuid = await this.deviceService.getDeviceId();

    this.centimetersUSAValues = feetToCentimeters.map((item) => item.value);
    this.isEdit = this.route.snapshot.paramMap.has('uuid');

    forkJoin({
      updatedSetting: this.settingService.getByUuid(this.uuid),
      userProfile: this.userProfileService.getByUuid(this.uuid),
    }).subscribe(({ updatedSetting, userProfile }) => {
      this.heightOptions = this.generateCMHeightOptions(updatedSetting?.unit ?? 'china');
      this.selectedHeight = updatedSetting?.unit === 'usa' ? 162.56 : 165;

      if (userProfile) {
        this.profileForm.patchValue({
          age: userProfile.age,
          height: convertHeight(userProfile.height, updatedSetting?.unit, this.centimetersUSAValues),
          userName: userProfile.userName,
          gender: userProfile.gender,
        });

        this.selectedHeight = convertHeight(userProfile.height, updatedSetting?.unit, this.centimetersUSAValues);
      }
    });
  }

  generateAgeOptions() {
    let options = [];
    for (let i = 7; i <= 100; i++) {
      options.push({ text: `${i}`, value: i });
    }
    return options;
  }

  generateCMHeightOptions(unit: any) {
    let options = [];

    if (unit === 'usa') {
      for (let feetToCentimeter of feetToCentimeters) {
        options.push({ text: feetToCentimeter.text, value: feetToCentimeter.value });
      }
    } else if (unit === 'china') {
      for (let i = 50; i <= 250; i++) {
        options.push({ text: `${i} cm`, value: i });
      }
    }

    return options;
  }

  async onSubmit() {
    if (this.profileForm.valid) {
      const userProfile = {
        userName: this.profileForm.value.userName,
        age: this.profileForm.value.age,
        gender: this.profileForm.value.gender,
        height: this.profileForm.value.height,
        uuid: this.uuid,
      };

      if (!this.isEdit) {
        this.userProfileService.save(userProfile).subscribe((createdUserProfile) => {
          if (createdUserProfile) {
            this.handleOnSubmit('Your profile has been created successfully');
          }
        });
      } else {
        this.userProfileService.update(userProfile).subscribe((updatedUserProfile) => {
          if (updatedUserProfile) {
            this.handleOnSubmit('Your profile has been updated successfully');
          }
        });
      }
    }
  }

  private handleOnSubmit(message: string) {
    this.toastService.info(message, 3000, 'bottom');
    this.eventService.triggerReloadHistories();
    this.eventService.triggerReloadProgresses();
    this.router.navigate(['/tabs/settings'], { queryParams: { refresh: new Date().getTime() } });
  }

  cancelUserProfile() {
    if (!this.isEdit) {
      this.router.navigate(['/tabs/settings']);
    } else {
      this.router.navigate(['/tabs/settings'], { queryParams: { refresh: new Date().getTime() } });
    }
  }
}
