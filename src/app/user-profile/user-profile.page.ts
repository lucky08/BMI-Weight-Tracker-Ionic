import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

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

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      name: ['', [Validators.required]],
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

  onSubmit() {
    if (this.profileForm.valid) {
      console.log('User Profile:', this.profileForm.value);
    }
  }

  onChange: any = () => {};
  onTouched: any = () => {};
}
