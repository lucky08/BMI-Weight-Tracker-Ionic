import { Component } from '@angular/core';
import { ChartData } from 'chart.js';

@Component({
  selector: 'app-progress',
  templateUrl: 'progress.page.html',
  styleUrls: ['progress.page.scss'],
  standalone: false,
})
export class ProgressPage {
  chartData: ChartData<'line'> = {
    labels: [],
    datasets: [],
  };

  selectedTab: string = 'weight';
  // Items for chart data
  data = {
    dates: ['Jan 14, 2025', 'Jan 11, 2025', 'Jan 10, 2025'],
    datasets: [
      {
        label: 'weight',
        data: [73.6, 74.4, 75.5],
      },
      {
        label: 'bmi',
        data: [20.0, 21.1, 22.0],
      },
      {
        label: 'bodyFat',
        data: [23.5, 22.3, 21.41],
      },
    ],
  };

  constructor() {
    this.updateChartData(this.selectedTab);
  }

  setSelectedTab(selectedTab: string) {
    this.updateChartData(selectedTab);
  }

  updateChartData(selectedTab: string) {
    const selectedDataset = this.data.datasets.find((dataset) => dataset.label === selectedTab);
    if (selectedDataset) {
      this.chartData = {
        labels: this.data.dates, // reuse labels
        datasets: [
          {
            ...selectedDataset, // include label and data
          },
        ],
      };
    } else {
      console.error('Invalid tab selected:', this.selectedTab);
    }
  }
}
