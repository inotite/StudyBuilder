import {Component, Input, OnDestroy, forwardRef, OnInit, ElementRef, ViewChild} from '@angular/core';
import {Questionnaire} from '../../shared/models/questionnaire.model';
import {BusinessRuleService} from '../../shared/services/businessrules.service';
import {BehaviorSubject, Subject} from 'rxjs';
import {BusinessRuleItem} from '../../shared/models/business-rule-item.model';
import {takeUntil} from 'rxjs/operators';
import {QuestionnaireDeviceTypes} from '../../shared/models/questionnaire-device-types.model';
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
   ReactiveFormsModule,
   FormArray
} from '@angular/forms';
import {isNull, isNullOrUndefined} from 'util';
import {FormUtilityService} from '../../shared/services/form-utility.service';

@Component({
   selector: 'app-ecoa-questionnaire',
   templateUrl: './ecoa-questionnaire.component.html',
   styleUrls: ['./ecoa-questionnaire.component.scss'],
   providers: [
      {
         provide: NG_VALUE_ACCESSOR,
         useExisting: forwardRef(() => EcoaQuestionnaireComponent),
         multi: true
      },
      {
         provide: NG_VALIDATORS,
         useExisting: forwardRef(() => EcoaQuestionnaireComponent),
         multi: true
      }
   ]
})
export class EcoaQuestionnaireComponent implements OnInit, OnDestroy, ControlValueAccessor, Validator {
   @Input() questionnaire: Questionnaire;
   @Input() deviceType: BehaviorSubject<QuestionnaireDeviceTypes>;

   private unsubscribe = new Subject<void>();
   public businessRules: BusinessRuleItem[];
   public isHandheld = false;
   public isTablet = false;
   public isIrt = false;
   public disableCompletionOfMissedEntries = true;

   public get hasQuestionnaireType(): boolean {
      return this.questionnaire !== undefined && this.questionnaire.questionnaireTypeId !== undefined;
   }

   constructor(private businessRuleService: BusinessRuleService,
               private formUtilityService: FormUtilityService) {}

   public isDisabled: boolean;

   public ecoaQuestionnaireForm: FormGroup = new FormGroup({
      visibilityRule: new FormControl(''),
      visibleBusinessRuleResult: new FormControl({
         value: null,
         disabled: true
      }),
      enabledBusinessRule: new FormControl(''),
      enabledBusinessRuleResult: new FormControl({
         value: null,
         disabled: true
      }),
      previousDaysEntry: new FormControl('', [Validators.min(10)]),
      promptIncompletePagesOnSave: new FormControl({
         value: '',
         disabled: true
      }),
      allowEdit: new FormControl(''),
      previousDaysEdit: new FormControl(
         {
            value: '',
            disabled: true
         },
         [Validators.min(0)]
      ),
      displaySummaryScore: new FormControl('')
   });

   @ViewChild('previousDaysEdit')
   previousDaysEdit: ElementRef;
   focusPreviousDaysEdit(): void {
      this.previousDaysEdit.nativeElement.focus();
   }

   ngOnInit() {
      this.businessRuleService
         .getBusinessRules()
         .pipe(takeUntil(this.unsubscribe))
         .subscribe((data: BusinessRuleItem[]) => (this.businessRules = data), () => (this.businessRules = []));

      this.deviceType.pipe(takeUntil(this.unsubscribe)).subscribe((data: QuestionnaireDeviceTypes) => {
         this.setDeviceType(data);
      });
      this.setIsHandheld(this.deviceType.getValue());

      this.formControlValueChanged(this.ecoaQuestionnaireForm);
   }

   formControlValueChanged(form: FormGroup) {
      this.formUtilityService.subscribeEnabledStatusToValueChange(form, 'visibilityRule', 'visibleBusinessRuleResult');
      this.formUtilityService.subscribeEnabledStatusToValueChange(form, 'enabledBusinessRule', 'enabledBusinessRuleResult');
      this.formUtilityService.subscribeEnabledStatusToValueChange(form, 'previousDaysEntry', 'promptIncompletePagesOnSave');
      this.formUtilityService.subscribeEnabledStatusToValueChange(form, 'allowEdit', 'previousDaysEdit');
   }

   private setIsHandheld(deviceType: QuestionnaireDeviceTypes): void {
      this.isHandheld = deviceType.toUpperCase() === QuestionnaireDeviceTypes.Handheld.toUpperCase();
   }

   private setDeviceType(deviceType: QuestionnaireDeviceTypes): void {
      this.isIrt = false;
      this.isHandheld = false;
      this.isTablet = false;

      switch (deviceType.toUpperCase()) {
         case QuestionnaireDeviceTypes.Irt.toUpperCase(): {
            this.isIrt = true;
            break;
         }
         case QuestionnaireDeviceTypes.Handheld.toUpperCase(): {
            this.isHandheld = true;
            break;
         }
         case QuestionnaireDeviceTypes.Tablet.toUpperCase(): {
            this.isTablet = true;
            break;
         }
      }
   }

   ngOnDestroy(): void {
      this.unsubscribe.next();
      this.unsubscribe.complete();
   }

   public onQuestionnaireTypeSet(questionnaireTypeId: number): void {
      this.questionnaire.questionnaireTypeId = questionnaireTypeId;
   }

   public onTouched: () => void = () => {};

   writeValue(val: any): void {
      val && this.ecoaQuestionnaireForm.setValue(val, {emitEvent: false});
   }
   registerOnChange(fn: any): void {
      this.ecoaQuestionnaireForm.valueChanges.subscribe(fn);
   }
   registerOnTouched(fn: any): void {
      this.onTouched = fn;
   }
   setDisabledState?(isDisabled: boolean): void {
      isDisabled ? this.ecoaQuestionnaireForm.disable() : this.ecoaQuestionnaireForm.enable();
   }

   validate(c: AbstractControl): ValidationErrors | null {
      return this.ecoaQuestionnaireForm.valid
         ? null
         : {
              invalidForm: {
                 valid: false,
                 message: 'ecoaQuestionnaireForm fields are invalid'
              }
           };
   }

   setControlsAsTouched() {
      this.formUtilityService.setAsTouched(this.ecoaQuestionnaireForm);
   }

   displayFieldCss(field: string) {
      return {
         'has-error': this.formUtilityService.isFieldValid(this.ecoaQuestionnaireForm, field)
      };
   }

   positiveInteger(event, minNumber: number, control: AbstractControl): boolean {
      const charCode = event.which ? event.which : event.keyCode;
      const keyValue = event.key ? event.key : event.key;
      let result: any;
      const controlValue = isNullOrUndefined(control.value) ? keyValue : Number(control.value + keyValue);

      if ((charCode > 31 && (charCode < 48 || charCode > 57)) || isNaN(controlValue) || controlValue < minNumber) {
         result = false;
      } else {
         result = true;
      }

      return result;
   }

   clearForm() {
      this.formUtilityService.clearFormControls(this.ecoaQuestionnaireForm);
   }
}
