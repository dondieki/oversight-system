import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteInspectionComponent } from './delete-inspection.component';

describe('DeleteInspectionComponent', () => {
  let component: DeleteInspectionComponent;
  let fixture: ComponentFixture<DeleteInspectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteInspectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteInspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
