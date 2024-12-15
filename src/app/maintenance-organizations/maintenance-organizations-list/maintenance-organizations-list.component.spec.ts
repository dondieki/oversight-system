import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceOrganizationsListComponent } from './maintenance-organizations-list.component';

describe('MaintenanceOrganizationsListComponent', () => {
  let component: MaintenanceOrganizationsListComponent;
  let fixture: ComponentFixture<MaintenanceOrganizationsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaintenanceOrganizationsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaintenanceOrganizationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
