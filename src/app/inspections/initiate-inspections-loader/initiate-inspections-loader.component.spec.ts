import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitiateInspectionsLoaderComponent } from './initiate-inspections-loader.component';

describe('InitiateInspectionsLoaderComponent', () => {
  let component: InitiateInspectionsLoaderComponent;
  let fixture: ComponentFixture<InitiateInspectionsLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitiateInspectionsLoaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InitiateInspectionsLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
