import { Component, Input } from '@angular/core';

import { MenuItem } from 'src/app/shared/models/menu-item.model';

@Component({
  selector: 'app-home-icon',
  templateUrl: './home-icon.component.html',
  styleUrls: ['./home-icon.component.scss']
})
export class HomeIconComponent {
  @Input() icon: MenuItem;
}
