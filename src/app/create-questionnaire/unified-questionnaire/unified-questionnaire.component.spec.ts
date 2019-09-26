import { QuestionnaireNameComponent } from './../questionnaire-name/questionnaire-name.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UnifiedQuestionnaireComponent } from './unified-questionnaire.component';
import { CUSTOM_ELEMENTS_SCHEMA, forwardRef } from '@angular/core';
import { TestHelper } from 'src/app/shared/helpers/test.helper';
import { Questionnaire } from 'src/app/shared/models/questionnaire.model';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import { OnOffPipe } from 'src/app/yprime-artifacts/pipes/on-off.pipe';

describe('UnifiedQuestionnaireComponent', () => {
   let component: UnifiedQuestionnaireComponent;
   let fixture: ComponentFixture<UnifiedQuestionnaireComponent>;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         declarations: [
            UnifiedQuestionnaireComponent,
            QuestionnaireNameComponent,
            OnOffPipe
         ],
         schemas: [CUSTOM_ELEMENTS_SCHEMA],
         imports: [FormsModule, ReactiveFormsModule, HttpClientTestingModule]
      }).compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(UnifiedQuestionnaireComponent);
      component = fixture.componentInstance;
      component.questionnaire = {} as Questionnaire;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });

   it('should include a Questionnaire Name Component', () => {
      const unified = TestHelper.getElementByAngular(
         fixture,
         QuestionnaireNameComponent
      );

      expect(unified).toBeTruthy();
   });
});
