import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitiateInspectionComponent } from './initiate-inspection.component';

describe('InitiateInspectionComponent', () => {
  let component: InitiateInspectionComponent;
  let fixture: ComponentFixture<InitiateInspectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitiateInspectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InitiateInspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
