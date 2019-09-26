import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Component, OnInit, ViewChild, ElementRef, Renderer2} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {QuestionnaireLeftPanelComponent} from './questionnaire-left-panel.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {TestHelper} from '../../shared/helpers/test.helper';

describe('QuestionnaireLeftPanelComponent', () => {
   let component: QuestionnaireLeftPanelComponent;
   let fixture: ComponentFixture<QuestionnaireLeftPanelComponent>;
   beforeEach(async(() => {
      TestBed.configureTestingModule({
         declarations: [QuestionnaireLeftPanelComponent],
         schemas: [CUSTOM_ELEMENTS_SCHEMA]
      }).compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(QuestionnaireLeftPanelComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });

   it('should have an add questionnaire button', () => {
      const addBtn = TestHelper.getElementByCss(
         fixture,
         'app-add-questionnaire'
      );
      expect(addBtn).toBeTruthy();
   });

   it('should have questionnaire list', () => {
      const compiled = fixture.debugElement.nativeElement;
      const questionnairesList = compiled.querySelector(
         'app-questionnaire-list'
      );
      expect(questionnairesList).toBeTruthy();
   });
});
