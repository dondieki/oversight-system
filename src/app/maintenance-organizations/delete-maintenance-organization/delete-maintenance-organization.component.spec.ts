import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteMaintenanceOrganizationComponent } from './delete-maintenance-organization.component';

describe('DeleteMaintenanceOrganizationComponent', () => {
  let component: DeleteMaintenanceOrganizationComponent;
  let fixture: ComponentFixture<DeleteMaintenanceOrganizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteMaintenanceOrganizationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteMaintenanceOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
