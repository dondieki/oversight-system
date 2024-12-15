import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IIssue } from 'src/app/interfaces/issue.interface';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-issues-table',
  templateUrl: './issues-table.component.html',
  styleUrls: ['./issues-table.component.scss'],
})
export class IssuesTableComponent {
  @Input() issues!: IIssue[];
  @Output() issueUpdated = new EventEmitter<void>();
  displayedColumns: string[] = [
    'date',
    'airport',
    'entity',
    'inspectionType',
    'status',
    'actions',
  ];

  constructor(
    private dialog: MatDialog,
    public appService: AppService,
    private router: Router
  ) {}

  navigateDetails(_id: string) {
    this.router.navigate([`/issues/list/details/${_id}`]);
  }
}
