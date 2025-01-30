import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: false,
})
export class SettingsPage implements OnInit {
  settings = {
    unit: 'china',
    darkMode: false,
  };

  constructor() {}

  ngOnInit() {}

  toggleDarkMode(event: any) {
    const shouldAdd = event.detail.checked;

    document.body.classList.toggle('dark-theme', shouldAdd);
  }
}
