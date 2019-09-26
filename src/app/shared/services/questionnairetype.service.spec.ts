import {
   HttpClientTestingModule,
   HttpTestingController
} from '@angular/common/http/testing';
import { QuestionnaireTypeService } from './questionnairetype.service';
import { QuestionnaireTypeItem } from '../models/questionnaire-type-item.model';
import { TestBed } from '@angular/core/testing';
import {
   questionnaireTypeUrl,
   questionnaireTypesMappingUrl
} from '../helpers/url.constant';

describe('QuestionnaireTypeService', () => {
   const url = questionnaireTypeUrl.endsWith('/')
      ? questionnaireTypeUrl
      : questionnaireTypeUrl + '/';
   let questionnaireTypeService: QuestionnaireTypeService;
   let httpMock: HttpTestingController;
   let questionnaireTypeList: QuestionnaireTypeItem[];

   beforeEach(async () => {
      TestBed.configureTestingModule({
         providers: [QuestionnaireTypeService],
         imports: [HttpClientTestingModule]
      });

      const questionnaireTypeItemA: QuestionnaireTypeItem = {
         id: 1,
         name: 'Clinician',
         code: 'C'
      };

      const questionnaireTypeItemB: QuestionnaireTypeItem = {
         id: 2,
         name: 'Patient',
         code: 'P'
      };

      questionnaireTypeList = [questionnaireTypeItemA, questionnaireTypeItemB];

      questionnaireTypeService = TestBed.get(QuestionnaireTypeService);
      httpMock = TestBed.get(HttpTestingController);
   });

   it('when created will not make the HTTP get call', () => {
      httpMock.expectNone(url);

      httpMock.verify();
   });

   it('when created will not make the HTTP get call', () => {
      httpMock.expectNone(questionnaireTypesMappingUrl);

      httpMock.verify();
   });

   it('when getQuestionnaireTypes is called will make the HTTP get call for Questionanire Type Items', () => {
      questionnaireTypeService.getQuestionnaireTypes();

      httpMock.expectOne(url).flush(questionnaireTypeList);

      httpMock.verify();
   });

   it('when getQuestionnaireTypes is called, will return an Observable with the questionnaireTypeList', () => {
      let questionnaireTypeLists: QuestionnaireTypeItem[];
      questionnaireTypeService
         .getQuestionnaireTypes()
         .subscribe(
            (groups: QuestionnaireTypeItem[]) =>
               (questionnaireTypeLists = groups)
         );

      httpMock.expectOne(url).flush(questionnaireTypeList);

      expect(questionnaireTypeLists).toEqual(questionnaireTypeList);

      httpMock.verify();
   });
});
