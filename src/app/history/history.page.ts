import { Component } from "@angular/core";

@Component({
  selector: "app-history",
  templateUrl: "history.page.html",
  styleUrls: ["history.page.scss"],
  standalone: false,
})
export class HistoryPage {
  items = [
    ["Date", "Weight", "BMI", "Body Fat", "Status"],
    ["Jan 14, 2025", "73.6kg", "20.0", "23.50%", "Normal"],
    ["Jan 11, 2025", "74.4kg", "21.1", "22.30%", "Normal"],
    ["Jan 10, 2025", "75.5kg", "22.0", "21.41%", "Normal"],
  ];
  constructor() {}
}
