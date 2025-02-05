import { Component } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: 'history.page.html',
  styleUrls: ['history.page.scss'],
  standalone: false,
})
export class HistoryPage {
  items = [
    { date: 'Jan 14, 2025', weight: '73.6kg', bmi: '20.0', bodyFat: '23.50%', status: 'Normal' },
    { date: 'Jan 11, 2025', weight: '74.4kg', bmi: '21.1', bodyFat: '22.30%', status: 'Normal' },
    { date: 'Jan 10, 2025', weight: '75.5kg', bmi: '22.0', bodyFat: '21.41%', status: 'Normal' },
  ];
  constructor() {}

  editRecord(index: number) {
    console.log('index: ' + index);
  }

  deleteRecord(index: number) {
    console.log('index: ' + index);
  }
}
