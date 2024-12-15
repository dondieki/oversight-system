import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableIssuesComponent } from './table-issues.component';

describe('TableIssuesComponent', () => {
  let component: TableIssuesComponent;
  let fixture: ComponentFixture<TableIssuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableIssuesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableIssuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
