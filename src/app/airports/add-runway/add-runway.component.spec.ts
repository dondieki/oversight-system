import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRunwayComponent } from './add-runway.component';

describe('AddRunwayComponent', () => {
  let component: AddRunwayComponent;
  let fixture: ComponentFixture<AddRunwayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRunwayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRunwayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
