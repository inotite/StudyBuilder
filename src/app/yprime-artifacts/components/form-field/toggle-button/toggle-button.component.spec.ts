import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MaterialUIModule } from '../../../material-ui/material-ui.module';
import { TestHelper } from 'src/app/shared/helpers/test.helper';
import { FormFieldToggleButtonComponent } from './toggle-button.component';
import { FormFieldType } from 'src/app/yprime-artifacts/models/form-field-type.model';

describe('FormFieldToggleButtonComponent', () => {
  let component: FormFieldToggleButtonComponent;
  let fixture: ComponentFixture<FormFieldToggleButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormFieldToggleButtonComponent ],
      imports: [ ReactiveFormsModule, MaterialUIModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFieldToggleButtonComponent);
    component = fixture.componentInstance;
    component.formField = {
      properties: {
        section: 'StudyWide',
        group: 'General',
        key: 'TestKey',
        label: 'Test',
        type: FormFieldType.Toggle,
        valueIncrement: null,
        order: 0,
        descriptor: 'Test',
        description: 'Description',
        defaultValue: null,
        placeHolderText : null,
        toggleText: { trueText: 'Yes', falseText: 'No' },
        selectOptions: null
      },
      validators: [],
      value: null,
      isDirty: false
    };
    component.formGroup = new FormBuilder().group({});
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it (`should display label 'Test'`, () => {
    fixture.detectChanges();
    const element = TestHelper.getElementByCss(fixture, '.field-label label');
    expect(element.innerHTML).toEqual('Test');
  });

  it (`should display toggle button`, () => {
    fixture.detectChanges();
    const element = TestHelper.getAllElementsByAngular(fixture, 'mat-slide-toggle');
    expect(element).toBeTruthy();
  });

  it (`should display description text 'Test'`, () => {
    fixture.detectChanges();
    const element = TestHelper.getElementByCss(fixture, '.field-info label');
    expect(element.innerHTML).toEqual('Test');
  });

  it (`should display help icon`, () => {
    fixture.detectChanges();
    const element = TestHelper.getAllElementsByAngular(fixture, 'mat-icon');
    expect(element).toBeTruthy();
  });

  it (`should display toggle text 'No'`, () => {
    fixture.detectChanges();
    const element = TestHelper.getElementByCss(fixture, '.mat-slide-toggle-content');
    expect(element.innerHTML.replace(/ /g, '')).toContain('No');
  });

  it (`should display toggle text 'Yes'`, () => {
    fixture.detectChanges();
    TestHelper.getElementByCss(fixture, '.mat-slide-toggle-label').click();
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const element = TestHelper.getElementByCss(fixture, '.mat-slide-toggle-content');
      expect(element.innerHTML.replace(/ /g, '')).toContain('Yes');
    });
  });

  it (`should display toggle text 'False' when it has not false text`, () => {
    component.formField = {
      properties: {
        section: 'StudyWide',
        group: 'General',
        key: 'TestKey1',
        label: 'Test1',
        type: FormFieldType.Toggle,
        valueIncrement: null,
        order: 0,
        descriptor: 'Test1',
        description: 'Description',
        defaultValue: null,
        placeHolderText : null,
        toggleText: null,
        selectOptions: null
      },
      validators: [],
      value: null,
      isDirty: false
    };
    fixture.detectChanges();
    const element = TestHelper.getElementByCss(fixture, '.mat-slide-toggle-content');
    expect(element.innerHTML.replace(/ /g, '')).toContain('False');
  });

  it ('should emit showHelperText event when helper icon is clicked', () => {
    fixture.detectChanges();
    spyOn(component.showHelperText, 'emit');
    TestHelper.getElementByCss(fixture, '.help-icon').click();
    expect(component.showHelperText.emit).toHaveBeenCalledWith(component.formField.properties.description);
  });
});
