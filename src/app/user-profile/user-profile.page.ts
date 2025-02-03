import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

// services
import { UserProfileService } from 'src/app/core/services/user-profile.service';
import { DeviceService } from 'src/app/core/services/device.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { SettingService } from 'src/app/core/services/setting.service';

// constants
import { feetToCentimeters } from 'src/app/shared/constants/feet-to-centimeters';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
  standalone: false,
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
    private route: ActivatedRoute,
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

    this.route.paramMap.subscribe((params) => {
      if (params.get('uuid')) {
        this.isEdit = true;
      }
    });

    this.settingService.getByUuid(this.uuid).subscribe((updatedSetting) => {
      console.log('unit: ' + updatedSetting.unit);
      this.heightOptions = this.generateCMHeightOptions(updatedSetting.unit);

      this.selectedHeight = updatedSetting.unit === 'usa' ? 162.56 : 165;
      console.log('selectedHeight: ' + this.selectedHeight);

      this.userProfileService.getByUuid(this.uuid).subscribe((userProfile) => {
        if (userProfile) {
          this.profileForm.patchValue({ age: userProfile.age });

          if (updatedSetting.unit === 'china') {
            this.profileForm.patchValue({ height: userProfile.height });
          } else if (updatedSetting.unit === 'usa') {
            const closestUserProfileHeight = this.centimetersUSAValues.reduce((prev: any, curr: any) =>
              Math.abs(curr - userProfile.height) < Math.abs(prev - userProfile.height) ? curr : prev,
            );

            this.profileForm.patchValue({ height: closestUserProfileHeight });
          }

          this.profileForm.patchValue({ userName: userProfile.userName });
          this.profileForm.patchValue({ gender: userProfile.gender });
        }
      });
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
            this.toastService.info('Your profile has been created successfully', 3000, 'bottom');
            this.router.navigate(['/tabs/settings'], { queryParams: { refresh: new Date().getTime() } });
          }
        });
      } else {
        this.userProfileService.update(userProfile).subscribe((updatedUserProfile) => {
          if (updatedUserProfile) {
            this.toastService.info('Your profile has been updated successfully', 3000, 'bottom');
            this.router.navigate(['/tabs/settings'], { queryParams: { refresh: new Date().getTime() } });
          }
        });
      }
    }
  }

  cancelUserProfile() {
    if (!this.isEdit) {
      this.router.navigate(['/tabs/settings']);
    } else {
      this.router.navigate(['/tabs/settings'], { queryParams: { refresh: new Date().getTime() } });
    }
  }
}
