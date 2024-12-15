import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaxiwayComponent } from './add-taxiway.component';

describe('AddTaxiwayComponent', () => {
  let component: AddTaxiwayComponent;
  let fixture: ComponentFixture<AddTaxiwayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTaxiwayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTaxiwayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
