import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirlinesDetailsComponent } from './airlines-details.component';

describe('AirlinesDetailsComponent', () => {
  let component: AirlinesDetailsComponent;
  let fixture: ComponentFixture<AirlinesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AirlinesDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AirlinesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
