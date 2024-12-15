import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnsStationsListComponent } from './ans-stations-list.component';

describe('AnsStationsListComponent', () => {
  let component: AnsStationsListComponent;
  let fixture: ComponentFixture<AnsStationsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnsStationsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnsStationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
