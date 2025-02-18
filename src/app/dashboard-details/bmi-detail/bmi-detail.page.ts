import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bmi-detail',
  templateUrl: './bmi-detail.page.html',
  styleUrls: ['./bmi-detail.page.scss'],
  standalone: false,
})
export class BmiDetailPage implements OnInit {
  bmis = [
    { category: 'Category', value: 'BMI (kg/m²)' },
    { category: 'Underweight (Severe Thinness)', value: '< 16.0' },
    { category: 'Underweight (Moderate Thinness)', value: '16.0 – 16.9' },
    { category: 'Underweight (Mild Thinness)', value: '17.0 – 18.4' },
    { category: 'Normal Range', value: '18.5 – 24.9' },
    { category: 'Overweight (Pre-obese)', value: '25.0 – 29.9' },
    { category: 'Obese (Class I)', value: '30.0 – 34.9' },
    { category: 'Obese (Class II)', value: '35.0 – 39.9' },
    { category: 'Obese (Class III)', value: '≥ 40.0' },
  ];

  constructor(private router: Router) {}

  ngOnInit() {}

  goBack() {
    this.router.navigate(['/tabs/dashboard']);
  }
}
