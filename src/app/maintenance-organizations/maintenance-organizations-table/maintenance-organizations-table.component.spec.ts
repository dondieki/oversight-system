import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceOrganizationsTableComponent } from './maintenance-organizations-table.component';

describe('MaintenanceOrganizationsTableComponent', () => {
  let component: MaintenanceOrganizationsTableComponent;
  let fixture: ComponentFixture<MaintenanceOrganizationsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaintenanceOrganizationsTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaintenanceOrganizationsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
