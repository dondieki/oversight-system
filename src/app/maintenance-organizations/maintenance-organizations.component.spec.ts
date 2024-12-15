import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceOrganizationsComponent } from './maintenance-organizations.component';

describe('MaintenanceOrganizationsComponent', () => {
  let component: MaintenanceOrganizationsComponent;
  let fixture: ComponentFixture<MaintenanceOrganizationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaintenanceOrganizationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaintenanceOrganizationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
