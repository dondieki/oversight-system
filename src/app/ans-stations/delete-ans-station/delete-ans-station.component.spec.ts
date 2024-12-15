import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAnsStationComponent } from './delete-ans-station.component';

describe('DeleteAnsStationComponent', () => {
  let component: DeleteAnsStationComponent;
  let fixture: ComponentFixture<DeleteAnsStationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteAnsStationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteAnsStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
