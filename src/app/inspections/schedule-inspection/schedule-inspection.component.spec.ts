import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleInspectionComponent } from './schedule-inspection.component';

describe('ScheduleInspectionComponent', () => {
  let component: ScheduleInspectionComponent;
  let fixture: ComponentFixture<ScheduleInspectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleInspectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduleInspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
