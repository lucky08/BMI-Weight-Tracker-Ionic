import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.page.html',
  styleUrls: ['dashboard.page.scss'],
  standalone: false,
})
export class DashboardPage {
  constructor(private router: Router) {}

  onAddClick() {
    console.log('clicked!');
  }

  navigateToBMIDetail() {
    this.router.navigate(['/tabs/dashboard/bmi-detail']);
  }
}
