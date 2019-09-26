import { FormFieldValidatorType } from './form-field-validator-type.model';

export interface FormFieldValidator {
    type: FormFieldValidatorType;
    value: string|number;
    error: string;
}
