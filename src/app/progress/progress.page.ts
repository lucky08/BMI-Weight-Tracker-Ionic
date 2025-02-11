import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';

// rxjs
import { Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

// services
import { DeviceService } from 'src/app/core/services/device.service';
import { UserProfileService } from 'src/app/core/services/user-profile.service';
import { WeightDateService } from 'src/app/core/services/weight-date.service';
import { SettingService } from 'src/app/core/services/setting.service';
import { EventService } from 'src/app/core/services/event.service';

// constants
import { WeightDate } from 'src/app/core/models/weight-date.model';
import { poundsToKilogram } from 'src/app/shared/constants/pounds-to-kilogram';

@Component({
  selector: 'app-progress',
  templateUrl: 'progress.page.html',
  styleUrls: ['progress.page.scss'],
  standalone: false,
})
export class ProgressPage implements OnInit, OnDestroy {
  histories: WeightDate[] = [];
  unit: string = 'china';
  uuid: any;
  kilogramsUSAValues: any;
  chartData: ChartData<'line'> = {
    labels: [],
    datasets: [],
  };
  private progressSubscription!: Subscription;
  selectedTab: string = 'weight';
  selectedSegment: string = '1w';
  // Items for chart data
  dateOptions = [
    { value: '1w', label: 'One Week' },
    { value: '1m', label: 'One Month' },
    { value: '3m', label: 'Three Months' },
    { value: '6m', label: 'Six Months' },
    { value: '1y', label: 'One Year' },
    { value: 'all', label: 'All' },
  ];

  // data: any;
  data = {
    dates: [],
    datasets: [
      {
        label: 'weight',
        data: [],
      },
      {
        label: 'bmi',
        data: [],
      },
      {
        label: 'bodyFat',
        data: [],
      },
    ],
  };

  lineChartOptions: ChartOptions<'line'> = {
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
          e.stopImmediatePropagation();
        },
      },
    },
  };

  lineChartOptions$: BehaviorSubject<ChartOptions<'line'>> = new BehaviorSubject<ChartOptions<'line'>>({
    responsive: true,
    scales: {
      x: {},
      y: {},
    },
  });

  constructor(
    private userProfileService: UserProfileService,
    private deviceService: DeviceService,
    private weightDateService: WeightDateService,
    private settingService: SettingService,
    private eventService: EventService,
  ) {}

  async ngOnInit() {
    this.uuid = await this.deviceService.getDeviceId();
    this.kilogramsUSAValues = poundsToKilogram.map((item) => item.value);
    this.progressSubscription = this.eventService
      .getReloadProgresses()
      .pipe(startWith(null))
      .subscribe(() => {
        this.reloadPage();
      });
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

            this.histories = histories;
            this.data = this.transformHistoryData(this.histories);
            this.updateChartData(this.selectedTab);
          });
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
  }

  updateSegment(event: any) {
    this.selectedSegment = String(event.detail.value ?? '1w');
    this.filterDataByTimeRange();
  }

  filterDataByTimeRange() {
    const allDates = this.data.dates.map((date) => new Date(date));
    const selectedDataset = this.data.datasets.find((dataset) => dataset.label === this.selectedTab);
    if (!selectedDataset) {
      return;
    }

    let numDays;
    switch (this.selectedSegment) {
      case '1w':
        numDays = 7;
        break;
      case '1m':
        numDays = 30;
        break;
      case '3m':
        numDays = 90;
        break;
      case '6m':
        numDays = 180;
        break;
      case '1y':
        numDays = 365;
        break;
      default:
        numDays = Infinity;
    }

    let filteredIndexes: number[];
    if (numDays !== Infinity) {
      const today = new Date();
      const startDate = new Date(today);

      startDate.setDate(today.getDate() - numDays);

      filteredIndexes = allDates
        .map((date, index) => ({ date, index }))
        .filter((item) => item.date >= startDate)
        .map((item) => item.index);
    } else {
      filteredIndexes = allDates.map((_, index: number) => index);
    }

    const filteredDates = filteredIndexes.map((index) => this.data.dates[index]);
    const filteredData = filteredIndexes.map((index) => selectedDataset.data[index]);

    this.chartData = {
      labels: filteredDates,
      datasets: [{ label: this.selectedTab, data: filteredData }],
    };

    this.lineChartOptions = this.getChartOptions(filteredDates);
  }

  transformHistoryData(histories: any[]): any {
    histories.sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime());

    return {
      dates: histories.map((h) =>
        new Date(h.dateTime).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      ),
      datasets: [
        {
          label: 'weight',
          data: histories.map((h) => h.weight),
        },
        {
          label: 'bmi',
          data: histories.map((h) => parseFloat(h.bmi)),
        },
        {
          label: 'bodyFat',
          data: histories.map((h) => parseFloat(h.bodyFatPercentage)),
        },
      ],
    };
  }

  public getChartOptions(filteredDates: string[]): ChartOptions<'line'> {
    const displayedDates = new Set<string>();
    const displayedYears = new Set<number>();

    const xAxisOptions = {
      x: {
        ticks: {
          callback: (value: any, index: number, values: any[]) => {
            const labelStr = filteredDates[index];
            if (!labelStr) {
              return '';
            }
            const labelDate = new Date(labelStr);

            const dateStr = labelDate.toLocaleDateString();
            const year = labelDate.getFullYear();

            if (displayedDates.has(dateStr)) {
              return '';
            }

            switch (this.selectedSegment) {
              case '1w': // every two days
                if (index % 2 === 0) {
                  displayedDates.add(dateStr);
                  return dateStr;
                }
                return '';

              case '1m': // every seven days
                if (index % 7 === 0) {
                  displayedDates.add(dateStr);
                  return dateStr;
                }
                return '';

              case '3m': //every month
              case '6m':
                if (labelDate.getDate() === 1) {
                  displayedDates.add(dateStr);
                  return dateStr;
                }
                return '';

              case '1y': // every three months
                if ([0, 3, 6, 9].includes(labelDate.getMonth())) {
                  displayedDates.add(dateStr);
                  return dateStr;
                }
                return '';

              default: // every year
                if (labelDate.getMonth() === 0 && labelDate.getDate() === 1) {
                  displayedDates.add(dateStr);
                  displayedYears.add(year);
                  return year.toString();
                }
                if (!displayedYears.has(year)) {
                  displayedDates.add(dateStr);
                  displayedYears.add(year);
                  return dateStr;
                }
                return '';
            }
          },
        },
      },
    };

    setTimeout(() => {
      this.lineChartOptions$.next({
        ...this.lineChartOptions,
        scales: {
          ...this.lineChartOptions?.scales,
          ...xAxisOptions,
        },
      });
    }, 100); // Delay by 100ms (0.1 seconds)

    return {
      ...this.lineChartOptions,
      scales: {
        ...this.lineChartOptions.scales,
        ...xAxisOptions,
      },
    };
  }

  ngOnDestroy() {
    this.progressSubscription.unsubscribe();
  }
}
