import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeightDateModalPage } from './weight-date-modal.page';

describe('WeightDateModalPage', () => {
  let component: WeightDateModalPage;
  let fixture: ComponentFixture<WeightDateModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(WeightDateModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
