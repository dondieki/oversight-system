import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRunwayComponent } from './update-runway.component';

describe('UpdateRunwayComponent', () => {
  let component: UpdateRunwayComponent;
  let fixture: ComponentFixture<UpdateRunwayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateRunwayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateRunwayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
