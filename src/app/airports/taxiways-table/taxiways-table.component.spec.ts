import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxiwaysTableComponent } from './taxiways-table.component';

describe('TaxiwaysTableComponent', () => {
  let component: TaxiwaysTableComponent;
  let fixture: ComponentFixture<TaxiwaysTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaxiwaysTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaxiwaysTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
