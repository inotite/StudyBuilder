import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormField } from 'src/app/yprime-artifacts/models/form-field.model';
import { FormFieldSelectOptions } from 'src/app/yprime-artifacts/models/form-field-select-options.model';
import { FormFieldValidatorType } from 'src/app/yprime-artifacts/models/form-field-validator-type.model';

@Component({
  selector: 'app-form-field-dropdown-select',
  templateUrl: './dropdown-select.component.html',
  styleUrls: ['./dropdown-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldDropdownSelectComponent implements OnInit {

  @Input() formField: FormField;
  @Input() formGroup: FormGroup;
  @Output() showHelperText: EventEmitter<any> = new EventEmitter();

  key: string;
  label: string;
  defaultValue: string;
  infoText: string;
  value: string;
  selectOptions: FormFieldSelectOptions[];
  placeholder: string;
  formControl: FormControl;
  isRequired = false;

  constructor(private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.label = this.formField.properties.label;
    this.key = this.formField.properties.key;
    this.infoText = this.formField.properties.descriptor || null;
    this.value = this.formField.value ? this.formField.value as string :
                 this.formField.properties.defaultValue ? this.formField.properties.defaultValue as string :
                 '';
    this.selectOptions = this.formField.properties.selectOptions;
    this.placeholder = this.formField.properties.placeHolderText || 'Select an item...';

    const validators = [];
    this.formField.validators.forEach((validator) => {
      switch (validator.type) {
        case FormFieldValidatorType.Required:
          validators.push(Validators.required);
          this.isRequired = true;
          break;
      }
    });

    if (this.formField.properties.defaultValue) {
      this.selectOptions.forEach(selectOption => {
        if ( selectOption.value === this.formField.properties.defaultValue as string) {
          this.defaultValue = selectOption.label;
        }
      });
    }

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
    const validatorType = null;

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
