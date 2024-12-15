import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IUser } from 'src/app/interfaces/user.interface';
import { UpdateUserComponent } from '../update-user/update-user.component';
import { UsersListComponent } from '../users-list/users-list.component';
import { DeleteUserComponent } from '../delete-user/delete-user.component';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
})
export class UsersTableComponent {
  @Input() users!: IUser[];
  @Output() userUpdated = new EventEmitter<void>();
  displayedColumns: string[] = ['date', 'user', 'role', 'actions'];

  constructor(private dialog: MatDialog, public appService: AppService) {}

  openEditDialog(user: IUser): void {
    const dialogRef = this.dialog.open(UpdateUserComponent, {
      data: user,
      width: '60%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userUpdated.emit();
      }
    });
  }

  openDeleteDialog(user: IUser): void {
    const dialogRef = this.dialog.open(DeleteUserComponent, {
      data: user,
      width: '50%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userUpdated.emit();
      }
    });
  }
}
