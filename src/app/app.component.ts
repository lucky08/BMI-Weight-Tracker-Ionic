import { Component, OnInit } from '@angular/core';
import { Device } from '@capacitor/device';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {
  constructor() {}

  async ngOnInit() {
    const identifier = await this.getDeviceId();
    const info = await this.getDeviceInfo();
  }

  async getDeviceId() {
    const info = await Device.getId();
    console.log('Device ID:', info.identifier);
    return info.identifier;
  }

  async getDeviceInfo() {
    const info = await Device.getInfo();
    console.log('Device Info:', info);
    return info;
  }
}
