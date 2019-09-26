import { Component, OnInit, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-save-cancel-action-bar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './save-cancel-action-bar.component.html',
  styleUrls: ['./save-cancel-action-bar.component.scss']
})
export class SaveCancelActionBarComponent implements OnInit {
  @Output() cancelAction = new EventEmitter<boolean>();
  @Output() saveAction = new EventEmitter<boolean>();
  @Input() displayValidationError: boolean;
  constructor() { }

  ngOnInit() {
  }

}
