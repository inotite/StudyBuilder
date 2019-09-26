import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
   Component,
   Input,
   OnDestroy,
   forwardRef,
   OnInit,
   ElementRef,
   ViewChild,
   CUSTOM_ELEMENTS_SCHEMA
} from '@angular/core';
import { QuestionnaireButtonsComponent } from './questionnaire-buttons.component';
import { TestHelper } from 'src/app/shared/helpers/test.helper';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { QuestionnairesService } from '../../shared/services/questionnaires.service';

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
import SpyObj = jasmine.SpyObj;
import { Subject } from 'rxjs';
const anyObservable = new Subject<any>();

describe('QuestionnaireButtonsComponent', () => {
   let component: QuestionnaireButtonsComponent;
   let fixture: ComponentFixture<QuestionnaireButtonsComponent>;
   let router: Router;
   let questionnairesServiceSpy: SpyObj<QuestionnairesService>;

   beforeEach(async(() => {
      questionnairesServiceSpy = jasmine.createSpyObj('QuestionnairesService', [
         'cancelQuestionnaireSubscription'
      ]);
      questionnairesServiceSpy.cancelQuestionnaireSubscription.and.returnValue(
         anyObservable
      );

      questionnairesServiceSpy = jasmine.createSpyObj('QuestionnairesService', [
         'cancelQuestionnaire'
      ]);

      TestBed.configureTestingModule({
         declarations: [QuestionnaireButtonsComponent],
         schemas: [CUSTOM_ELEMENTS_SCHEMA],
         imports: [RouterTestingModule.withRoutes([]), ReactiveFormsModule],
         providers: [
            {
               provide: QuestionnairesService,
               useValue: questionnairesServiceSpy
            }
         ]
      }).compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(QuestionnaireButtonsComponent);
      component = fixture.componentInstance;
      router = TestBed.get(Router);
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });

   it('should have an input element with cancelQuestionnaire ID', () => {
      const element = TestHelper.getElementByCss(
         fixture,
         'button#cancelQuestionnaire'
      ) as HTMLDivElement;

      expect(element).toBeTruthy();
   });

   it('should have an input element with saveQuestionnaire ID', () => {
      const element = TestHelper.getElementByCss(
         fixture,
         'button#saveQuestionnaire'
      ) as HTMLDivElement;

      expect(element).toBeTruthy();
   });

   it('should route to Questionnare when onClick is called', () => {
      const navigateSpy = spyOn(router, 'navigate');
      component.onCancel();
      expect(navigateSpy).toHaveBeenCalledWith(['Questionnaires']);
   });
});
