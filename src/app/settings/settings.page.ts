import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: false,
})
export class SettingsPage implements OnInit {
  settings = {
    notifications: true,
    darkMode: false,
  };

  constructor() {}

  ngOnInit() {}

  toggleDarkMode() {
    document.body.classList.toggle('dark', this.settings.darkMode);
  }
}
