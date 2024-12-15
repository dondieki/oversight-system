import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAirportComponent } from './delete-airport.component';

describe('DeleteAirportComponent', () => {
  let component: DeleteAirportComponent;
  let fixture: ComponentFixture<DeleteAirportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteAirportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteAirportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
