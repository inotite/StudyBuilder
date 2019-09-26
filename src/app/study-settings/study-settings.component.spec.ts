import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudySettingsComponent } from './study-settings.component';
import { StudySettingsLeftPanelComponent } from './left-panel/study-settings-left-panel.component';
import { StudySettingsMiddlePanelComponent } from './middle-panel/study-settings-middle-panel.component';
import { StudySettingsRightPanelComponent } from './right-panel/study-settings-right-panel.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialUIModule } from '../yprime-artifacts/material-ui/material-ui.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormFieldType } from '../yprime-artifacts/models/form-field-type.model';
import { TestHelper } from '../shared/helpers/test.helper';
import { FormFieldComponent } from '../yprime-artifacts/components/form-field/form-field.component';
import { HelperTextComponent } from '../shared/components/helper-text/helper-text.component';
import { FormFieldTextInputComponent } from '../yprime-artifacts/components/form-field/text-input/text-input.component';
import { FormFieldNumberInputComponent } from '../yprime-artifacts/components/form-field/number-input/number-input.component';
import { FormFieldToggleButtonComponent } from '../yprime-artifacts/components/form-field/toggle-button/toggle-button.component';
import { FormFieldDropdownSelectComponent } from '../yprime-artifacts/components/form-field/dropdown-select/dropdown-select.component';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

describe('StudySettingsComponent', () => { 
  let component: StudySettingsComponent;
  let fixture: ComponentFixture<StudySettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        StudySettingsComponent,
        StudySettingsLeftPanelComponent,
        StudySettingsMiddlePanelComponent,
        StudySettingsRightPanelComponent,
        HelperTextComponent,
        FormFieldComponent,
        FormFieldTextInputComponent,
        FormFieldNumberInputComponent,
        FormFieldToggleButtonComponent,
        FormFieldDropdownSelectComponent
      ],
      imports: [
        FormsModule, ReactiveFormsModule, MaterialUIModule, HttpClientTestingModule
      ]
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
    fixture = TestBed.createComponent(StudySettingsComponent);
    component = fixture.componentInstance;
    component.studySettings = [
      {
        properties: {
          section: 'StudyWide',
          group: 'General',
          key: 'sponserName',
          label: 'Sponser Name',
          type: FormFieldType.Text,
          valueIncrement: null,
          order: 0,
          descriptor: '',
          description: 'Sponser Name Field',
          defaultValue: null,
          placeHolderText : null,
          toggleText: null,
          selectOptions: null
        },
        validators: [],
        value: '',
        isDirty: false
      },
      {
        properties: {
          section: 'StudyWide',
          group: 'General',
          key: 'studyName',
          label: 'Study Name',
          type: FormFieldType.Text,
          valueIncrement: null,
          order: 0,
          descriptor: '',
          description: 'Study Name Field',
          defaultValue: null,
          placeHolderText : null,
          toggleText: null,
          selectOptions: null
        },
        validators: [],
        value: '',
        isDirty: false
      },
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it ('should include left panel component', () => {
    const left = TestHelper.getElementByAngular(fixture, StudySettingsLeftPanelComponent);
    expect(left).toBeTruthy();
  });

  it ('should include middle panel component', () => {
    const middle = TestHelper.getElementByAngular(fixture, StudySettingsMiddlePanelComponent);
    expect(middle).toBeTruthy();
  });

  it ('should include right panel component', () => {
    const right = TestHelper.getElementByAngular(fixture, StudySettingsRightPanelComponent);
    expect(right).toBeTruthy();
  });
});
