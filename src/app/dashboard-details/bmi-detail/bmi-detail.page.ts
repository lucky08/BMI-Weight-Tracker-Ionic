import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bmi-detail',
  templateUrl: './bmi-detail.page.html',
  styleUrls: ['./bmi-detail.page.scss'],
  standalone: false,
})
export class BmiDetailPage implements OnInit {
  constructor() {}

  ngOnInit() {
    console.log('start!!');
  }
}
