import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnsStationsTableComponent } from './ans-stations-table.component';

describe('AnsStationsTableComponent', () => {
  let component: AnsStationsTableComponent;
  let fixture: ComponentFixture<AnsStationsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnsStationsTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnsStationsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
