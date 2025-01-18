import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bmi-detail',
  templateUrl: './bmi-detail.page.html',
  styleUrls: ['./bmi-detail.page.scss'],
  standalone: false,
})
export class BmiDetailPage implements OnInit {
  bmis = [
    { category: 'Category', value: 'BMI (kg/m²)' },
    { category: 'Underweight (Severe thinness)', value: '< 16.0' },
    { category: 'Underweight (Moderate thinness)', value: '16.0 – 16.9' },
    { category: 'Underweight (Mild thinness)', value: '17.0 – 18.4' },
    { category: 'Normal range', value: '18.5 – 24.9' },
    { category: 'Overweight (Pre-obese)', value: '25.0 – 29.9' },
    { category: 'Obese (Class I)', value: '30.0 – 34.9' },
    { category: 'Obese (Class II)', value: '35.0 – 39.9' },
    { category: 'Obese (Class III)', value: '≥ 40.0' },
  ];

  constructor() {}

  ngOnInit() {
    console.log('start!!');
  }
}
