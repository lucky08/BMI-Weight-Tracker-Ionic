import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BodyFatPercentageDetailPage } from './body-fat-percentage-detail.page';

describe('BodyFatPercentageDetailPage', () => {
  let component: BodyFatPercentageDetailPage;
  let fixture: ComponentFixture<BodyFatPercentageDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyFatPercentageDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
