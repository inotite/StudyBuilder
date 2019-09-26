import { FormFieldType } from './form-field-type.model';
import { FormFieldToggleText } from './form-field-toggle-text.model';
import { FormFieldSelectOptions } from './form-field-select-options.model';

export interface FormFieldProperty {
    section: string;
    group: string;
    type: FormFieldType;
    valueIncrement: number;
    key: string;
    order: number;
    label: string;
    descriptor: string;
    description: string;
    defaultValue: string|number|boolean;
    toggleText: FormFieldToggleText;
    placeHolderText: string;
    selectOptions: FormFieldSelectOptions[];
}
