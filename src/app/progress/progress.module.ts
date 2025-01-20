import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProgressPage } from './progress.page';
import { ProgressPageRoutingModule } from './progress-routing.module';
import { NgChartsModule } from 'ng2-charts';
import { SharedModule } from '../share.module';

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, ProgressPageRoutingModule, NgChartsModule, SharedModule],
  declarations: [ProgressPage],
})
export class ProgressPageModule {}
