import { ArrowDirections } from './../../shared/models/arrow-directions.model';
import { ArrowColors } from './../../shared/models/arrow-colors.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-arrow-wrapper',
  templateUrl: './home-arrow-wrapper.component.html',
  styleUrls: ['./home-arrow-wrapper.component.scss']
})
export class HomeArrowWrapperComponent {
  public settings = {
    color: ArrowColors.Pink,
    direction: ArrowDirections.Right
  };
}
