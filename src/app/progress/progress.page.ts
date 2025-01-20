import { Component, AfterViewInit } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-progress',
  templateUrl: 'progress.page.html',
  styleUrls: ['progress.page.scss'],
  standalone: false,
})
export class ProgressPage implements AfterViewInit {
  // Items for chart data
  items = [
    ['Date', 'Weight'],
    ['Jan 14, 2025', '73.6kg'],
    ['Jan 11, 2025', '74.4kg'],
    ['Jan 10, 2025', '75.5kg'],
  ];

  // Chart data
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: this.items.slice(1).map((item) => item[0]), // Extract Dates
    datasets: [
      {
        data: this.items.slice(1).map((item) => parseFloat(item[1].replace('kg', ''))), // Extract Weights
        label: 'Weight (kg)',
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: false,
        tension: 0.4,
        type: 'line', // Set Line Chart
      },
    ],
  };

  // Chart options
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: false,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        onClick: (e: any) => {
          // 阻止点击事件冒泡
          e.stopImmediatePropagation();
        }, // 禁止点击图例时切换折线图的显示/隐藏
      },
    },
  };

  constructor() {}

  ngAfterViewInit(): void {}
}
