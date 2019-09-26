import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
   CUSTOM_ELEMENTS_SCHEMA,
   NO_ERRORS_SCHEMA,
   forwardRef
} from '@angular/core';
import { QuestionnaireFormComponent } from './questionnaire-form.component';
import { UnifiedQuestionnaireComponent } from '../unified-questionnaire/unified-questionnaire.component';

import { TestHelper } from 'src/app/shared/helpers/test.helper';
import { ConfigService } from '../../shared/services/config.service';
import { StudyTypes } from '../../shared/models/study-types.model';
import { of } from 'rxjs';
import { QuestionnaireDeviceTypes } from '../../shared/models/questionnaire-device-types.model';
import { QuestionnaireButtonsComponent } from '../questionnaire-buttons/questionnaire-buttons.component';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { QuestionnairesService } from 'src/app/shared/services/questionnaires.service';
import SpyObj = jasmine.SpyObj;
import { Subject } from 'rxjs';
const anyObservable = new Subject<any>();

describe('QuestionnaireFormComponent', () => {
   let component: QuestionnaireFormComponent;
   let fixture: ComponentFixture<QuestionnaireFormComponent>;
   let configService: jasmine.SpyObj<ConfigService>;
   let router: Router;
   let questionnairesServiceSpy: SpyObj<QuestionnairesService>;

   beforeEach(async(() => {
      const configServiceSpy = jasmine.createSpyObj('ConfigService', [
         'getStudyType'
      ]);
      configServiceSpy.getStudyType.and.returnValue(of(StudyTypes.Unified));

      questionnairesServiceSpy = jasmine.createSpyObj('QuestionnairesService', [
         'cancelQuestionnaireSubscription', 'cancelQuestionnaire'
      ]);
      questionnairesServiceSpy.cancelQuestionnaireSubscription.and.returnValue(
         anyObservable
      );

      TestBed.configureTestingModule({
         declarations: [
            QuestionnaireFormComponent,
            UnifiedQuestionnaireComponent,
            QuestionnaireButtonsComponent
         ],
         schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
         providers: [
            { provide: ConfigService, useValue: configServiceSpy },
            {
               provide: QuestionnairesService,
               useValue: questionnairesServiceSpy
            }
         ],
         imports: [RouterTestingModule.withRoutes([])]
      }).compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(QuestionnaireFormComponent);
      router = TestBed.get(Router);
      component = fixture.componentInstance;
      component.ngOnInit();
      configService = TestBed.get(ConfigService);
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });

   it('should call config service on create', () => {
      expect(configService.getStudyType).toHaveBeenCalled();
   });

   it('should include a questionnaire type component', () => {
      const questionnaireTypeComponent = TestHelper.getElementByCss(
         fixture,
         'app-questionnaire-type'
      );
      expect(questionnaireTypeComponent).toBeTruthy();
   });

   it('should set showIRT to true when device type is changed to IRT', () => {
      spyOn(component.questionnaireButtons, 'hideInvalidFormMessage');
      component.onDeviceTypeChange(QuestionnaireDeviceTypes.Irt);
      expect(component.showIrt).toBeTruthy();
   });

   it('should set showECOA to true when device type is changed to Handheld', () => {
      spyOn(component.questionnaireButtons, 'hideInvalidFormMessage');
      component.onDeviceTypeChange(QuestionnaireDeviceTypes.Handheld);
      expect(component.showECOA).toBeTruthy();
   });

   it('should set showECOA to true when device type is changed to Handheld', () => {
      spyOn(component.questionnaireButtons, 'hideInvalidFormMessage');
      component.onDeviceTypeChange(QuestionnaireDeviceTypes.Tablet);
      expect(component.showECOA).toBeTruthy();
   });
});
