import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAirlineComponent } from './delete-airline.component';

describe('DeleteAirlineComponent', () => {
  let component: DeleteAirlineComponent;
  let fixture: ComponentFixture<DeleteAirlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteAirlineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteAirlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
