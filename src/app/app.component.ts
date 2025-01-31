import { Component, OnInit } from '@angular/core';

// service
import { DeviceService } from 'src/app/core/services/device.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {
  constructor(private deviceService: DeviceService) {}

  async ngOnInit() {
    const identifier = await this.deviceService.getDeviceId();
    const info = await this.deviceService.getDeviceInfo();

    this.deviceService.getByUuid(identifier).subscribe((device) => {
      console.log(!device);
      if (!device) {
        const device = {
          uuid: identifier,
          isVirtual: info.isVirtual,
          manufacturer: info.manufacturer,
          model: info.model,
          operatingSystem: info.operatingSystem,
          osVersion: info.osVersion,
          platform: info.platform,
          webViewVersion: info.webViewVersion,
        };
        this.deviceService.save(device).subscribe();
      }
    });
  }
}
