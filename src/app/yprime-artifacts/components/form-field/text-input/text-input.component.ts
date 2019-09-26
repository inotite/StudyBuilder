import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormField } from 'src/app/yprime-artifacts/models/form-field.model';
import { FormFieldValidatorType } from 'src/app/yprime-artifacts/models/form-field-validator-type.model';

@Component({
  selector: 'app-form-field-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldTextInputComponent implements OnInit {

  @Input() formField: FormField;
  @Input() formGroup: FormGroup;
  @Output() showHelperText: EventEmitter<string> = new EventEmitter();

  label: string;
  key: string;
  defaultValue: string;
  infoText: string;
  value: string;
  placeholder: string;
  formControl: FormControl;
  isRequired = false;
  minLength = -1;
  maxLength = -1;

  constructor(private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.label = this.formField.properties.label;
    this.key = this.formField.properties.key;
    this.defaultValue = this.formField.properties.defaultValue as string;
    this.infoText = this.formField.properties.descriptor || null;
    this.value = this.formField.value ? this.formField.value as string :
                 this.formField.properties.defaultValue ? this.formField.properties.defaultValue as string :
                 null;
    this.placeholder = this.formField.properties.placeHolderText || '';

    const validators = [];
    this.formField.validators.forEach((validator) => {
      switch (validator.type) {
        case FormFieldValidatorType.Required:
          validators.push(Validators.required);
          this.isRequired = true;
          break;
        case FormFieldValidatorType.MinLength:
          this.minLength = validator.value as number;
          validators.push(Validators.minLength(this.minLength));
          break;
        case FormFieldValidatorType.MaxLength:
          this.maxLength = validator.value as number;
          validators.push(Validators.maxLength(this.maxLength));
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
    const validatorType = this.formControl.hasError('maxlength') ? FormFieldValidatorType.MaxLength :
                          this.formControl.hasError('minlength') ? FormFieldValidatorType.MinLength :
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
