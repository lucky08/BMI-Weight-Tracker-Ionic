import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProgressChartComponent } from './progress-chart.component';

describe('ProgressChartComponent', () => {
  let component: ProgressChartComponent;
  let fixture: ComponentFixture<ProgressChartComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
