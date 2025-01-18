import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-body-fat-percentage-detail',
  templateUrl: './body-fat-percentage-detail.page.html',
  styleUrls: ['./body-fat-percentage-detail.page.scss'],
  standalone: false,
})
export class BodyFatPercentageDetailPage implements OnInit {
  menBFP = [
    { category: 'Essential fat', percentage: '2-5%' },
    { category: 'Athletes', percentage: '6-13%' },
    { category: 'Fitness', percentage: '14-17%' },
    { category: 'Average', percentage: '18-24%' },
    { category: 'Obesity', percentage: '25% or more' },
  ];

  womenBFP = [
    { category: 'Essential fat', percentage: '10-13%' },
    { category: 'Athletes', percentage: '14-20%' },
    { category: 'Fitness', percentage: '21-24%' },
    { category: 'Average', percentage: '25-31%' },
    { category: 'Obesity', percentage: '32% or more' },
  ];

  boysBFP = [
    { category: 'Essential fat', percentage: '6-8%' },
    { category: 'Healthy Range', percentage: '11-25%' },
    { category: 'Overfat', percentage: '25-30%' },
    { category: 'Obese', percentage: 'Above 30%' },
  ];

  girlsBFP = [
    { category: 'Essential fat', percentage: '12-15%' },
    { category: 'Healthy Range', percentage: '16-30%' },
    { category: 'Overfat', percentage: '31-35%' },
    { category: 'Obese', percentage: 'Above 35%' },
  ];

  constructor() {}

  ngOnInit() {}
}
