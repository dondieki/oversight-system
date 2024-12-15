import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteIssuesComponent } from './delete-issues.component';

describe('DeleteIssuesComponent', () => {
  let component: DeleteIssuesComponent;
  let fixture: ComponentFixture<DeleteIssuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteIssuesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteIssuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
