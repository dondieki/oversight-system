import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirlinesListComponent } from './airlines-list.component';

describe('AirlinesListComponent', () => {
  let component: AirlinesListComponent;
  let fixture: ComponentFixture<AirlinesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AirlinesListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AirlinesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
