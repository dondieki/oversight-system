import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicDetailsLoaderComponent } from './basic-details-loader.component';

describe('BasicDetailsLoaderComponent', () => {
  let component: BasicDetailsLoaderComponent;
  let fixture: ComponentFixture<BasicDetailsLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicDetailsLoaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicDetailsLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
