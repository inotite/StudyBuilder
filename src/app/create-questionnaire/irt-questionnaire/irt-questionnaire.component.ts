import { SubmitActionComponent } from './../submit-action/submit-action.component';
import {
   Component,
   OnInit,
   OnDestroy,
   forwardRef,
   Input,
   ViewChild
} from '@angular/core';
import { EmailContentService } from '../../shared/services/emailcontent.service';
import { EmailContentItem } from '../../shared/models/email-content-item.model';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import {
   ControlValueAccessor,
   FormControl,
   NG_VALUE_ACCESSOR,
   NG_VALIDATORS,
   FormGroup,
   Validator,
   AbstractControl,
   ValidationErrors,
   FormArray
} from '@angular/forms';
import { Questionnaire } from 'src/app/shared/models/questionnaire.model';
import {FormUtilityService} from '../../shared/services/form-utility.service';

@Component({
   selector: 'app-irt-questionnaire',
   templateUrl: './irt-questionnaire.component.html',
   styleUrls: ['./irt-questionnaire.component.scss'],
   providers: [
      {
         provide: NG_VALUE_ACCESSOR,
         useExisting: forwardRef(() => IrtQuestionnaireComponent),
         multi: true
      },
      {
         provide: NG_VALIDATORS,
         useExisting: forwardRef(() => IrtQuestionnaireComponent),
         multi: true
      }
   ]
})
export class IrtQuestionnaireComponent
   implements OnInit, OnDestroy, ControlValueAccessor, Validator {
   @Input() questionnaire: Questionnaire;
   @ViewChild('submitAction')
   submitAction: SubmitActionComponent;
   emailContentList: EmailContentItem[];
   private unsubscribe = new Subject<void>();

   public irtQuestionnaireForm: FormGroup = new FormGroup({
      emailContentList: new FormControl(['']),
      submitAction: new FormControl()
   });

   constructor(private emailContentService: EmailContentService, private formUtilityService: FormUtilityService) {}

   ngOnInit() {
      this.emailContentService
         .getEmailContents()
         .pipe(takeUntil(this.unsubscribe))
         .subscribe(
            (data: EmailContentItem[]) => (this.emailContentList = data)
         );
   }

   ngOnDestroy() {
      this.unsubscribe.next();
      this.unsubscribe.complete();
   }

   public onTouched: () => void = () => {};

   writeValue(val: any): void {
      val && this.irtQuestionnaireForm.setValue(val, { emitEvent: false });
   }
   registerOnChange(fn: any): void {
      this.irtQuestionnaireForm.valueChanges.subscribe(fn);
   }
   registerOnTouched(fn: any): void {
      this.onTouched = fn;
   }
   setDisabledState?(isDisabled: boolean): void {
      isDisabled
         ? this.irtQuestionnaireForm.disable()
         : this.irtQuestionnaireForm.enable();
   }

   validate(c: AbstractControl): ValidationErrors | null {
      return this.formUtilityService.validate(this.irtQuestionnaireForm, c, 'irtQuestionnaireForm fields are invalid');
   }
   setControlsAsTouched() {
      this.setAsTouched(this.irtQuestionnaireForm);
      this.submitAction.setControlsAsTouched();
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
      this.clearFormControls(this.irtQuestionnaireForm);
      this.submitAction.clearForm();
   }

   clearFormControls(group: FormGroup | FormArray) {
      group.markAsUntouched();
      group.reset();
   }
}
