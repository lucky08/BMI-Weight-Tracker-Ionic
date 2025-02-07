import { Component, OnInit } from '@angular/core';
import { ChartData } from 'chart.js';

// services
import { DeviceService } from 'src/app/core/services/device.service';
import { UserProfileService } from 'src/app/core/services/user-profile.service';
import { WeightDateService } from 'src/app/core/services/weight-date.service';
import { SettingService } from 'src/app/core/services/setting.service';

// constants
import { WeightDate } from 'src/app/core/models/weight-date.model';
import { poundsToKilogram } from 'src/app/shared/constants/pounds-to-kilogram';

@Component({
  selector: 'app-progress',
  templateUrl: 'progress.page.html',
  styleUrls: ['progress.page.scss'],
  standalone: false,
})
export class ProgressPage implements OnInit {
  histories: WeightDate[] = [];
  unit: string = 'china';
  uuid: any;
  kilogramsUSAValues: any;
  chartData: ChartData<'line'> = {
    labels: [],
    datasets: [],
  };

  selectedTab: string = 'weight';
  selectedSegment: string = '1w';
  // Items for chart data
  dateOptions = [
    { value: '1w', label: 'One Week' },
    { value: '1m', label: 'One Month' },
    { value: '3m', label: 'Three Months' },
    { value: '6m', label: 'Six Months' },
    { value: '1y', label: 'One Year' },
  ];

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

  constructor(
    private userProfileService: UserProfileService,
    private deviceService: DeviceService,
    private weightDateService: WeightDateService,
    private settingService: SettingService,
  ) {
    this.updateChartData(this.selectedTab);
  }

  async ngOnInit() {
    this.uuid = await this.deviceService.getDeviceId();

    this.reloadPage();
  }

  reloadPage() {
    this.userProfileService.getByUuid(this.uuid).subscribe((userProfile) => {
      if (userProfile && typeof userProfile.id === 'number') {
        this.weightDateService.getAllByUserProfileId(userProfile.id).subscribe((histories) => {
          this.settingService.getByUuid(this.uuid).subscribe((updatedSetting) => {
            this.unit = updatedSetting.unit;

            histories.map((history) => {
              if (updatedSetting && updatedSetting.unit === 'usa') {
                const closestHistoryWeight = this.kilogramsUSAValues.reduce((prev: any, curr: any) =>
                  Math.abs(curr - history.weight) < Math.abs(prev - history.weight) ? curr : prev,
                );

                history.weight = poundsToKilogram.filter((item) => item.value === closestHistoryWeight)[0].text;
              } else if (updatedSetting && updatedSetting.unit === 'china') {
                const roundWeight = Number.isInteger(history.weight) ? history.weight : Math.round(history.weight);
                history.weight = roundWeight;
              }
            });
          });

          this.histories = histories;
        });
      }
    });
  }

  setSelectedTab(selectedTab: string) {
    this.updateChartData(selectedTab);
  }

  updateChartData(selectedTab: string) {
    this.selectedTab = selectedTab;
    this.filterDataByTimeRange();
    /* const selectedDataset = this.data.datasets.find((dataset) => dataset.label === selectedTab);
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
    } */
  }

  updateSegment(event: any) {
    this.selectedSegment = String(event.detail.value ?? '1w');
    this.filterDataByTimeRange();
  }

  filterDataByTimeRange() {
    const allDates = this.data.dates;
    const selectedDataset = this.data.datasets.find((dataset) => dataset.label === this.selectedTab);
    if (!selectedDataset) {
      console.error('Invalid tab selected:', this.selectedTab);
      return;
    }

    let numPoints;
    switch (this.selectedSegment) {
      case '1w':
        numPoints = 3;
        break; // 最近3天
      case '1m':
        numPoints = 5;
        break; // 最近5天
      case '3m':
        numPoints = 6;
        break; // 最近6天
      case '6m':
        numPoints = 7;
        break; // 最近7天
      case '1y':
        numPoints = allDates.length;
        break; // 显示全部数据
      default:
        numPoints = allDates.length;
    }

    // 取最新的 numPoints 个数据点
    const filteredDates = allDates.slice(0, numPoints);
    const filteredData = selectedDataset.data.slice(0, numPoints);

    this.chartData = {
      labels: filteredDates,
      datasets: [{ label: this.selectedTab, data: filteredData }],
    };
  }
}
