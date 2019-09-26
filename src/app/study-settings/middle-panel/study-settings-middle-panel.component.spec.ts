import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  ReactiveFormsModule, FormGroup
} from '@angular/forms';
import { StudySettingsMiddlePanelComponent } from './study-settings-middle-panel.component';
import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormField } from 'src/app/yprime-artifacts/models/form-field.model';
import { MaterialUIModule } from 'src/app/yprime-artifacts/material-ui/material-ui.module';

@Component({selector: 'app-form-field', template: ''})
class FormFieldComponent {
  @Input() formField: FormField;
  @Input() formGroup: FormGroup;
}

describe('StudySettingsMiddlePanelComponent', () => {
  let component: StudySettingsMiddlePanelComponent;
  let fixture: ComponentFixture<StudySettingsMiddlePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        StudySettingsMiddlePanelComponent,
        FormFieldComponent
      ],
      providers: [ FormBuilder ],
      imports: [ ReactiveFormsModule, MaterialUIModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudySettingsMiddlePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
