import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EcoaQuestionnaireComponent } from './ecoa-questionnaire.component';
import { TestHelper } from '../../shared/helpers/test.helper';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
   FormsModule,
   ReactiveFormsModule,
   FormGroup,
   FormControl,
   Validators
} from '@angular/forms';
import { Questionnaire } from '../../shared/models/questionnaire.model';
import { BusinessRuleService } from '../../shared/services/businessrules.service';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QuestionnaireDeviceTypes } from '../../shared/models/questionnaire-device-types.model';
import SpyObj = jasmine.SpyObj;
import { YPrimeArtifactsModule } from 'src/app/yprime-artifacts/yprime-artifacts.module';
import { MaterialUIModule } from 'src/app/yprime-artifacts/material-ui/material-ui.module';

describe('EcoaQuestionnaireComponent', () => {
   let component: EcoaQuestionnaireComponent;
   let fixture: ComponentFixture<EcoaQuestionnaireComponent>;
   let businessRuleServiceSpy: SpyObj<BusinessRuleService>;
   const businessRulesList = [
      { name: 'Rule1', description: '', inclusive: false },
      { name: 'Rule2', description: '', inclusive: false }
   ];

   beforeEach(async(() => {
      businessRuleServiceSpy = jasmine.createSpyObj('BusinessRuleService', [
         'getBusinessRules'
      ]);

      const businessRulesObservable = of(businessRulesList);
      businessRuleServiceSpy.getBusinessRules.and.returnValues(
         businessRulesObservable
      );

      TestBed.configureTestingModule({
         declarations: [EcoaQuestionnaireComponent],
         schemas: [CUSTOM_ELEMENTS_SCHEMA],
         imports: [
            CommonModule,
            MaterialUIModule,
            YPrimeArtifactsModule,
            FormsModule,
            BrowserAnimationsModule,
            ReactiveFormsModule
         ],
         providers: [
            {
               provide: BusinessRuleService,
               useValue: businessRuleServiceSpy
            }
         ]
      }).compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(EcoaQuestionnaireComponent);
      component = fixture.componentInstance;

      component.deviceType = new BehaviorSubject<QuestionnaireDeviceTypes>(
         QuestionnaireDeviceTypes.Irt
      );
      component.questionnaire = {} as Questionnaire;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });

   it('Validations', () => {
      const form = component.ecoaQuestionnaireForm;

      fixture.detectChanges();

      expect(form.valid).toBeTruthy();
      expect(form.controls['visibilityRule'].valid).toBeTruthy();
   });

   it('should set the questionnaireTypeId on the questionnaire', () => {
      const questionnaireTypeId = 3;
      component.onQuestionnaireTypeSet(questionnaireTypeId);
      expect(component.questionnaire.questionnaireTypeId).toEqual(
         questionnaireTypeId
      );
   });

   it('should haveQuestionnaireType if questionnaire type Id is set', () => {
      const questionnaireTypeId = 3;
      component.onQuestionnaireTypeSet(questionnaireTypeId);
      expect(component.hasQuestionnaireType).toBeTruthy();
   });

   it('should not haveQuestionnaireType if questionnaire type Id is not set', () => {
      expect(component.hasQuestionnaireType).toBeFalsy();
   });

   it('should not display eCOA fields when no questionnaire type Id is set', () => {
      component.onQuestionnaireTypeSet(undefined);
      expect(TestHelper.getElementByCss(fixture, '#eCOAFields')).toBeFalsy();
   });

   it('should retrieve business rules from business rule service on ngInit', () => {
      expect(businessRuleServiceSpy.getBusinessRules.calls.count()).toEqual(1);
   });

   it('should have a questionnaire visible when dropdown', () => {
      component.questionnaire.questionnaireTypeId = 2;
      fixture.detectChanges();
      expect(
         TestHelper.getElementByCss(fixture, '#visibilityRule')
      ).toBeTruthy();
   });

   it('should have a questionnaire enabled when dropdown', () => {
      component.questionnaire.questionnaireTypeId = 3;
      fixture.detectChanges();
      expect(
         TestHelper.getElementByCss(fixture, '#enabledBusinessRule')
      ).toBeTruthy();
   });

   it('should set isHandheld to false when the device type is IRT', () => {
      component.deviceType.next(QuestionnaireDeviceTypes.Irt);
      fixture.detectChanges();
      expect(component.isHandheld).toBeFalsy();
   });

   it('should set isHandheld to false when the device type is Tablet', () => {
      component.deviceType.next(QuestionnaireDeviceTypes.Tablet);
      fixture.detectChanges();
      expect(component.isHandheld).toBeFalsy();
   });

   it('should set isHandheld to true when the device type is Handheld', () => {
      component.deviceType.next(QuestionnaireDeviceTypes.Handheld);
      fixture.detectChanges();
      expect(component.isHandheld).toBeTruthy();
   });
});
