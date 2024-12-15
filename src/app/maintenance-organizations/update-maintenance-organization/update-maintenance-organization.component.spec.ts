import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMaintenanceOrganizationComponent } from './update-maintenance-organization.component';

describe('UpdateMaintenanceOrganizationComponent', () => {
  let component: UpdateMaintenanceOrganizationComponent;
  let fixture: ComponentFixture<UpdateMaintenanceOrganizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateMaintenanceOrganizationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateMaintenanceOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
