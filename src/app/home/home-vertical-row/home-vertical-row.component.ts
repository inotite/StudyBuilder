import { Component, Input } from '@angular/core';
import { MenuItem } from './../../shared/models/menu-item.model';

@Component({
  selector: 'app-home-vertical-row',
  templateUrl: './home-vertical-row.component.html',
  styleUrls: ['./home-vertical-row.component.scss']
})
export class HomeVerticalRowComponent {
  @Input() items: MenuItem[];
  @Input() title: string;
}
