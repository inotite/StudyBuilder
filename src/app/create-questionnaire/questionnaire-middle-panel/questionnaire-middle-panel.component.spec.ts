import { QuestionnaireNameComponent } from './../questionnaire-name/questionnaire-name.component';
import { UnifiedQuestionnaireComponent } from './../unified-questionnaire/unified-questionnaire.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TestHelper } from '../../shared/helpers/test.helper';

import { QuestionnaireMiddlePanelComponent } from './questionnaire-middle-panel.component';
import { QuestionnaireFormComponent } from '../questionnaire-form/questionnaire-form.component';
import { CUSTOM_ELEMENTS_SCHEMA, forwardRef } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

describe('QuestionnaireMiddlePanelComponent', () => {
   let component: QuestionnaireMiddlePanelComponent;
   let fixture: ComponentFixture<QuestionnaireMiddlePanelComponent>;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         imports: [RouterTestingModule, ReactiveFormsModule],
         declarations: [
            QuestionnaireMiddlePanelComponent,
            QuestionnaireFormComponent
         ],
         schemas: [CUSTOM_ELEMENTS_SCHEMA]
      }).compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(QuestionnaireMiddlePanelComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });

   it('should create the app', async(() => {
      const app = fixture.debugElement.componentInstance;
      expect(app).toBeTruthy();
   }));

   it('should have router outlet for questionnaire form component', () => {
      const elements = TestHelper.getAllElementsByCss(fixture, 'router-outlet');
      expect(elements.length).toEqual(1);
   });
});
