import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectorDashboardComponent } from './inspector-dashboard.component';

describe('InspectorDashboardComponent', () => {
  let component: InspectorDashboardComponent;
  let fixture: ComponentFixture<InspectorDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InspectorDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InspectorDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
