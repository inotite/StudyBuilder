import { FormFieldProperty } from './form-field-property.model';
import { FormFieldValidator } from './form-field-validator.model';

export interface FormField {
    properties: FormFieldProperty;
    validators: FormFieldValidator[];
    value: string|number|boolean;
    isDirty: boolean;
}
