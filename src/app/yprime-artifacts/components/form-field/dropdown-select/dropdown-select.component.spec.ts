import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MaterialUIModule } from '../../../material-ui/material-ui.module';
import { TestHelper } from 'src/app/shared/helpers/test.helper';
import { FormFieldDropdownSelectComponent } from './dropdown-select.component';
import { FormFieldType } from 'src/app/yprime-artifacts/models/form-field-type.model';
import { FormFieldValidatorType } from 'src/app/yprime-artifacts/models/form-field-validator-type.model';

describe('FormFieldDropdownSelectComponent', () => {
  let component: FormFieldDropdownSelectComponent;
  let fixture: ComponentFixture<FormFieldDropdownSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormFieldDropdownSelectComponent ],
      imports: [ ReactiveFormsModule, MaterialUIModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFieldDropdownSelectComponent);
    component = fixture.componentInstance;
    component.formField = {
      properties: {
        section: 'StudyWide',
        group: 'General',
        key: 'SWGField6',
        label: 'SWG Field 6',
        type: FormFieldType.Dropdown,
        valueIncrement: null,
        order: 0,
        descriptor: 'Descriptor',
        description: 'Description',
        defaultValue: null,
        placeHolderText : null,
        toggleText: null,
        selectOptions: [
          {
            value: ',',
            label: 'comma(,)',
          },
          {
            value: '.',
            label: 'dot(.)',
          },
          {
            value: '-',
            label: 'dash(-)',
          },
        ],
      },
      validators: [
        { type: FormFieldValidatorType.Required, value: null, error: 'Required'},
      ],
      value: null,
      isDirty: false
    };
    component.formGroup = new FormBuilder().group({});
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display mandatory when it has required validator', () => {
    fixture.detectChanges();
    const element = TestHelper.getElementByCss(fixture, '.asterik.s18');
    expect(element).toBeTruthy();
  });

  it(`should not display mandatory when it hasn't validator`, () => {
    component.formField = {
      properties: {
        section: 'StudyWide',
        group: 'General',
        key: 'SWGField6',
        label: 'SWG Field 6',
        type: FormFieldType.Dropdown,
        valueIncrement: null,
        order: 0,
        descriptor: 'Descriptor',
        description: 'Description',
        defaultValue: null,
        placeHolderText : null,
        toggleText: null,
        selectOptions: [
          {
            value: ',',
            label: 'comma(,)',
          },
          {
            value: '.',
            label: 'dot(.)',
          },
          {
            value: '-',
            label: 'dash(-)',
          },
        ],
      },
      validators: [
      ],
      value: 'a',
      isDirty: false
    };
    fixture.detectChanges();
    const element = TestHelper.getElementByCss(fixture, '.asterik.s18');
    expect(element).toBeFalsy();
  });

  it(`should display label 'SWG Field 6'`, () => {
    fixture.detectChanges();
    const element = TestHelper.getElementByCss(fixture, '.field-label label');
    expect(element.innerHTML).toEqual('SWG Field 6');
  });

  it(`should display dropdown`, () => {
    fixture.detectChanges();
    const element = TestHelper.getAllElementsByAngular(fixture, 'mat-select');
    expect(element).toBeTruthy();
  });

  it (`should display dropdown helper text 'Select an item...'`, () => {
    fixture.detectChanges();
    TestHelper.getElementByCss(fixture, '.mat-select-trigger').click();

    fixture.whenStable().then(() => {
      const element = TestHelper.getElementByCss(fixture, 'mat-option.mat-option-disabled .mat-option-text');
      expect(element.innerHTML).toEqual('Select an item...');
    });
  });

  it (`should display dropdown 3 select options`, async () => {
    fixture.detectChanges();
    TestHelper.getElementByCss(fixture, '.mat-select-trigger').click();

    fixture.whenStable().then(() => {
      const element = TestHelper.getElementByCss(fixture, 'mat-option:not(.mat-option-disabled)');
      expect(element.length).toEqual(3);
    });
  });

  it(`should display help text 'Descriptor`, () => {
    fixture.detectChanges();

    const element = TestHelper.getElementByCss(fixture, '.field-info label');
    expect(element.innerHTML).toEqual('Descriptor');
  });

  it(`should display help icon`, () => {
    fixture.detectChanges();
    const element = TestHelper.getAllElementsByAngular(fixture, 'mat-icon');
    expect(element).toBeTruthy();
  });

  it(`should display pink border when user has not input and has required validator`, () => {
    fixture.detectChanges();
    component.formControl.markAsDirty();
    component.formControl.setValue('');
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const element = TestHelper.getElementByCss(fixture, '.form-control.ng-invalid.ng-dirty');
      expect(element).toBeTruthy();
    });
  });

  it ('should emit showHelperText event when helper icon is clicked', () => {
    fixture.detectChanges();
    spyOn(component.showHelperText, 'emit');
    TestHelper.getElementByCss(fixture, '.help-icon').click();
    expect(component.showHelperText.emit).toHaveBeenCalledWith(component.formField.properties.description);
  });
});
