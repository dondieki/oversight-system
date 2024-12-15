import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunwaysTableComponent } from './runways-table.component';

describe('RunwaysTableComponent', () => {
  let component: RunwaysTableComponent;
  let fixture: ComponentFixture<RunwaysTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RunwaysTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RunwaysTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
