import {Component, OnInit, forwardRef, Input} from '@angular/core';
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
   MaxLengthValidator,
   FormArray
} from '@angular/forms';
import {Questionnaire} from 'src/app/shared/models/questionnaire.model';
import {QuestionnairesService} from 'src/app/shared/services/questionnaires.service';
import {switchMap, filter, takeUntil} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';

@Component({
   selector: 'app-questionnaire-name',
   templateUrl: './questionnaire-name.component.html',
   styleUrls: ['./questionnaire-name.component.scss'],
   providers: [
      {
         provide: NG_VALUE_ACCESSOR,
         useExisting: forwardRef(() => QuestionnaireNameComponent),
         multi: true
      },
      {
         provide: NG_VALIDATORS,
         useExisting: forwardRef(() => QuestionnaireNameComponent),
         multi: true
      }
   ]
})
export class QuestionnaireNameComponent implements OnInit, ControlValueAccessor, Validator {
   @Input() questionnaire: Questionnaire;

   public questionnaireNameForm: FormGroup = new FormGroup({
      internalQuestionnaireName: new FormControl('', {
         validators: [Validators.required, this.checkInternalName.bind(this)],
         updateOn: 'blur'
      }),
      displayQuestionnaireName: new FormControl('', [Validators.required]),
      blindedCanViewAnswers: new FormControl('')
   });

   private questionnaireList: Questionnaire[];

   constructor(private questionnaireService: QuestionnairesService) {}

   ngOnInit() {
      this.questionnaireService.currentQuestionnaireList.subscribe(data => (this.questionnaireList = data));
   }

   private setFormGroupTouched(formGroup: FormGroup) {
      Object.keys(formGroup.controls).forEach(field => {
         const control = formGroup.get(field);
         control.markAsTouched({onlySelf: true});
      });
   }

   public onTouched: () => void = () => {};

   writeValue(val: any): void {
      val && this.questionnaireNameForm.setValue(val, {emitEvent: false});
   }

   registerOnChange(fn: any): void {
      this.questionnaireNameForm.valueChanges.subscribe(fn);
   }

   registerOnTouched(fn: any): void {
      this.onTouched = fn;
   }

   setDisabledState?(isDisabled: boolean): void {
      isDisabled ? this.questionnaireNameForm.disable() : this.questionnaireNameForm.enable();
   }

   validate(c: AbstractControl): ValidationErrors | null {
      return this.questionnaireNameForm.valid
         ? null
         : {
              invalidForm: {
                 valid: false,
                 message: 'questionnaireNameForm fields are invalid'
              }
           };
   }

   setControlsAsTouched() {
      this.setAsTouched(this.questionnaireNameForm);
   }

   setAsTouched(group: FormGroup | FormArray) {
      group.markAsTouched();
      for (const i in group.controls) {
         if (group.controls[i] instanceof FormControl) {
            group.get(i).markAsTouched({onlySelf: true});
            group.get(i).updateValueAndValidity();
         } else {
            this.setAsTouched(group.controls[i]);
         }
      }
   }

   clearForm() {
      this.clearFormControls(this.questionnaireNameForm);
   }

   clearFormControls(group: FormGroup | FormArray) {
      group.markAsUntouched();
      group.reset();
   }

   isInternalNameUnique(control: FormControl): boolean {
      const valid = this.checkInternalName(control);
      return valid === null ? true : false;
   }

   checkInternalName(control: AbstractControl): {[key: string]: boolean} | null {
      const value = control.value;
      if (this.questionnaireList === undefined) {
         this.questionnaireList = [];
      }

      const result = this.questionnaireList.filter(elem => {
         return elem.internalName === value;
      });

      return result.length > 0 ? {value: true} : null;
   }
}
