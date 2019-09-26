import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {QuestionnairesService} from './questionnaires.service';
import {Questionnaire} from '../models/questionnaire.model';
import {TestBed} from '@angular/core/testing';
import {questionnaireUrl} from '../helpers/url.constant';

describe('QuestionnaireService', () => {
   const url = questionnaireUrl.endsWith('/') ? questionnaireUrl : questionnaireUrl + '/';
   let questionnaireService: QuestionnairesService;
   let httpMock: HttpTestingController;
   let questionnaireList: Questionnaire[];

   beforeEach(async () => {
      TestBed.configureTestingModule({
         providers: [QuestionnairesService],
         imports: [HttpClientTestingModule]
      });

      const questionnaireItemA: Questionnaire = {
         adaptestSettingsFieldId: null,
         allowEdit: false,
         displayName: 'testA',
         displaySummaryScore: false,
         enableBusinessRuleId: null,
         enabledBusinessRuleResult: false,
         enableVisitQuestionnaireId: null,
         enforcePreviousDaysEntry: false,
         id: '9acd43d3-827a-4a35-8323-7bf5cee367c7',
         internalName: 'testA',
         isBlinded: false,
         isDropdownNavigationEnabled: false,
         openEndedBusinessRuleId: null,
         previousDaysEdit: false,
         previousDaysEntry: 0,
         promptIncompletePagesOnSave: false,
         questionnaireTypeId: 1,
         sequence: 1,
         translationKey: 'testA',
         url: null,
         validateQuestionnaireOnSave: false,
         visibleBusinessRuleId: null,
         visibleBusinessRuleResult: false
      };

      const questionnaireItemB: Questionnaire = {
         adaptestSettingsFieldId: null,
         allowEdit: false,
         displayName: 'testB',
         displaySummaryScore: false,
         enableBusinessRuleId: null,
         enabledBusinessRuleResult: false,
         enableVisitQuestionnaireId: null,
         enforcePreviousDaysEntry: false,
         id: '4316663c-575c-47de-bdbc-37d730890929',
         internalName: 'testB',
         isBlinded: false,
         isDropdownNavigationEnabled: false,
         openEndedBusinessRuleId: null,
         previousDaysEdit: false,
         previousDaysEntry: 0,
         promptIncompletePagesOnSave: false,
         questionnaireTypeId: 1,
         sequence: 1,
         translationKey: 'testB',
         url: null,
         validateQuestionnaireOnSave: false,
         visibleBusinessRuleId: null,
         visibleBusinessRuleResult: false
      };

      questionnaireList = [questionnaireItemA, questionnaireItemB];

      questionnaireService = TestBed.get(QuestionnairesService);
      httpMock = TestBed.get(HttpTestingController);
   });

   it('when created will not make the HTTP get call', () => {
      httpMock.expectNone(url);

      httpMock.verify();
   });

   it('when getQuestionnaireListItems is called will make the HTTP get call for Questionnaires', () => {
      questionnaireService.getQuestionnaireListItems();

      httpMock.expectOne(url).flush(questionnaireList);

      httpMock.verify();
   });

   it('when getQuestionnaireListItems is called, will return an Observable with the questionnaireList', () => {
      let questionnaireLists: Questionnaire[];
      questionnaireService.getQuestionnaireListItems().subscribe((groups: Questionnaire[]) => (questionnaireLists = groups));

      httpMock.expectOne(url).flush(questionnaireList);

      expect(questionnaireLists).toEqual(questionnaireList);

      httpMock.verify();
   });
});
