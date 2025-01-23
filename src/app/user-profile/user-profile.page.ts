import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
  standalone: false,
})
export class UserProfilePage implements OnInit {
  profileForm: FormGroup;
  maxDate: string;

  selectedGender: string = 'male';

  constructor(private fb: FormBuilder) {
    this.maxDate = new Date().toISOString().split('T')[0];

    this.profileForm = this.fb.group({
      name: ['', [Validators.required]],
      dateOfBirth: ['', Validators.required],
      gender: ['', Validators.required],
      height: ['', [Validators.required]],
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.profileForm.valid) {
      console.log('User Profile:', this.profileForm.value);
    }
  }

  formatDate(dateTime: string): string {
    const date = new Date(dateTime);
    return date.toISOString().split('T')[0];
  }
}
