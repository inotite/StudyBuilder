import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MaterialUIModule } from '../../../material-ui/material-ui.module';
import { TestHelper } from 'src/app/shared/helpers/test.helper';
import { FormFieldNumberInputComponent } from './number-input.component';
import { FormFieldType } from 'src/app/yprime-artifacts/models/form-field-type.model';
import { FormFieldValidatorType } from 'src/app/yprime-artifacts/models/form-field-validator-type.model';

describe('FormFieldNumberInputComponent', () => {
  let component: FormFieldNumberInputComponent;
  let fixture: ComponentFixture<FormFieldNumberInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormFieldNumberInputComponent ],
      imports: [ ReactiveFormsModule, MaterialUIModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFieldNumberInputComponent);
    component = fixture.componentInstance;
    component.formField = {
      properties: {
        section: '',
        group: '',
        key: 'TestKey01',
        type: FormFieldType.Number,
        order: 0,
        label: 'Test',
        defaultValue: '',
        descriptor: 'Test',
        description: '',
        placeHolderText: '',
        valueIncrement: 0,
        toggleText: null,
        selectOptions: null
      },
      validators: [],
      value: 0,
      isDirty: false
    };
    component.formGroup = new FormBuilder().group({});
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it (`should display mandatory when it has required validator`, () => {
    component.formField = {
      properties: {
        section: '',
        group: '',
        key: 'TestKey01',
        type: FormFieldType.Number,
        order: 0,
        label: 'Test',
        defaultValue: 123,
        descriptor: 'Test',
        description: '',
        placeHolderText: '',
        valueIncrement: 0,
        toggleText: null,
        selectOptions: null
      },
      validators: [
        { type: FormFieldValidatorType.Required, value: null, error: 'Required' }
      ],
      value: 0,
      isDirty: false
    };
    fixture.detectChanges();
    const element = TestHelper.getElementByCss(fixture, '.s18.asterik');
    expect(element).toBeTruthy();
  });

  it (`should not display mandatory when it has not required validator`, () => {
    fixture.detectChanges();
    const element = TestHelper.getElementByCss(fixture, '.s18.asterik');
    expect(element).toBeFalsy();
  });

  it (`should display label 'Test'`, () => {
    fixture.detectChanges();
    const element = TestHelper.getElementByCss(fixture, '.field-label label');
    expect(element.innerHTML).toEqual('Test');
  });

  it (`should display number input with value '123'`, () => {
    component.formField = {
      properties: {
        section: '',
        group: '',
        key: 'TestKey01',
        type: FormFieldType.Number,
        order: 0,
        label: 'Test',
        defaultValue: 123,
        descriptor: 'Test',
        description: '',
        placeHolderText: 'Test',
        valueIncrement: 0,
        toggleText: null,
        selectOptions: null
      },
      validators: [
        { type: FormFieldValidatorType.Required, value: null, error: 'Required' }
      ],
      value: null,
      isDirty: false
    };
    fixture.detectChanges();
    const element = TestHelper.getElementByCss(fixture, 'input[type=number].form-control');
    expect(element.value).toEqual('123');
  });

  it (`should display number input with placeholder 'Test'`, () => {
    component.formField = {
      properties: {
        section: '',
        group: '',
        key: 'TestKey01',
        type: FormFieldType.Number,
        order: 0,
        label: 'Test',
        defaultValue: '',
        descriptor: 'Test',
        description: '',
        placeHolderText: 'Test',
        valueIncrement: 0,
        toggleText: null,
        selectOptions: null
      },
      validators: [
        { type: FormFieldValidatorType.Required, value: null, error: 'Required' }
      ],
      value: null,
      isDirty: false
    };
    fixture.detectChanges();
    const element = TestHelper.getElementByCss(fixture, 'input[type=number].form-control');
    expect(element.placeholder).toEqual('Test');
  });

  it (`should display description text 'Test'`, () => {
    fixture.detectChanges();
    const element = TestHelper.getElementByCss(fixture, '.field-info label');
    expect(element.innerHTML).toEqual('Test');
  });

  it(`should display help icon`, () => {
    fixture.detectChanges();
    const element = TestHelper.getAllElementsByAngular(fixture, 'mat-icon');
    expect(element).toBeTruthy();
  });

  it(`should display pink border when user has not input and has required validator`, () => {
    component.formField = {
      properties: {
        section: '',
        group: '',
        key: 'TestKey01',
        type: FormFieldType.Number,
        order: 0,
        label: '',
        defaultValue: null,
        descriptor: 'Test',
        description: '',
        placeHolderText: '',
        valueIncrement: 0,
        toggleText: null,
        selectOptions: null
      },
      validators: [
        { type: FormFieldValidatorType.Required, value: null, error: 'Required'},
      ],
      value: null,
      isDirty: false
    };
    fixture.detectChanges();
    component.formControl.markAsDirty();
    component.formControl.setValue(null);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const element = TestHelper.getElementByCss(fixture, '.form-control.ng-invalid.ng-dirty');
      expect(element).toBeTruthy();
    });
  });

  it(`should display 'Exceeds Min Value' alert when user has input 1 and has min validator of 3`, () => {
    component.formField = {
      properties: {
        section: '',
        group: '',
        key: 'TestKey01',
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
      validators: [
        { type: FormFieldValidatorType.Min, value: 3, error: 'Exceeds Min Value'},
      ],
      value: null,
      isDirty: false
    };
    fixture.detectChanges();
    component.formControl.markAsDirty();
    component.formControl.setValue(1);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const element = TestHelper.getElementByCss(fixture, '.alert-invalid div');
      expect(element.innerHTML.replace(/ /g, '')).toEqual('ExceedsMinValue');
    });
  });

  it(`should display 'Exceeds Max Value' alert when user has input 10 and has max validator of 3`, () => {
    component.formField = {
      properties: {
        section: '',
        group: '',
        key: 'TestKey01',
        type: FormFieldType.Number,
        order: 0,
        label: '',
        defaultValue: null,
        descriptor: 'Test',
        description: '',
        placeHolderText: '',
        valueIncrement: 0,
        toggleText: null,
        selectOptions: null
      },
      validators: [
        { type: FormFieldValidatorType.Max, value: 3, error: 'Exceeds Max Value'},
      ],
      value: null,
      isDirty: false
    };
    fixture.detectChanges();
    component.formControl.markAsDirty();
    component.formControl.setValue(10);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const element = TestHelper.getElementByCss(fixture, '.alert-invalid div');
      expect(element.innerHTML.replace(/ /g, '')).toEqual('ExceedsMaxValue');
    });
  });

  it ('should emit showHelperText event when helper icon is clicked', () => {
    fixture.detectChanges();
    spyOn(component.showHelperText, 'emit');
    TestHelper.getElementByCss(fixture, '.help-icon').click();
    expect(component.showHelperText.emit).toHaveBeenCalledWith(component.formField.properties.description);
  });
});
