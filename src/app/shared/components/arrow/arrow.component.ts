import { ArrowColors } from './../../models/arrow-colors.model';
import { ArrowDirections } from './../../models/arrow-directions.model';
import { ArrowSettings } from './../../models/arrow-settings.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-arrow',
  templateUrl: './arrow.component.html',
  styleUrls: ['./arrow.component.scss']
})
export class ArrowComponent implements OnInit {
  @Input() settings: ArrowSettings;

  public colorClass: string;
  public directionClass: string;

  ngOnInit() {
    this.setColor();
    this.setDirection();
  }

  setColor() {
    switch (this.settings.color) {
      case ArrowColors.Pink:
      default:
        this.colorClass = 'pink';
        break;
    }
  }

  setDirection() {
    let direction: string;

    switch (this.settings.direction) {
      case ArrowDirections.Up:
        direction = 'up';
        break;
      case ArrowDirections.Down:
        direction = 'down';
        break;
      case ArrowDirections.Left:
        direction = 'left';
        break;
      case ArrowDirections.Right:
      default:
        direction = 'right';
        break;
    }

    this.directionClass = `fa-long-arrow-alt-${direction}`;
  }
}
