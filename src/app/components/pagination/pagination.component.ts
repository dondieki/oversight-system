import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  @Input() length!: number;
  @Input() pageSize = 10;
  @Output() pageChange = new EventEmitter<number>();

  onPageChange(event: any) {
    this.pageChange.emit(event.pageIndex);
  }
}
