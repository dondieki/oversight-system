import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { IIssue } from 'src/app/interfaces/issue.interface';
import { AppService } from 'src/app/services/app.service';
import { environment } from 'src/environments/environment';
import { UpdateIssueComponent } from '../update-issue/update-issue.component';

@Component({
  selector: 'app-issue-details',
  templateUrl: './issue-details.component.html',
  styleUrls: ['./issue-details.component.scss'],
})
export class IssueDetailsComponent {
  selectedIssueId!: string;
  @Output() issueUpdated = new EventEmitter<void>();

  isLoading: boolean = false;

  issue: IIssue = {} as IIssue;

  constructor(
    public appService: AppService,
    private activeRoute: ActivatedRoute,
    private dialog: MatDialog
  ) {
    this.activeRoute.params?.subscribe((p) => {
      this.selectedIssueId = p['id'];
      this.getIssueDetails(this.selectedIssueId);
    });
  }

  getIssueDetails(selectedIssueId: string) {
    this.isLoading = true;
    this.appService
      .makeGetRequest(`${environment.BASE_URL}/issues/${selectedIssueId}`)
      .subscribe({
        next: (res) => {
          this.isLoading = false;
          if (res.Status === 200) {
            this.issue = res.Payload;
          } else {
            this.appService.showSnackBarMessage(res.Payload);
          }
        },
        error: (error) => {
          this.isLoading = false;
          this.appService.showSnackBarMessage(error);
        },
      });
  }

  openEditDialog(): void {
    const dialogRef = this.dialog.open(UpdateIssueComponent, {
      data: this.selectedIssueId,
      width: '60%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getIssueDetails(this.selectedIssueId);
      }
    });
  }
}
