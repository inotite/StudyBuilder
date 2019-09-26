import {QuestionnaireButtonsComponent} from './../questionnaire-buttons/questionnaire-buttons.component';
import {UnifiedQuestionnaireComponent} from './../unified-questionnaire/unified-questionnaire.component';
import {QuestionnaireNameComponent} from './../questionnaire-name/questionnaire-name.component';
import {QuestionnaireTypeComponent} from './../questionnaire-type/questionnaire-type.component';
import {questionnaireDeviceTypeUrl} from './../../shared/helpers/url.constant';
import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Questionnaire} from 'src/app/shared/models/questionnaire.model';
import {Subject, BehaviorSubject} from 'rxjs';
import {StudyTypes} from '../../shared/models/study-types.model';
import {ConfigService} from '../../shared/services/config.service';
import {QuestionnaireDeviceTypes} from '../../shared/models/questionnaire-device-types.model';
import {takeUntil} from 'rxjs/operators';
import {FormGroup, FormControl, FormArray} from '@angular/forms';
import {EcoaQuestionnaireComponent} from '../ecoa-questionnaire/ecoa-questionnaire.component';
import {IrtQuestionnaireComponent} from '../irt-questionnaire/irt-questionnaire.component';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';

@Component({
   selector: 'app-questionnaire-form',
   templateUrl: './questionnaire-form.component.html',
   styleUrls: ['./questionnaire-form.component.scss']
})
export class QuestionnaireFormComponent implements OnInit, OnDestroy {
   @ViewChild('eCOA') eCOA: EcoaQuestionnaireComponent;
   @ViewChild('questionnaireType')
   questionnaireType: QuestionnaireTypeComponent;
   @ViewChild('unifiedQuestionnaire')
   unifiedQuestionnaire: UnifiedQuestionnaireComponent;
   @ViewChild('irtQuestionnaire')
   irtQuestionnaire: IrtQuestionnaireComponent;
   @ViewChild('questionnaireButtons')
   questionnaireButtons: QuestionnaireButtonsComponent;

   private unsubscribe = new Subject<void>();

   public questionnaireForm: FormGroup = new FormGroup({
      questionnaireType: new FormControl(),
      unifiedQuestionnaire: new FormControl(),
      ecoaQuestionnaire: new FormControl(),
      irtQuestionnaire: new FormControl(),
      questionnaireButtons: new FormControl()
   });

   studyType: StudyTypes;

   questionnaire = {questionnaireTypeId: 2} as Questionnaire;
   showIrt = false;
   showECOA = false;
   showUnified = false;
   questionnaireDeviceType: BehaviorSubject<QuestionnaireDeviceTypes> = new BehaviorSubject<QuestionnaireDeviceTypes>(
      QuestionnaireDeviceTypes.Irt
   );

   wasSubmitted = false;

   constructor(private configService: ConfigService) {}

   ngOnInit() {
      this.configService
         .getStudyType()
         .pipe(takeUntil(this.unsubscribe))
         .subscribe((type: StudyTypes) => {
            this.studyType = type;
         });

      this.onChanges();
   }

   ngOnDestroy(): void {
      this.unsubscribe.next();
      this.unsubscribe.complete();
   }

   onChanges(): void {
      this.questionnaireForm.valueChanges.subscribe(val => {
         if (this.wasSubmitted) {
            this.hideFormValidationMessage(this.questionnaireForm.valid);
         }
      });
   }

   onDeviceTypeChange(deviceType: QuestionnaireDeviceTypes) {
      this.showUnified = true;

      if (this.unifiedQuestionnaire !== undefined) {
         this.unifiedQuestionnaire.clearForm();
      }
      this.questionnaireDeviceType.next(deviceType);
      if (deviceType.toUpperCase() === QuestionnaireDeviceTypes.Irt.toUpperCase()) {
         this.showECOA = false;
         this.showIrt = true;
         if (this.irtQuestionnaire !== undefined) {
            this.irtQuestionnaire.clearForm();
         }
      } else {
         this.showECOA = true;
         this.showIrt = false;
         if (this.eCOA !== undefined) {
            this.eCOA.clearForm();
         }
      }

      this.hideFormValidationMessage(true);
   }

   setAsTouched(group: FormGroup | FormArray) {
      group.markAsTouched();
      for (const i in group.controls) {
         if (group.controls[i] instanceof FormControl) {
            group.controls[i].markAsTouched();
         } else {
            this.setAsTouched(group.controls[i]);
         }
      }
   }

   setChildrenControlsAsTouched() {
      this.questionnaireType.setControlsAsTouched();
      if (this.unifiedQuestionnaire !== undefined) {
         this.unifiedQuestionnaire.setControlsAsTouched();
      }
      if (this.showECOA) {
         this.eCOA.setControlsAsTouched();
      }
      if (this.showIrt) {
         this.unifiedQuestionnaire.setControlsAsTouched();
         this.irtQuestionnaire.setControlsAsTouched();
      }
   }

   hideFormValidationMessage(isValidForm: boolean) {
      this.questionnaireButtons.hideInvalidFormMessage(isValidForm);
   }

   public onSubmit() {
      this.setChildrenControlsAsTouched();
      this.hideFormValidationMessage(this.questionnaireForm.valid);
      this.wasSubmitted = true;
   }
}
