import { Component, OnInit, Input } from '@angular/core';
import { MenuItem } from 'src/app/shared/models/menu-item.model';

@Component({
  selector: 'app-home-horizontal-row',
  templateUrl: './home-horizontal-row.component.html',
  styleUrls: ['./home-horizontal-row.component.scss']
})
export class HomeHorizontalRowComponent implements OnInit {
  @Input() title: string;
  @Input() items: MenuItem[];
  @Input() isLast = false;

  ngOnInit() {
  }

  getItems(isBelowBar: boolean): MenuItem[] {
    return this.items ? this.items.filter(item => item.isBelowBar === isBelowBar) : [];
  }
}
