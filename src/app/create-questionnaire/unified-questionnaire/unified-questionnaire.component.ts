import { QuestionnaireNameComponent } from './../questionnaire-name/questionnaire-name.component';
import { Component, OnInit, forwardRef, Input, ViewChild } from '@angular/core';

import {
   ControlValueAccessor,
   FormControl,
   NG_VALUE_ACCESSOR,
   NG_VALIDATORS,
   FormGroup,
   Validator,
   Validators,
   AbstractControl,
   ValidationErrors,
   FormArray
} from '@angular/forms';
import { Questionnaire } from 'src/app/shared/models/questionnaire.model';

@Component({
   selector: 'app-unified-questionnaire',
   templateUrl: './unified-questionnaire.component.html',
   styleUrls: ['./unified-questionnaire.component.scss'],
   providers: [
      {
         provide: NG_VALUE_ACCESSOR,
         useExisting: forwardRef(() => UnifiedQuestionnaireComponent),
         multi: true
      },
      {
         provide: NG_VALIDATORS,
         useExisting: forwardRef(() => UnifiedQuestionnaireComponent),
         multi: true
      }
   ]
})
export class UnifiedQuestionnaireComponent
   implements OnInit, ControlValueAccessor, Validator {
   @Input() questionnaire: Questionnaire;

   @ViewChild('questionnaireName')
   questionnaireName: QuestionnaireNameComponent;

   public unifiedQuestionnaireForm: FormGroup = new FormGroup({
      questionnaireName: new FormControl()
   });

   constructor() {}

   ngOnInit() {}

   public onTouched: () => void = () => {};

   writeValue(val: any): void {
      val && this.unifiedQuestionnaireForm.setValue(val, { emitEvent: false });
   }
   registerOnChange(fn: any): void {
      this.unifiedQuestionnaireForm.valueChanges.subscribe(fn);
   }
   registerOnTouched(fn: any): void {
      this.onTouched = fn;
   }
   setDisabledState?(isDisabled: boolean): void {
      isDisabled
         ? this.unifiedQuestionnaireForm.disable()
         : this.unifiedQuestionnaireForm.enable();
   }

   validate(c: AbstractControl): ValidationErrors | null {
      return this.unifiedQuestionnaireForm.valid
         ? null
         : {
              invalidForm: {
                 valid: false,
                 message: 'unifiedQuestionnaire fields are invalid'
              }
           };
   }

   setControlsAsTouched() {
      this.setAsTouched(this.unifiedQuestionnaireForm);
      this.questionnaireName.setControlsAsTouched();
   }

   setAsTouched(group: FormGroup | FormArray) {
      group.markAsTouched();
      for (const i in group.controls) {
         if (group.controls[i] instanceof FormControl) {
            group.get(i).markAsTouched({ onlySelf: true });
            group.get(i).updateValueAndValidity();
         } else {
            this.setAsTouched(group.controls[i]);
         }
      }
   }

   clearForm() {
      this.clearFormControls(this.unifiedQuestionnaireForm);
      this.questionnaireName.clearForm();
   }

   clearFormControls(group: FormGroup | FormArray) {
      group.markAsUntouched();
      group.reset();
   }
}
