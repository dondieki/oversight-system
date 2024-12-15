import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTaxiwayComponent } from './delete-taxiway.component';

describe('DeleteTaxiwayComponent', () => {
  let component: DeleteTaxiwayComponent;
  let fixture: ComponentFixture<DeleteTaxiwayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteTaxiwayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteTaxiwayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
