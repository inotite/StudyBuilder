import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateQuestionnaireComponent } from './create-questionnaire.component';
import { QuestionnaireLeftPanelComponent } from './questionnaire-left-panel/questionnaire-left-panel.component';
import { QuestionnaireMiddlePanelComponent } from './questionnaire-middle-panel/questionnaire-middle-panel.component';
import { QuestionnaireRightPanelComponent } from './questionnaire-right-panel/questionnaire-right-panel.component';
import {HttpClient, HttpHandler} from '@angular/common/http';

import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {of} from 'rxjs';
import {TestHelper} from '../shared/helpers/test.helper';

describe('CreateQuestionnaireComponent', () => {
  let component: CreateQuestionnaireComponent;
  let fixture: ComponentFixture<CreateQuestionnaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CreateQuestionnaireComponent
      ],
       schemas: [
          CUSTOM_ELEMENTS_SCHEMA
       ],
       providers: [ HttpClient,
          HttpHandler,
          { provide : ActivatedRoute, useValue : {
                params: of({noQuestionnaires : true })
             }
          }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateQuestionnaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have left panel', () => {
     const panel = TestHelper.getAllElementsByAngular(fixture, QuestionnaireLeftPanelComponent);
     expect(panel).toBeTruthy();
  });
   it('should have middle panel', () => {
      const panel = TestHelper.getAllElementsByAngular(fixture, QuestionnaireMiddlePanelComponent);
      expect(panel).toBeTruthy();
   });
   it('should have right panel', () => {
      const panel = TestHelper.getAllElementsByAngular(fixture, QuestionnaireRightPanelComponent);
      expect(panel).toBeTruthy();
   });
});
