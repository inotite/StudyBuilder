import {TestBed} from '@angular/core/testing';

import {QuestionnaireListComponent} from './questionnaire-list.component';
import {TestHelper} from '../../shared/helpers/test.helper';
import {of} from 'rxjs';
import {QuestionnairesService} from '../../shared/services/questionnaires.service';
import {ActivatedRoute} from '@angular/router';
import {Questionnaire} from '../../shared/models/questionnaire.model';

describe('QuestionnaireListComponent', () => {
   let mockQuestionnairesService;
   let mockActivatedRoute;

   beforeAll(() => {
      mockActivatedRoute = {params: of({}), queryParams: of({})};
   });

   it('should create', () => {
      mockQuestionnairesService = {getQuestionnaireListItems: () => of({})};

      TestBed.configureTestingModule({
         declarations: [QuestionnaireListComponent],
         providers: [
            {provide: QuestionnairesService, useValue: mockQuestionnairesService},
            {provide: ActivatedRoute, useValue: mockActivatedRoute}
         ]
      });

      const fixture = TestBed.createComponent(QuestionnaireListComponent);
      expect(fixture.componentInstance).toBeTruthy();
   });

   it('should have a li for each questionnaire', () => {
      const questionnaires = [{url: 'someUrl', displayName: 'someDisplayName'}, {url: 'someUrl', displayName: 'someDisplayName'}];

      mockQuestionnairesService = {
         getQuestionnaireListItems: () => of(questionnaires),
         questionnaireSubscription: null,
         updateCurrentQuestionnaireList: function(quests: Questionnaire[]) {}
      };

      TestBed.configureTestingModule({
         declarations: [QuestionnaireListComponent],
         providers: [
            {provide: QuestionnairesService, useValue: mockQuestionnairesService},
            {provide: ActivatedRoute, useValue: mockActivatedRoute}
         ]
      });

      const fixture = TestBed.createComponent(QuestionnaireListComponent);
      fixture.detectChanges();
      const listItemCount = TestHelper.getAllElementsByCss(fixture, 'li').length;
      expect(listItemCount).toEqual(2);
   });

   it('should show no questionnaires message if no questionnaires', () => {
      const questionnaires = [];
      mockQuestionnairesService = {
         getQuestionnaireListItems: () => of(questionnaires),
         questionnaireSubscription: null,
         updateCurrentQuestionnaireList: function(quests: Questionnaire[]) {}
      };

      TestBed.configureTestingModule({
         declarations: [QuestionnaireListComponent],
         providers: [
            {provide: QuestionnairesService, useValue: mockQuestionnairesService},
            {provide: ActivatedRoute, useValue: mockActivatedRoute}
         ]
      });

      const fixture = TestBed.createComponent(QuestionnaireListComponent);
      fixture.detectChanges();
      const listItems = TestHelper.getAllElementsByCss(fixture, 'li').map(x => x.nativeElement as HTMLLIElement);
      expect(listItems.length).toEqual(0);
   });
});
