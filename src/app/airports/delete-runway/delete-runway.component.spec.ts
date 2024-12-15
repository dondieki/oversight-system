import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteRunwayComponent } from './delete-runway.component';

describe('DeleteRunwayComponent', () => {
  let component: DeleteRunwayComponent;
  let fixture: ComponentFixture<DeleteRunwayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteRunwayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteRunwayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
