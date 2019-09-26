import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MaterialUIModule } from '../../../material-ui/material-ui.module';
import { TestHelper } from 'src/app/shared/helpers/test.helper';
import { FormFieldTextInputComponent } from './text-input.component';
import { FormFieldType } from 'src/app/yprime-artifacts/models/form-field-type.model';
import { FormFieldValidatorType } from 'src/app/yprime-artifacts/models/form-field-validator-type.model';

describe('FormFieldTextInputComponent', () => {
  let component: FormFieldTextInputComponent;
  let fixture: ComponentFixture<FormFieldTextInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormFieldTextInputComponent ],
      imports: [ ReactiveFormsModule, MaterialUIModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFieldTextInputComponent);
    component = fixture.componentInstance;
    component.formField = {
      properties: {
        section: '',
        group: '',
        key: 'TestKey01',
        type: FormFieldType.Text,
        order: 0,
        label: 'Test',
        defaultValue: '',
        descriptor: 'Test Descriptor',
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
    component.formGroup = new FormBuilder().group({});
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it(`should not display mandatory when it hasn't required validator`, () => {
    fixture.detectChanges();
    const element = TestHelper.getElementByCss(fixture, '.asterik.s18');
    expect(element).toBeFalsy();
  });

  it(`should display mandatory when it has validator`, () => {
    component.formField = {
      properties: {
        section: '',
        group: '',
        key: 'TestKey01',
        type: FormFieldType.Text,
        order: 0,
        label: 'Test Label',
        defaultValue: 'Test Default',
        descriptor: 'Test Descriptor',
        description: '',
        placeHolderText: '',
        valueIncrement: 0,
        toggleText: null,
        selectOptions: null
      },
      validators: [
        { type: FormFieldValidatorType.Required, value: null, error: 'Required'},
      ],
      value: '',
      isDirty: false
    };
    fixture.detectChanges();
    const element = TestHelper.getElementByCss(fixture, '.asterik.s18');
    expect(element).toBeTruthy();
  });

  it(`should display label 'Test'`, () => {
    fixture.detectChanges();
    const element = TestHelper.getElementByCss(fixture, '.field-label label');
    expect(element.innerHTML).toEqual('Test');
  });

  it(`should display text input with value 'Test'`, () => {
    component.formField = {
      properties: {
        section: '',
        group: '',
        key: 'TestKey01',
        type: FormFieldType.Text,
        order: 0,
        label: 'Test',
        defaultValue: 'Test',
        descriptor: 'Test Descriptor',
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
    const element = TestHelper.getElementByCss(fixture, 'input.form-control');
    expect(element.value).toEqual('Test');
  });

  it (`should display text input with placeholder 'Test'`, () => {
    component.formField = {
      properties: {
        section: '',
        group: '',
        key: 'TestKey01',
        type: FormFieldType.Text,
        order: 0,
        label: 'Test',
        defaultValue: '',
        descriptor: 'Test Descriptor',
        description: '',
        placeHolderText: 'Test',
        valueIncrement: 0,
        toggleText: null,
        selectOptions: null
      },
      validators: [],
      value: '',
      isDirty: false
    };
    fixture.detectChanges();
    const element = TestHelper.getElementByCss(fixture, 'input.form-control');
    expect(element.placeholder).toEqual('Test');
  });

  it(`should display description text 'Test'`, () => {
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
      validators: [
        { type: FormFieldValidatorType.Required, value: null, error: 'Required'},
      ],
      value: '',
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

  it(`should display 'Exceeds Min Length' alert when user has input 'a' and has min length validator of 3`, () => {
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
      validators: [
        { type: FormFieldValidatorType.MinLength, value: 3, error: 'Exceeds Min Length'},
      ],
      value: null,
      isDirty: false
    };
    fixture.detectChanges();
    component.formControl.markAsDirty();
    component.formControl.setValue('a');
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const element = TestHelper.getElementByCss(fixture, '.alert-invalid div');
      expect(element.innerHTML.replace(/ /g, '')).toEqual('ExceedsMinLength');
    });
  });

  it(`should display 'Exceeds Max Length' alert when user has input 'aaaaaaa' and has max length validator of 3`, () => {
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
      validators: [
        { type: FormFieldValidatorType.MaxLength, value: 3, error: 'Exceeds Max Length'},
      ],
      value: null,
      isDirty: false
    };
    fixture.detectChanges();
    component.formControl.markAsDirty();
    component.formControl.setValue('aaaaaaaaa');
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const element = TestHelper.getElementByCss(fixture, '.alert-invalid div');
      expect(element.innerHTML.replace(/ /g, '')).toEqual('ExceedsMaxLength');
    });
  });

  it ('should emit showHelperText event when helper icon is clicked', () => {
    fixture.detectChanges();
    spyOn(component.showHelperText, 'emit');
    TestHelper.getElementByCss(fixture, '.help-icon').click();
    expect(component.showHelperText.emit).toHaveBeenCalledWith(component.formField.properties.description);
  });
});
