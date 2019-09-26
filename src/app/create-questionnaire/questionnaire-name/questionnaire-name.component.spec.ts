import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, forwardRef } from '@angular/core';
import { QuestionnaireNameComponent } from './questionnaire-name.component';
import { TestHelper } from 'src/app/shared/helpers/test.helper';
import { Questionnaire } from 'src/app/shared/models/questionnaire.model';
import {
   ReactiveFormsModule,
   FormsModule
} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import { OnOffPipe } from 'src/app/yprime-artifacts/pipes/on-off.pipe';

describe('QuestionnaireNameComponent', () => {
   let component: QuestionnaireNameComponent;
   let fixture: ComponentFixture<QuestionnaireNameComponent>;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         declarations: [QuestionnaireNameComponent, OnOffPipe],
         schemas: [CUSTOM_ELEMENTS_SCHEMA],
         imports: [FormsModule, ReactiveFormsModule, HttpClientTestingModule]
      }).compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(QuestionnaireNameComponent);
      component = fixture.componentInstance;
      component.questionnaire = {} as Questionnaire;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });

   it('should have a div with the container-fluid class', () => {
      const element = TestHelper.getElementByCss(
         fixture,
         'div.container-fluid'
      ) as HTMLDivElement;

      expect(element).toBeTruthy();
   });

   it(' - The form is invalid when page loads', () => {
      const form = component.questionnaireNameForm;

      fixture.detectChanges();

      expect(form.valid).toBeFalsy();
      expect(form.controls['internalQuestionnaireName'].valid).toBeFalsy();
   });

   it(' - The form is valid when required fields have input', () => {
      const form = component.questionnaireNameForm;
      form.controls['internalQuestionnaireName'].setValue('test');
      form.controls['displayQuestionnaireName'].setValue('test');
      fixture.detectChanges();

      expect(form.valid).toBeTruthy();
      expect(form.controls['internalQuestionnaireName'].valid).toBeTruthy();
   });

   it('should have a textbox with internalQuestionnaireName ID', () => {
      const element = TestHelper.getElementByCss(
         fixture,
         'input#internalQuestionnaireName'
      ) as HTMLDivElement;

      expect(element).toBeTruthy();
   });

   it('should have a textbox with displayQuestionnaireName ID', () => {
      const element = TestHelper.getElementByCss(
         fixture,
         'input#displayQuestionnaireName'
      ) as HTMLDivElement;

      expect(element).toBeTruthy();
   });

   it('should have a slider with blindedCanViewAnswers ID', () => {
      const element = TestHelper.getElementByCss(
         fixture,
         'mat-slide-toggle#blindedCanViewAnswers'
      ) as HTMLDivElement;

      expect(element).toBeTruthy();
   });
});
