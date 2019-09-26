import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { GenericListItem } from './generic-list-item.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Input() items: GenericListItem[];

  constructor() { }

  ngOnInit() {
  }

}
