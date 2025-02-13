import { Component } from '@angular/core';

//modules
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { settingsOutline, gridOutline, timeOutline, speedometerOutline } from 'ionicons/icons';

addIcons({
  settingsOutline,
  gridOutline,
  timeOutline,
  speedometerOutline,
});

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  imports: [CommonModule, RouterModule, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel],
  standalone: true,
})
export class TabsPage {
  constructor() {}
}
