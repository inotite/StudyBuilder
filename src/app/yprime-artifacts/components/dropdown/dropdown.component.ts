import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  ChangeDetectionStrategy
} from '@angular/core';
import { DropdownContent } from './../../models/dropdown-content.model';

@Component({
  selector: 'app-dropdown',
  // Refactor home dropdown before adding OnPush.
  // changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {
  @Input() content: DropdownContent<number>;
  @Output() valueChange = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  makeChoice(value: string) {
    this.valueChange.emit(value);
  }
}
