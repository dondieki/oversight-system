import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionsStatsComponent } from './inspections-stats.component';

describe('InspectionsStatsComponent', () => {
  let component: InspectionsStatsComponent;
  let fixture: ComponentFixture<InspectionsStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InspectionsStatsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InspectionsStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
