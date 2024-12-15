import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAnsStationComponent } from './update-ans-station.component';

describe('UpdateAnsStationComponent', () => {
  let component: UpdateAnsStationComponent;
  let fixture: ComponentFixture<UpdateAnsStationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateAnsStationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateAnsStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
