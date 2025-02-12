import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChartConfiguration, ChartOptions, ChartData } from 'chart.js';

@Component({
  selector: 'app-progress-chart',
  templateUrl: './progress-chart.component.html',
  styleUrls: ['./progress-chart.component.scss'],
  standalone: false,
})
export class ProgressChartComponent implements OnChanges {
  @Input() chartData: ChartData<'line'> = {
    labels: [],
    datasets: [],
  };

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [],
  };

  // Chart options
  @Input() lineChartOptions: ChartOptions<'line'> = {};

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['chartData'] && this.chartData) {
      // Update `lineChartData`
      this.lineChartData = {
        labels: this.chartData.labels, // Extract Dates
        datasets: this.chartData.datasets.map((dataset) => ({
          ...dataset, // Spread existing dataset properties
          data: dataset.data.map((item: any) => {
            // Process data if necessary
            if (typeof item === 'string' && item.includes('kg')) {
              return parseFloat(item.replace('kg', ''));
            }
            return item;
          }),
          label:
            dataset.label === 'weight'
              ? 'Weight'
              : dataset.label === 'bmi'
                ? 'BMI'
                : dataset.label === 'bodyFat'
                  ? 'Body Fat Percentage'
                  : dataset.label,
          borderColor: dataset.borderColor || 'rgba(75, 192, 192, 1)', // Default styles
          backgroundColor: dataset.backgroundColor || 'rgba(75, 192, 192, 0.2)',
          fill: dataset.fill ?? false,
          tension: dataset.tension ?? 0.4,
          type: 'line', // Set Line Chart
        })),
      };
    }
  }
}
