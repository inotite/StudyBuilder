import { Component,
         OnInit,
         Input,
         SimpleChange,
         OnChanges,
         EventEmitter} from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { FormField } from 'src/app/yprime-artifacts/models/form-field.model';
import { MatSnackBar } from '@angular/material';
import { HelperTextService } from 'src/app/shared/services/helper-text.service';
import { HelperText } from 'src/app/shared/models/helper-text.model';

@Component({
  selector: 'app-study-settings-middle-panel',
  templateUrl: './study-settings-middle-panel.component.html',
  styleUrls: ['./study-settings-middle-panel.component.scss']
})
export class StudySettingsMiddlePanelComponent implements OnInit, OnChanges {

  @Input() studySettings: FormField[];

  settingsForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private _snackBar: MatSnackBar, public helperTextService: HelperTextService) { }

  ngOnInit() {
    this.settingsForm = this.formBuilder.group({});
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    for (const propName in changes) {
      if (propName !== 'studySettings') {
        continue;
      }

      const changedProp = changes[propName];
      if (false === changedProp.isFirstChange()) {
        this.settingsForm = this.formBuilder.group({});
      }
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched();
        (control.statusChanges as EventEmitter<any>).emit('TOUCHED');
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  onSubmit() {
    // TODO save settings to API
    if (this.settingsForm.valid) {
      console.log(this.settingsForm.value); // Log the form value
      this._snackBar.open('Settings successfully saved.', undefined, {
        duration: 2000,
        panelClass: ['snack-info']
      });
    } else {
      this.validateAllFormFields(this.settingsForm);
      this._snackBar.open('ALERT: Please address all highlighted fields.', undefined, {
        duration: 2000,
        panelClass: ['snack-error']
      });
    }
  }

  onShowHelperText(helperText: HelperText) {
    this.helperTextService.setHelperText(helperText);
  }
}
