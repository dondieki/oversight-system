import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTaxiwayComponent } from './update-taxiway.component';

describe('UpdateTaxiwayComponent', () => {
  let component: UpdateTaxiwayComponent;
  let fixture: ComponentFixture<UpdateTaxiwayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateTaxiwayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateTaxiwayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
