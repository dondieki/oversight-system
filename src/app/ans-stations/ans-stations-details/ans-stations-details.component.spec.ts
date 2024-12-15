import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnsStationsDetailsComponent } from './ans-stations-details.component';

describe('AnsStationsDetailsComponent', () => {
  let component: AnsStationsDetailsComponent;
  let fixture: ComponentFixture<AnsStationsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnsStationsDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnsStationsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
