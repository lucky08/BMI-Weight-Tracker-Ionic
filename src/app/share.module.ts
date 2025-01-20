import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { ProgressChartComponent } from './progress-chart/progress-chart.component';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [ProgressChartComponent],
  imports: [CommonModule, IonicModule, NgChartsModule],
  exports: [ProgressChartComponent],
})
export class SharedModule {}
