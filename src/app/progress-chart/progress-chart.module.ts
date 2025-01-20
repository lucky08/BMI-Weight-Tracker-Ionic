import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProgressChartPageRoutingModule } from './progress-chart-routing.module';

import { ProgressChartComponent } from './progress-chart.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ProgressChartPageRoutingModule],
  declarations: [ProgressChartComponent],
})
export class ProgressChartComponentModule {}
