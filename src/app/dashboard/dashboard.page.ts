import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { WeightDateModalPage } from 'src/app/weight-date-modal/weight-date-modal.page';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.page.html',
  styleUrls: ['dashboard.page.scss'],
  standalone: false,
})
export class DashboardPage {
  constructor(
    private router: Router,
    private modalController: ModalController,
  ) {}

  navigateToBMIDetail() {
    this.router.navigate(['/tabs/dashboard/bmi-detail']);
  }

  navigateToBodyFatPercentageDetail() {
    this.router.navigate(['/tabs/dashboard/body-fat-percentage-detail']);
  }

  async onAddWeight(isEdit: boolean) {
    const modal = await this.modalController.create({
      component: WeightDateModalPage, // open Modal page
      componentProps: {
        isEdit: isEdit,
      },
    });

    modal.onDidDismiss().then((detail) => {
      if (detail !== null && detail.data.result !== 'closed') {
        const weightDate = {
          weight: detail.data.result.weight,
          date: this.formatDate(detail.data.result),
        };

        console.log(weightDate);
      }
    });

    await modal.present();
  }

  formatDate(dateTime: string): string {
    const date = new Date(dateTime);
    return date.toISOString().split('T')[0];
  }
}
