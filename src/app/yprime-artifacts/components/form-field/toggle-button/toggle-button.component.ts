import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormField } from 'src/app/yprime-artifacts/models/form-field.model';

@Component({
  selector: 'app-form-field-toggle-button',
  templateUrl: './toggle-button.component.html',
  styleUrls: ['./toggle-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldToggleButtonComponent implements OnInit {

  @Input() formField: FormField;
  @Input() formGroup: FormGroup;
  @Output() showHelperText: EventEmitter<string> = new EventEmitter();

  label: string;
  key: string;
  defaultValue: boolean;
  infoText: string;
  value: boolean;
  valueText: string[];
  formControl: FormControl;

  constructor(private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.label = this.formField.properties.label;
    this.key = this.formField.properties.key;
    this.defaultValue = this.formField.properties.defaultValue ?
                        (this.formField.properties.defaultValue.toString().toLowerCase() === 'true') :
                        false;
    this.infoText = this.formField.properties.descriptor || null;
    this.value = this.formField.value ? (this.formField.value.toString().toLowerCase() === 'true') :
                 this.defaultValue !== undefined ? this.defaultValue :
                 false;

    this.valueText = [
      (this.formField.properties.toggleText && this.formField.properties.toggleText.trueText) || 'True',
      (this.formField.properties.toggleText && this.formField.properties.toggleText.falseText) || 'False',
    ];

    this.formControl = new FormControl(this.value);
    this.formControl.valueChanges.subscribe(() => {
      this.cdr.detectChanges();
    });
    setTimeout(() => { this.formGroup.addControl(this.formField.properties.key, this.formControl); });
  }

  onClickHelperText() {
    this.showHelperText.emit(this.formField.properties.description);
  }
}
