import { QuestionnaireTakerTypes } from './../../shared/models/questionnaire-taker-type-model';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionnaireTypeComponent } from './questionnaire-type.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of, Subject } from 'rxjs';
import { By } from '@angular/platform-browser';
import { ConfigService } from '../../shared/services/config.service';
import { QuestionnaireTakerService } from '../../shared/services/questionnaire-taker.service';
import { QuestionnaireDeviceTypeService } from '../../shared/services/questionnaire-device-type.service';
import { StudyTypes } from '../../shared/models/study-types.model';
import { QuestionnaireDeviceTypes } from '../../shared/models/questionnaire-device-types.model';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

const takers = [
   {id: 'BC109726-B20B-472F-8A9A-EB3D02BEDE9A', type: 'Caregiver', canDoTraining: true},
   {id: '9555575C-6B75-423D-BAF0-C279E0D3DC74', type: 'Clinician', canDoTraining: false},
   {id: '0223FB2C-2F61-4DBE-804D-1969D691F177', type: 'Subject', canDoTraining: true},
   {id: '792CDA4A-8117-4A0A-A9C4-ABEE90B3BFC7', type: 'Subject and/or Caregiver', canDoTraining: true}
];

const deviceTypes = [
   {
      id: '1114B71E-F44F-43BA-B966-44BF3CF9D253',
      type: 'Handheld',
      canDoTraining: true
   },
   {
      id: 'AC2D9044-01C5-45F1-B439-A65AA92FD435',
      type: 'Tablet',
      canDoTraining: false
   },
   {
      id: '3BBABEB9-A34C-438C-8B1F-811BA6283549',
      type: 'IRT',
      canDoTraining: false
   }
];

describe('QuestionnaireTypeComponent', () => {
   const studyType = StudyTypes.Unified;
   let component: QuestionnaireTypeComponent;
   let fixture: ComponentFixture<QuestionnaireTypeComponent>;
   let questionnaireTakerService: jasmine.SpyObj<QuestionnaireTakerService>;
   let questionnaireDeviceTypeService: jasmine.SpyObj<
      QuestionnaireDeviceTypeService
   >;
   let configService: jasmine.SpyObj<ConfigService>;

   beforeEach(async(() => {
      const questionnaireTakerServiceSpy = jasmine.createSpyObj(
         'QuestionnaireTakerService',
         ['getTakers']
      );
      const questionnaireDeviceTypeServiceSpy = jasmine.createSpyObj(
         'QuestionnaireDeviceTypeService',
         ['getQuestionnaireDeviceTypes']
      );
      const configServiceSpy = jasmine.createSpyObj('ConfigService', [
         'getStudyType'
      ]);

      questionnaireTakerServiceSpy.getTakers.and.returnValues(of(takers));
      questionnaireDeviceTypeServiceSpy.getQuestionnaireDeviceTypes.and.returnValues(
         of(deviceTypes)
      );
      configServiceSpy.getStudyType.and.returnValue(of(studyType));

      TestBed.configureTestingModule({
         declarations: [QuestionnaireTypeComponent],
         schemas: [CUSTOM_ELEMENTS_SCHEMA],
         providers: [
            {
               provide: QuestionnaireTakerService,
               useValue: questionnaireTakerServiceSpy
            },
            {
               provide: QuestionnaireDeviceTypeService,
               useValue: questionnaireDeviceTypeServiceSpy
            },
            { provide: ConfigService, useValue: configServiceSpy }
         ],
         imports: [FormsModule, ReactiveFormsModule]
      })
         .compileComponents()
         .then(() => {
            fixture = TestBed.createComponent(QuestionnaireTypeComponent);
            component = fixture.componentInstance;
            questionnaireTakerService = TestBed.get(QuestionnaireTakerService);
            questionnaireDeviceTypeService = TestBed.get(
               QuestionnaireDeviceTypeService
            );
            configService = TestBed.get(ConfigService);
            fixture.detectChanges();
         });
   }));

   it('should create', () => {
      expect(component).toBeTruthy();
   });

   it('should call questionnaire taker service on create', () => {
      expect(questionnaireTakerService.getTakers.calls.count()).toEqual(1);
   });

   it('should call questionnaire device type service on create', () => {
      expect(
         questionnaireDeviceTypeService.getQuestionnaireDeviceTypes.calls.count()
      ).toBe(1);
   });

   it(' - The form is invalid when page loads', () => {
      const form = component.questionnaireTypeForm;
      fixture.detectChanges();

      expect(form.valid).toBeFalsy();
      expect(form.controls['deviceType'].valid).toBeFalsy();
   });

   it(' - The form is valid when required fields have input', () => {
      const form = component.questionnaireTypeForm;
      new Promise(resolve => {
         component.isIrtStudyType = false;
         const deviceTypeSelect = fixture.debugElement.query(
            By.css('#deviceType')
         );
         deviceTypeSelect.triggerEventHandler('selectionChange', {
            value: QuestionnaireDeviceTypes.Handheld
         });
         form.controls['deviceType'].setValue(
            QuestionnaireDeviceTypes.Handheld
         );
         form.controls['deviceType'].markAsTouched();
         form.controls['deviceType'].updateValueAndValidity();

         fixture.detectChanges();
         resolve();
      })
         .then(() => {
            const taker = fixture.debugElement.query(
               By.css('#questionnaireTaker')
            );
            taker.triggerEventHandler('selectionChange', {
               value: QuestionnaireTakerTypes.Subject
            });
            form.controls['questionnaireTaker'].setValue(
               QuestionnaireTakerTypes.Caregiver
            );
            form.controls['questionnaireTaker'].markAsTouched();
            form.controls['questionnaireTaker'].updateValueAndValidity();
         })
         .then(() => {
            expect(form.valid).toBeTruthy();
            expect(form.controls['questionnaireTaker'].valid).toBeTruthy();
         });
   });

   it(' - The form is valid when deviceType is Handheld and questionnaireTaker is Caregiver and isTraining is enabled', () => {
      const form = component.questionnaireTypeForm;
      new Promise(resolve => {
         component.isIrtStudyType = false;
         const deviceTypeSelect = fixture.debugElement.query(
            By.css('#deviceType')
         );
         deviceTypeSelect.triggerEventHandler('selectionChange', {
            value: QuestionnaireDeviceTypes.Handheld
         });
         form.controls['deviceType'].setValue(
            QuestionnaireDeviceTypes.Handheld
         );
         form.controls['deviceType'].markAsTouched();
         form.controls['deviceType'].updateValueAndValidity();

         fixture.detectChanges();
         resolve();
      })
         .then(() => {
            const taker = fixture.debugElement.query(
               By.css('#questionnaireTaker')
            );
            taker.triggerEventHandler('selectionChange', {
               value: QuestionnaireTakerTypes.Subject
            });
            form.controls['questionnaireTaker'].setValue(
               QuestionnaireTakerTypes.Caregiver
            );
            form.controls['questionnaireTaker'].markAsTouched();
            form.controls['questionnaireTaker'].updateValueAndValidity();
         })
         .then(() => {
            expect(form.valid).toBeTruthy();
            expect(form.controls['questionnaireTaker'].valid).toBeTruthy();
            expect(form.controls['isTraining'].enabled).toBeTruthy();
         });
   });

   it('should set Form to valid and showTraining to true when deviceType and questionnaire taker allow training', () => {
      const form = component.questionnaireTypeForm;
      new Promise(resolve => {
         component.isIrtStudyType = false;
         const deviceTypeSelect = fixture.debugElement.query(
            By.css('#deviceType')
         );
         deviceTypeSelect.triggerEventHandler('selectionChange', {
            value: QuestionnaireDeviceTypes.Handheld
         });
         form.controls['deviceType'].setValue(
            QuestionnaireDeviceTypes.Handheld
         );
         form.controls['deviceType'].markAsTouched();
         form.controls['deviceType'].updateValueAndValidity();

         fixture.detectChanges();
         resolve();
      })
         .then(() => {
            const taker = fixture.debugElement.query(
               By.css('#questionnaireTaker')
            );
            taker.triggerEventHandler('selectionChange', {
               value: QuestionnaireTakerTypes.Subject
            });
            form.controls['questionnaireTaker'].setValue(
               QuestionnaireTakerTypes.Caregiver
            );
            form.controls['questionnaireTaker'].markAsTouched();
            form.controls['questionnaireTaker'].updateValueAndValidity();
         })
         .then(() => {
            expect(form.valid).toBeTruthy();
            expect(form.controls['questionnaireTaker'].valid).toBeTruthy();
            expect(form.controls['isTraining'].enabled).toBeTruthy();
         });
   });

   it(' - The form is valid when deviceType is Tablet and questionnaireTaker is Clinician and isTraining is disabled', () => {
      const form = component.questionnaireTypeForm;

      new Promise(resolve => {
         component.isIrtStudyType = false;
         const deviceTypeSelect = fixture.debugElement.query(
            By.css('#deviceType')
         );
         deviceTypeSelect.triggerEventHandler('selectionChange', {
            value: QuestionnaireDeviceTypes.Tablet
         });
         form.controls['deviceType'].setValue(QuestionnaireDeviceTypes.Tablet);
         form.controls['deviceType'].markAsTouched();
         form.controls['deviceType'].updateValueAndValidity();
         fixture.detectChanges();
         resolve();
      })
         .then(() => {
            const taker = fixture.debugElement.query(
               By.css('#questionnaireTaker')
            );
            taker.triggerEventHandler('selectionChange', {
               value: QuestionnaireTakerTypes.Clinician
            });
            form.controls['questionnaireTaker'].setValue(
               QuestionnaireTakerTypes.Caregiver
            );
            form.controls['questionnaireTaker'].markAsTouched();
            form.controls['questionnaireTaker'].updateValueAndValidity();
         })
         .then(() => {
            expect(form.valid).toBeTruthy();
            expect(form.controls['questionnaireTaker'].valid).toBeTruthy();
            expect(form.controls['isTraining'].enabled).toBeFalsy();
         });
   });

   it('should call config service on create', () => {
      expect(configService.getStudyType).toHaveBeenCalled();
   });

   it('should set showTraining to true when deviceType and questionnaire taker allow training', () => {
      new Promise(resolve => {
         component.isIrtStudyType = false;
         const deviceTypeSelect = fixture.debugElement.query(
            By.css('#deviceType')
         );
         deviceTypeSelect.triggerEventHandler('selectionChange', {
            value: QuestionnaireDeviceTypes.Handheld
         });
         fixture.detectChanges();
         resolve();
      })
         .then(() => {
            const taker = fixture.debugElement.query(
               By.css('#questionnaireTaker')
            );
            taker.triggerEventHandler('selectionChange', {
               value: QuestionnaireTakerTypes.Caregiver
            });
         })
         .then(() => {
            expect(component.showTraining).toBeTruthy();
         });
   });

   it('should set showTraining to false when deviceType does not allow training', () => {
      component.isIrtStudyType = false;
      const deviceTypeSelect = fixture.debugElement.query(
         By.css('#deviceType')
      );
      deviceTypeSelect.triggerEventHandler('selectionChange', {
         value: QuestionnaireDeviceTypes.Tablet
      });

      fixture.detectChanges();

      const taker = fixture.debugElement.query(By.css('#questionnaireTaker'));
      taker.triggerEventHandler('selectionChange', {
         value: QuestionnaireTakerTypes.Caregiver
      });

      expect(component.showTraining).toBeFalsy();
   });

   it('should set showTraining to false when questionnaire taker does not allow training', () => {
      component.isIrtStudyType = false;
      const deviceTypeSelect = fixture.debugElement.query(
         By.css('#deviceType')
      );
      deviceTypeSelect.triggerEventHandler('selectionChange', {
         value: QuestionnaireDeviceTypes.Handheld
      });

      fixture.detectChanges();

      const taker = fixture.debugElement.query(By.css('#questionnaireTaker'));
      taker.triggerEventHandler('selectionChange', {
         value: '9555575C-6B75-423D-BAF0-C279E0D3DC74'
      });

      expect(component.showTraining).toBeFalsy();
   });

   it('should filter Subject and/or Caregiver from takers when device type is changed to tablet', () => {
      component.deviceTypeChanged({ value: QuestionnaireDeviceTypes.Tablet.toString(), source: undefined });
      const hasSubjectAndOrCaregiver = component.eligbleQuestionnaireTakers.filter(
         x => x.id.toUpperCase() === QuestionnaireTakerTypes.SubjectAndOrCareGiver.toUpperCase())
         .length;

      expect(hasSubjectAndOrCaregiver).toBeFalsy();
   });
});

describe('QuestionnaireTypeComponent - Set show properties based on study types', () => {
   const configSpy = jasmine.createSpyObj('ConfigService', ['getStudyType']);
   const takerSpy = jasmine.createSpyObj('QuestionnaireTakerService', [
      'getTakers'
   ]);
   const deviceTypeSpy = jasmine.createSpyObj(
      'QuestionnaireDeviceTypeService',
      ['getQuestionnaireDeviceTypes']
   );

   beforeEach(() => {
      takerSpy.getTakers.and.returnValues(of(takers));
      deviceTypeSpy.getQuestionnaireDeviceTypes.and.returnValues(
         of(deviceTypes)
      );
   });

   it('should show IRT device type when study type is irt only', () => {
      configSpy.getStudyType.and.returnValue(of(StudyTypes.IRT));

      const questionnaireTypeComponent = new QuestionnaireTypeComponent(
         takerSpy,
         deviceTypeSpy,
         configSpy
      );

      questionnaireTypeComponent.ngOnInit();

      expect(questionnaireTypeComponent.isIrtStudyType).toBeTruthy();

      expect(questionnaireTypeComponent.selectedMapping.deviceType
         .id as QuestionnaireDeviceTypes).toEqual(QuestionnaireDeviceTypes.Irt);
      expect(
         questionnaireTypeComponent.filteredQuestionnaireDeviceTypes.length ===
            1 &&
            questionnaireTypeComponent.filteredQuestionnaireDeviceTypes[0].id.toUpperCase() ===
               QuestionnaireDeviceTypes.Irt.toUpperCase()
      ).toBeTruthy();
   });

   it('should show handheld and table device types when study type is eCOA Only', () => {
      configSpy.getStudyType.and.returnValue(of(StudyTypes.eCOA));
      takerSpy.getTakers.and.returnValues(of(takers));
      deviceTypeSpy.getQuestionnaireDeviceTypes.and.returnValues(
         of(deviceTypes)
      );

      const questionnaireTypeComponent = new QuestionnaireTypeComponent(
         takerSpy,
         deviceTypeSpy,
         configSpy
      );

      questionnaireTypeComponent.ngOnInit();

      expect(questionnaireTypeComponent.isIrtStudyType).toBeFalsy();

      expect(
         questionnaireTypeComponent.filteredQuestionnaireDeviceTypes.filter(
            x =>
               x.id.toUpperCase() === QuestionnaireDeviceTypes.Irt.toUpperCase()
         ).length
      ).toEqual(0);
      expect(
         questionnaireTypeComponent.filteredQuestionnaireDeviceTypes.filter(
            x =>
               x.id.toUpperCase() ===
               QuestionnaireDeviceTypes.Handheld.toUpperCase()
         ).length
      ).toEqual(1);
      expect(
         questionnaireTypeComponent.filteredQuestionnaireDeviceTypes.filter(
            x =>
               x.id.toUpperCase() ===
               QuestionnaireDeviceTypes.Tablet.toUpperCase()
         ).length
      ).toEqual(1);
   });

   it('should show all device types when study type is Unified', () => {
      configSpy.getStudyType.and.returnValue(of(StudyTypes.Unified));
      takerSpy.getTakers.and.returnValues(of(takers));
      deviceTypeSpy.getQuestionnaireDeviceTypes.and.returnValues(
         of(deviceTypes)
      );

      const questionnaireTypeComponent = new QuestionnaireTypeComponent(
         takerSpy,
         deviceTypeSpy,
         configSpy
      );

      questionnaireTypeComponent.ngOnInit();

      expect(questionnaireTypeComponent.isIrtStudyType).toBeFalsy();

      expect(
         questionnaireTypeComponent.filteredQuestionnaireDeviceTypes.filter(
            x =>
               x.id.toUpperCase() === QuestionnaireDeviceTypes.Irt.toUpperCase()
         ).length
      ).toEqual(1);
      expect(
         questionnaireTypeComponent.filteredQuestionnaireDeviceTypes.filter(
            x =>
               x.id.toUpperCase() ===
               QuestionnaireDeviceTypes.Handheld.toUpperCase()
         ).length
      ).toEqual(1);
      expect(
         questionnaireTypeComponent.filteredQuestionnaireDeviceTypes.filter(
            x =>
               x.id.toUpperCase() ===
               QuestionnaireDeviceTypes.Tablet.toUpperCase()
         ).length
      ).toEqual(1);
   });
});
