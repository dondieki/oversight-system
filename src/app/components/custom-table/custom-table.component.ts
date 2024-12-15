import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.scss']
})
export class CustomTableComponent {
  @Input() displayedColumns: string[] = [];
  @Input() dataSource: any;

  constructor() {}
}
