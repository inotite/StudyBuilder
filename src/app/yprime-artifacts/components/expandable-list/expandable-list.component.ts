import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-expandable-list',
  templateUrl: './expandable-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./expandable-list.component.scss']
})
export class ExpandableListComponent implements OnInit {
  @Input() items: string[];
  @Input() columnCount = 3;
  panelOpenState = false;

  constructor() { }

  ngOnInit() {

  }
}
