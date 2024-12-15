import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceOrganizationsDetailsComponent } from './maintenance-organizations-details.component';

describe('MaintenanceOrganizationsDetailsComponent', () => {
  let component: MaintenanceOrganizationsDetailsComponent;
  let fixture: ComponentFixture<MaintenanceOrganizationsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaintenanceOrganizationsDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaintenanceOrganizationsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
