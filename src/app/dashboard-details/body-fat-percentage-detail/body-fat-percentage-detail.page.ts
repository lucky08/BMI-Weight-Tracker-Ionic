import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { arrowBack } from 'ionicons/icons';
import { addIcons } from 'ionicons';

// modules
import { CommonModule, NgForOf } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonTitle,
  IonContent,
  IonCard,
} from '@ionic/angular/standalone';

addIcons({
  arrowBack,
});

@Component({
  selector: 'app-body-fat-percentage-detail',
  templateUrl: './body-fat-percentage-detail.page.html',
  styleUrls: ['./body-fat-percentage-detail.page.scss'],
  imports: [
    CommonModule,
    NgForOf,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonButton,
    IonIcon,
    IonTitle,
    IonContent,
    IonCard,
  ],
  standalone: true,
})
export class BodyFatPercentageDetailPage implements OnInit {
  menBFP = [
    { category: 'Essential Fat', percentage: '2-5%' },
    { category: 'Athletes', percentage: '6-13%' },
    { category: 'Fitness', percentage: '14-17%' },
    { category: 'Average', percentage: '18-24%' },
    { category: 'Obesity', percentage: '25% or more' },
  ];

  womenBFP = [
    { category: 'Essential Fat', percentage: '10-13%' },
    { category: 'Athletes', percentage: '14-20%' },
    { category: 'Fitness', percentage: '21-24%' },
    { category: 'Average', percentage: '25-31%' },
    { category: 'Obesity', percentage: '32% or more' },
  ];

  boysBFP = [
    { category: 'Essential Fat', percentage: '6-8%' },
    { category: 'Healthy Range', percentage: '11-25%' },
    { category: 'Overfat', percentage: '25-30%' },
    { category: 'Obese', percentage: 'Above 30%' },
  ];

  girlsBFP = [
    { category: 'Essential Fat', percentage: '12-15%' },
    { category: 'Healthy Range', percentage: '16-30%' },
    { category: 'Overfat', percentage: '31-35%' },
    { category: 'Obese', percentage: 'Above 35%' },
  ];

  constructor(private router: Router) {}

  ngOnInit() {}

  goBack() {
    this.router.navigate(['/tabs/dashboard']);
  }
}
