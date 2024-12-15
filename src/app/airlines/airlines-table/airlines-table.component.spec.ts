import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirlinesTableComponent } from './airlines-table.component';

describe('AirlinesTableComponent', () => {
  let component: AirlinesTableComponent;
  let fixture: ComponentFixture<AirlinesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AirlinesTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AirlinesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
