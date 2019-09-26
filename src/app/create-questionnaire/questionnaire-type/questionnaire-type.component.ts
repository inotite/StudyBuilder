import {
   Component,
   EventEmitter,
   OnDestroy,
   OnInit,
   Output,
   forwardRef,
   Input
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { QuestionnaireDeviceTypeService } from '../../shared/services/questionnaire-device-type.service';
import { QuestionnaireTakerService } from '../../shared/services/questionnaire-taker.service';
import { QuestionnaireDeviceType } from '../../shared/models/questionnaire-device-type.model';
import { QuestionnaireTaker } from '../../shared/models/questionnaire-taker.model';
import { StudyTypes } from '../../shared/models/study-types.model';
import { MatSelectChange } from '@angular/material';
import { QuestionnaireDeviceTypes } from '../../shared/models/questionnaire-device-types.model';
import { QuestionnaireTypeMapItem } from '../../shared/models/questionnaire-type-map-item.model';
import { ConfigService } from '../../shared/services/config.service';
import { QuestionnaireTakerTypes } from '../../shared/models/questionnaire-taker-type-model';
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
   selector: 'app-questionnaire-type',
   templateUrl: './questionnaire-type.component.html',
   styleUrls: ['./questionnaire-type.component.scss'],
   providers: [
      {
         provide: NG_VALUE_ACCESSOR,
         useExisting: forwardRef(() => QuestionnaireTypeComponent),
         multi: true
      },
      {
         provide: NG_VALIDATORS,
         useExisting: forwardRef(() => QuestionnaireTypeComponent),
         multi: true
      }
   ]
})
export class QuestionnaireTypeComponent
   implements OnInit, OnDestroy, ControlValueAccessor, Validator {
   @Input() questionnaire: Questionnaire;

   private unsubscribe = new Subject<void>();
   private questionnaireDeviceTypes: QuestionnaireDeviceType[];
   private questionnaireTakers: QuestionnaireTaker[];
   private isECOAStudyType = false;

   @Output() deviceType = new EventEmitter<QuestionnaireDeviceTypes>();

   public questionnaireTypeForm: FormGroup = new FormGroup({
      deviceType: new FormControl('', [Validators.required]),
      questionnaireTaker: new FormControl({ value: '', disabled: true }),
      isTraining: new FormControl({ disabled: true })
   });

   public selectedMapping = {
      questionnaireTaker: {},
      deviceType: {},
      isTraining: false
   } as QuestionnaireTypeMapItem;
   public filteredQuestionnaireDeviceTypes: QuestionnaireDeviceType[];
   public eligbleQuestionnaireTakers: QuestionnaireTaker[];

   public isIrtStudyType = false;
   public isIrtDeviceType = false;
   public showTraining =
      this.selectedMapping !== undefined && this.selectedMapping.questionnaireTaker &&
      this.selectedMapping.deviceType &&
      this.selectedMapping.questionnaireTaker.canDoTraining &&
      this.selectedMapping.deviceType.canDoTraining;

   constructor(
      private readonly questionnaireTakerService: QuestionnaireTakerService,
      private readonly questionnaireDeviceTypeService: QuestionnaireDeviceTypeService,
      private readonly configService: ConfigService
   ) {}

   ngOnInit() {
      this.questionnaireDeviceTypeService
         .getQuestionnaireDeviceTypes()
         .pipe(takeUntil(this.unsubscribe))
         .subscribe(
            (data: QuestionnaireDeviceType[]) => {
               this.questionnaireDeviceTypes = data;
               this.filteredQuestionnaireDeviceTypes = data;
               this.setSelectedValues();
            },
            () => (this.questionnaireDeviceTypes = [])
         );

      this.questionnaireTakerService
         .getTakers()
         .pipe(takeUntil(this.unsubscribe))
         .subscribe(
            (data: QuestionnaireTaker[]) => (this.questionnaireTakers = data),
            () => (this.questionnaireTakers = [])
         );

      this.configService
         .getStudyType()
         .pipe(takeUntil(this.unsubscribe))
         .subscribe((type: StudyTypes) => {
            switch (type) {
               case StudyTypes.eCOA: {
                  this.isECOAStudyType = true;
                  this.isIrtStudyType = false;
                  break;
               }
               case StudyTypes.IRT: {
                  this.isIrtStudyType = true;
                  this.isECOAStudyType = false;
                  break;
               }
               case StudyTypes.Unified: {
                  this.isIrtStudyType = false;
                  this.isECOAStudyType = false;
                  break;
               }
            }
            this.setSelectedValues();
         });
   }

   private setSelectedValues(): void {
      if (this.questionnaireDeviceTypes) {
         if (this.isIrtStudyType) {
            this.filteredQuestionnaireDeviceTypes = this.questionnaireDeviceTypes.filter(
               x =>
                  x.id.toUpperCase() ===
                  QuestionnaireDeviceTypes.Irt.toUpperCase()
            );
            this.setDeviceType(
               this.questionnaireDeviceTypes.filter(
                  dt =>
                     dt.id.toUpperCase() ===
                     QuestionnaireDeviceTypes.Irt.toUpperCase()
               )[0]
            );
            this.showIrtOnly();
         } else if (this.isECOAStudyType) {
            this.filteredQuestionnaireDeviceTypes = this.questionnaireDeviceTypes.filter(
               x =>
                  x.id.toUpperCase() !==
                  QuestionnaireDeviceTypes.Irt.toUpperCase()
            );
         } else {
            this.filteredQuestionnaireDeviceTypes = this.questionnaireDeviceTypes;
         }
      }
   }

   public deviceTypeChanged(select: MatSelectChange) {
      const dt = this.questionnaireDeviceTypes.filter(
         t => t.id === select.value
      )[0];

      if (dt.id.toUpperCase() === QuestionnaireDeviceTypes.Irt.toUpperCase()) {
         this.showIrtOnly();
      } else {
         this.eligbleQuestionnaireTakers =
            dt.id.toUpperCase() ===
            QuestionnaireDeviceTypes.Handheld.toUpperCase()
               ? this.questionnaireTakers.filter(
                    t =>
                       t.id.toUpperCase() !==
                       QuestionnaireTakerTypes.Clinician.toUpperCase()
                 )
               : this.questionnaireTakers;
         this.showECOAOnly();
      }

      switch (dt.id.toUpperCase()) {
         case QuestionnaireDeviceTypes.Irt.toUpperCase(): {
            this.showIrtOnly();
            break;
         }
         case QuestionnaireDeviceTypes.Handheld.toUpperCase(): {
            this.eligbleQuestionnaireTakers = this.questionnaireTakers.filter(
               t =>
                  t.id.toUpperCase() !==
                  QuestionnaireTakerTypes.Clinician.toUpperCase()
            );
            break;
         }
         case QuestionnaireDeviceTypes.Tablet.toUpperCase(): {
            this.eligbleQuestionnaireTakers = this.questionnaireTakers.filter(
               t =>
                  t.id.toUpperCase() !==
                  QuestionnaireTakerTypes.SubjectAndOrCareGiver.toUpperCase()
            );
         }
      }
      this.setDeviceType(dt);
   }

   private setDeviceType(deviceType: QuestionnaireDeviceType) {
      this.selectedMapping.deviceType = deviceType;
      this.deviceType.emit(deviceType.id as QuestionnaireDeviceTypes);
   }

   public takerChanged(select: MatSelectChange) {
      this.selectedMapping.questionnaireTaker = this.eligbleQuestionnaireTakers.filter(
         t => t.id === select.value
      )[0];
      this.showHideTraining();
   }

   private showHideTraining(): void {
      this.showTraining = this.selectedMapping && this.selectedMapping.questionnaireTaker &&
         this.selectedMapping.questionnaireTaker.canDoTraining && this.selectedMapping.deviceType &&
         this.selectedMapping.deviceType.canDoTraining;

      const qIsTraining = this.questionnaireTypeForm.get('isTraining');

      if (this.showTraining) {
         qIsTraining.enable();
      } else {
         qIsTraining.disable();
      }
      qIsTraining.setValue(undefined);
   }

   private showIrtOnly(): void {
      this.isIrtDeviceType = true;

      this.showHideQuestionnaireTaker(false);

      this.showHideTraining();
   }

   private showHideQuestionnaireTaker(show: boolean): void {
      if (show) {
         const qTaker = this.questionnaireTypeForm.get('questionnaireTaker');
         qTaker.enable();
         qTaker.setValue('');
         qTaker.setValidators(Validators.required);
         qTaker.updateValueAndValidity();
      } else {
         const qTaker = this.questionnaireTypeForm.get('questionnaireTaker');
         qTaker.disable();
         qTaker.clearValidators();
         qTaker.updateValueAndValidity();
      }
   }

   private showECOAOnly(): void {
      this.selectedMapping.questionnaireTaker = {} as QuestionnaireTaker;

      this.showHideQuestionnaireTaker(true);

      this.isIrtDeviceType = false;
      this.showHideTraining();
   }

   ngOnDestroy() {
      this.unsubscribe.next();
      this.unsubscribe.complete();
   }

   public onTouched: () => void = () => {};

   writeValue(val: any): void {
      val && this.questionnaireTypeForm.setValue(val, { emitEvent: false });
   }
   registerOnChange(fn: any): void {
      this.questionnaireTypeForm.valueChanges.subscribe(fn);
   }
   registerOnTouched(fn: any): void {
      this.onTouched = fn;
   }
   setDisabledState?(isDisabled: boolean): void {
      isDisabled
         ? this.questionnaireTypeForm.disable()
         : this.questionnaireTypeForm.enable();
   }

   validate(c: AbstractControl): ValidationErrors | null {
      return this.questionnaireTypeForm.valid
         ? null
         : {
              invalidForm: {
                 valid: false,
                 message: 'questionnaireTypeForm fields are invalid'
              }
           };
   }

   setControlsAsTouched() {
      this.setAsTouched(this.questionnaireTypeForm);
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
      this.clearFormControls(this.questionnaireTypeForm);
   }

   clearFormControls(group: FormGroup | FormArray) {
      group.markAsUntouched();
      group.reset();
   }
}
