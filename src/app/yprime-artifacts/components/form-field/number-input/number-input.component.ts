import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormField } from 'src/app/yprime-artifacts/models/form-field.model';
import { FormFieldValidatorType } from 'src/app/yprime-artifacts/models/form-field-validator-type.model';

@Component({
  selector: 'app-form-field-number-input',
  templateUrl: './number-input.component.html',
  styleUrls: ['./number-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldNumberInputComponent implements OnInit {

  @Input() formField: FormField;
  @Input() formGroup: FormGroup;
  @Output() showHelperText: EventEmitter<any> = new EventEmitter();

  label: string;
  key: string;
  defaultValue: number;
  infoText: string;
  value: number;
  placeholder: string;
  formControl: FormControl;
  isRequired = false;

  constructor(private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.label = this.formField.properties.label;
    this.key = this.formField.properties.key;
    this.defaultValue = this.formField.properties.defaultValue !== undefined ? this.formField.properties.defaultValue as number : null;
    this.infoText = this.formField.properties.descriptor || null;
    this.value = this.formField.value ? this.formField.value as number :
                 this.formField.properties.defaultValue !== undefined ? this.formField.properties.defaultValue as number :
                 null;
    this.placeholder = this.formField.properties.placeHolderText || '';

    const validators = [];
    this.formField.validators.forEach((validator) => {
      switch (validator.type) {
        case FormFieldValidatorType.Required:
          validators.push(Validators.required);
          this.isRequired = true;
          break;
        case FormFieldValidatorType.Min:
          validators.push(Validators.min(validator.value as number));
          break;
        case FormFieldValidatorType.Max:
          validators.push(Validators.max(validator.value as number));
          break;
      }
    });

    this.formControl = new FormControl(this.value, validators);
    this.formControl.statusChanges.subscribe(() => {
      this.cdr.detectChanges();
    });
    setTimeout(() => { this.formGroup.addControl(this.formField.properties.key, this.formControl); });
  }

  onClickHelperText() {
    this.showHelperText.emit(this.formField.properties.description);
  }

  getErrorMessage() {
    const validatorType = this.formControl.hasError('max') ? FormFieldValidatorType.Max :
                          this.formControl.hasError('min') ? FormFieldValidatorType.Min :
                          null;

    let errorMessage = '';
    if (validatorType) {
      this.formField.validators.forEach((validator) => {
        if (validatorType === validator.type) {
          errorMessage = validator.error;
        }
      });
    }

    return errorMessage;
  }
}
