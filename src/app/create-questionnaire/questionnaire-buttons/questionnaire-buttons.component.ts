import { Component, OnInit, forwardRef } from '@angular/core';
import {
   ControlValueAccessor,
   FormControl,
   NG_VALUE_ACCESSOR,
   NG_VALIDATORS,
   FormGroup,
   Validator,
   AbstractControl,
   ValidationErrors
} from '@angular/forms';
import { Router } from '@angular/router';
import { QuestionnairesService } from '../../shared/services/questionnaires.service';

@Component({
   selector: 'app-questionnaire-buttons',
   templateUrl: './questionnaire-buttons.component.html',
   styleUrls: ['./questionnaire-buttons.component.scss'],
   providers: [
      {
         provide: NG_VALUE_ACCESSOR,
         useExisting: forwardRef(() => QuestionnaireButtonsComponent),
         multi: true
      },
      {
         provide: NG_VALIDATORS,
         useExisting: forwardRef(() => QuestionnaireButtonsComponent),
         multi: true
      }
   ]
})
export class QuestionnaireButtonsComponent
   implements OnInit, ControlValueAccessor, Validator {
   constructor(
      private router: Router,
      private questionnairesService: QuestionnairesService
   ) {}

   public questionnaireButtonsForm: FormGroup = new FormGroup({
      cancelQuestionnaire: new FormControl(''),
      saveQuestionnaire: new FormControl('')
   });

   hideInvalidFormError = true;

   ngOnInit() {}

   public onTouched: () => void = () => {};

   writeValue(val: any): void {
      val && this.questionnaireButtonsForm.setValue(val, { emitEvent: false });
   }
   registerOnChange(fn: any): void {
      this.questionnaireButtonsForm.valueChanges.subscribe(fn);
   }
   registerOnTouched(fn: any): void {
      this.onTouched = fn;
   }
   setDisabledState?(isDisabled: boolean): void {
      isDisabled
         ? this.questionnaireButtonsForm.disable()
         : this.questionnaireButtonsForm.enable();
   }

   validate(c: AbstractControl): ValidationErrors | null {
      return this.questionnaireButtonsForm.valid
         ? null
         : {
              invalidForm: {
                 valid: false,
                 message: 'questionnaireButtonsForm fields are invalid'
              }
           };
   }

   hideInvalidFormMessage(formValidStatus: boolean) {
      this.hideInvalidFormError = formValidStatus;
   }

   onCancel(): void {
      this.router.navigate(['Questionnaires']);
      this.questionnairesService.cancelQuestionnaire();
   }
}
