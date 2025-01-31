import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

// services
import { UserProfileService } from 'src/app/core/services/user-profile.service';
import { DeviceService } from 'src/app/core/services/device.service';
import { ToastService } from 'src/app/core/services/toast.service';

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
  ageControl = new FormControl(null, Validators.required);
  heightControl = new FormControl(null, Validators.required);
  isToastOpen = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userProfileService: UserProfileService,
    private deviceService: DeviceService,
    private toastService: ToastService,
  ) {
    this.profileForm = this.fb.group({
      userName: ['', [Validators.required]],
      age: this.ageControl,
      gender: ['', [Validators.required]],
      height: this.heightControl,
    });
  }

  ngOnInit() {
    this.ageOptions = this.generateAgeOptions();
    this.heightOptions = this.generateCMHeightOptions();
  }

  generateAgeOptions() {
    let options = [];
    for (let i = 7; i <= 100; i++) {
      options.push({ text: `${i}`, value: i });
    }
    return options;
  }

  generateCMHeightOptions() {
    let options = [];
    for (let i = 50; i <= 250; i++) {
      options.push({ text: `${i} cm`, value: i });
    }
    return options;
  }

  onAgeChange(event: any) {
    this.ageControl.setValue(event.detail.value);
  }

  onHeightChange(event: any) {
    this.heightControl.setValue(event.detail.value);
  }

  async onSubmit() {
    if (this.profileForm.valid) {
      const userProfile = {
        userName: this.profileForm.value.userName,
        age: this.profileForm.value.age,
        gender: this.profileForm.value.gender,
        height: this.profileForm.value.height,
        uuid: await this.deviceService.getDeviceId(),
      };

      this.userProfileService.save(userProfile).subscribe((createdUserProfile) => {
        if (createdUserProfile) {
          this.toastService.info('Your profile has been created successfully', 3000, 'bottom');
          this.router.navigate(['/tabs/settings'], { queryParams: { refresh: new Date().getTime() } });
        }
      });
    }
  }
}
