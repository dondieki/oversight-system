import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirportsTableComponent } from './airports-table.component';

describe('AirportsTableComponent', () => {
  let component: AirportsTableComponent;
  let fixture: ComponentFixture<AirportsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AirportsTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AirportsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
