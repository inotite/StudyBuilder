import { Component, Input } from '@angular/core';
import { MenuItem } from '../../shared/models/menu-item.model';

@Component({
  selector: 'app-home-horizontal-row-section',
  templateUrl: './home-horizontal-row-section.component.html',
  styleUrls: ['./home-horizontal-row-section.component.scss']
})
export class HomeHorizontalRowSectionComponent {
  @Input() isAboveBar: boolean;
  @Input() items: MenuItem[];
}
