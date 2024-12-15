import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnsStationsComponent } from './ans-stations.component';

describe('AnsStationsComponent', () => {
  let component: AnsStationsComponent;
  let fixture: ComponentFixture<AnsStationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnsStationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnsStationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
