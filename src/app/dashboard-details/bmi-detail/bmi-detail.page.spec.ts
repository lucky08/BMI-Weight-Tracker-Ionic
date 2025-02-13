import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmiDetailPage } from './bmi-detail.page';

describe('BmiDetailPage', () => {
  let component: BmiDetailPage;
  let fixture: ComponentFixture<BmiDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BmiDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
