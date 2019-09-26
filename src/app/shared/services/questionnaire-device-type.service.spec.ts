import { TestBed } from '@angular/core/testing';

import { QuestionnaireDeviceTypeService } from './questionnaire-device-type.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {questionnaireDeviceTypeUrl} from '../helpers/url.constant';
import {QuestionnaireDeviceType} from '../models/questionnaire-device-type.model';

describe('QuestionnaireDeviceTypeService', () => {

   const url = questionnaireDeviceTypeUrl.endsWith('/') ? questionnaireDeviceTypeUrl : questionnaireDeviceTypeUrl + '/';
   let httpMock: HttpTestingController;
   let service: QuestionnaireDeviceTypeService;
   let questionnaireDeviceTypes: QuestionnaireDeviceType[];

   beforeEach(async () => {
      TestBed.configureTestingModule({
         providers: [ QuestionnaireDeviceTypeService ],
         imports: [ HttpClientTestingModule ]
      });

      httpMock = TestBed.get(HttpTestingController);
      questionnaireDeviceTypes = [
         {
            id: 'someGuid',
            type: 'IRT',
            canDoTraining: false
         }];

      service = TestBed.get(QuestionnaireDeviceTypeService);
   });

   it('should be created', () => {
      expect(service).toBeTruthy();
   });

   it('when created will not make the HTTP get call',
      () => {
         httpMock.expectNone(url);
         httpMock.verify();
      });

   it('#getTakers should make a http call', () => {
      service.getQuestionnaireDeviceTypes();
      httpMock.expectOne(url)
         .flush(questionnaireDeviceTypes);

      httpMock.verify();
   });

   it('#getTakers should return an observable array of questionnaire takers', () => {
      let results: QuestionnaireDeviceType[];

      service.getQuestionnaireDeviceTypes()
         .subscribe((data: QuestionnaireDeviceType[]) => results = data);

      httpMock.expectOne(url)
         .flush(questionnaireDeviceTypes);

      expect(results).toEqual(questionnaireDeviceTypes);

      httpMock.verify();
   });
});
