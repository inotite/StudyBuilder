import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFieldComponent } from './form-field.component';
import { FormFieldType } from '../../models/form-field-type.model';
import { TestHelper } from 'src/app/shared/helpers/test.helper';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MaterialUIModule } from '../../material-ui/material-ui.module';
import { FormFieldTextInputComponent } from './text-input/text-input.component';
import { FormFieldNumberInputComponent } from './number-input/number-input.component';
import { FormFieldToggleButtonComponent } from './toggle-button/toggle-button.component';
import { FormFieldDropdownSelectComponent } from './dropdown-select/dropdown-select.component';

describe('FormFieldComponent', () => {
  let component: FormFieldComponent;
  let fixture: ComponentFixture<FormFieldComponent>;

  beforeEach(async(() => {
    TestBed
    .configureTestingModule({
      declarations: [
        FormFieldComponent,
        FormFieldTextInputComponent,
        FormFieldNumberInputComponent,
        FormFieldToggleButtonComponent,
        FormFieldDropdownSelectComponent
      ],
      imports: [ ReactiveFormsModule, MaterialUIModule ]
    })
    .overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [
          FormFieldTextInputComponent,
          FormFieldNumberInputComponent,
          FormFieldToggleButtonComponent,
          FormFieldDropdownSelectComponent
        ],
      }
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFieldComponent);
    component = fixture.componentInstance;

    component.formField = {
      properties: {
        section: '',
        group: '',
        key: 'TestKey01',
        type: FormFieldType.Text,
        order: 0,
        label: 'TestLabel',
        defaultValue: '',
        descriptor: 'Test',
        description: 'TestDescription',
        placeHolderText: '',
        valueIncrement: 0,
        toggleText: null,
        selectOptions: null
      },
      validators: [],
      value: '',
      isDirty: false
    };
    component.formGroup = new FormBuilder().group({});
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it ('should render TextInputComponent when FormFieldType is TextInput', () => {
    component.formField = {
      properties: {
        section: '',
        group: '',
        key: 'TestKey01',
        type: FormFieldType.Text,
        order: 0,
        label: '',
        defaultValue: '',
        descriptor: 'Test',
        description: '',
        placeHolderText: '',
        valueIncrement: 0,
        toggleText: null,
        selectOptions: null
      },
      validators: [],
      value: '',
      isDirty: false
    };

    fixture.detectChanges();
    const element = TestHelper.getAllElementsByAngular(fixture, 'app-form-field-text-input');
    expect(element).toBeTruthy();
  });

  it ('should render NumberInputComponent when FormFieldType is NumberInput', () => {
    component.formField = {
      properties: {
        section: '',
        group: '',
        key: 'TestKey02',
        type: FormFieldType.Number,
        order: 0,
        label: '',
        defaultValue: '',
        descriptor: 'Test',
        description: '',
        placeHolderText: '',
        valueIncrement: 0,
        toggleText: null,
        selectOptions: null
      },
      validators: [],
      value: '',
      isDirty: false
    };

    fixture.detectChanges();
    const element = TestHelper.getAllElementsByAngular(fixture, 'app-form-field-number-input');
    expect(element).toBeTruthy();
  });

  it ('should render DropdownSelectComponent when FormFieldType is DropdownSelect', () => {
    component.formField = {
      properties: {
        section: '',
        group: '',
        key: 'TestKey03',
        type: FormFieldType.Dropdown,
        order: 0,
        label: '',
        defaultValue: '',
        descriptor: 'Test',
        description: '',
        placeHolderText: '',
        valueIncrement: 0,
        toggleText: null,
        selectOptions: null
      },
      validators: [],
      value: '',
      isDirty: false
    };

    fixture.detectChanges();
    const element = TestHelper.getAllElementsByAngular(fixture, 'app-form-field-dropdown-select');
    expect(element).toBeTruthy();
  });

  it ('should render ToggleButtonComponent when FormFieldType is ToggleButton', () => {
    component.formField = {
      properties: {
        section: '',
        group: '',
        key: 'TestKey04',
        type: FormFieldType.Toggle,
        order: 0,
        label: '',
        defaultValue: '',
        descriptor: 'Test',
        description: '',
        placeHolderText: '',
        valueIncrement: 0,
        toggleText: null,
        selectOptions: null
      },
      validators: [],
      value: '',
      isDirty: false
    };

    fixture.detectChanges();
    const element = TestHelper.getAllElementsByAngular(fixture, 'app-form-field-toggle-button');
    expect(element).toBeTruthy();
  });

  it ('should emit showHelperText event when showHelperText is emitted from the child component', () => {
    fixture.detectChanges();
    spyOn(component.showHelperText, 'emit');
    component.onShowHelperText();
    expect(component.showHelperText.emit).toHaveBeenCalledWith({
      heading: component.formField.properties.label,
      content: component.formField.properties.description,
      example: 'Example'
    });
  });
});
