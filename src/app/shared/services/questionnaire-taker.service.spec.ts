import {TestBed} from '@angular/core/testing';

import {QuestionnaireTakerService} from './questionnaire-taker.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {questionnaireTakerTypeUrl} from '../helpers/url.constant';
import {QuestionnaireTaker} from '../models/questionnaire-taker.model';

describe('QuestionnaireTakerService', () => {
   const url = questionnaireTakerTypeUrl.endsWith('/') ? questionnaireTakerTypeUrl : questionnaireTakerTypeUrl + '/';
   let httpMock: HttpTestingController;
   let service: QuestionnaireTakerService;
   let takers: QuestionnaireTaker[];

   beforeEach(async () => {
      TestBed.configureTestingModule({
         providers: [QuestionnaireTakerService],
         imports: [HttpClientTestingModule]
      });

      httpMock = TestBed.get(HttpTestingController);
      takers = [
         {
            id: 'someGuid',
            type: 'Patient',
            canDoTraining: false
         }
      ];

      service = TestBed.get(QuestionnaireTakerService);
   });

   it('should be created', () => {
      expect(service).toBeTruthy();
   });

   it('when created will not make the HTTP get call', () => {
      httpMock.expectNone(url);
      httpMock.verify();
   });

   it('#getTakers should make a http call', () => {
      service.getTakers();
      httpMock.expectOne(url).flush(takers);

      httpMock.verify();
   });

   it('#getTakers should return an observable array of questionnaire takers', () => {
      let results: QuestionnaireTaker[];

      service.getTakers().subscribe((data: QuestionnaireTaker[]) => (results = data));

      httpMock.expectOne(url).flush(takers);

      expect(results).toEqual(takers);

      httpMock.verify();
   });
});
