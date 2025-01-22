import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-weight-date-modal',
  templateUrl: './weight-date-modal.page.html',
  styleUrls: ['./weight-date-modal.page.scss'],
  standalone: false,
})
export class WeightDateModalPage implements OnInit {
  isEdit: boolean;
  weight: number | null = null;
  selectedDate: string | null = null;

  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
  ) {
    this.isEdit = this.navParams.get('isEdit');
  }

  ngOnInit() {}

  async closeModal() {
    await this.modalController.dismiss({ result: 'closed' });
  }

  submitForm() {
    const data = {
      weight: this.weight,
      date: this.selectedDate,
    };

    this.modalController.dismiss({ result: data });
  }
}
