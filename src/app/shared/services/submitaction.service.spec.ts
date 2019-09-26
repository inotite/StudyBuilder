import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SubmitActionService } from './submitaction.service';
import { SubmitActionItem } from '../models/submit-action-item.model';
import { TestBed } from '@angular/core/testing';
import { submitActionUrl } from '../helpers/url.constant';

describe('SubmitActionService',
  () => {
    const url = submitActionUrl.endsWith('/') ? submitActionUrl : submitActionUrl + '/';
    let submitActionService: SubmitActionService;
    let httpMock: HttpTestingController;
    let submitActionList: SubmitActionItem[];

    beforeEach(async() => {
        TestBed.configureTestingModule({
            providers: [
                SubmitActionService
            ],
            imports: [
              HttpClientTestingModule
            ]
          });

        const submitActionItemA: SubmitActionItem = {
          'id': '9acd43d3-827a-4a35-8323-7bf5cee367c7',
          'displayName': 'submit Action A',
          'typeName': 'submitActionA',
          'successPatientStatusTypeId': 1,
          'failurePatientStatusTypeId': 1
        };

        const submitActionItemB: SubmitActionItem = {
          'id': '4316663c-575c-47de-bdbc-37d730890929',
          'displayName': 'submit Action B',
          'typeName': 'submitActionB',
          'successPatientStatusTypeId': 2,
          'failurePatientStatusTypeId': 2
        };

        submitActionList = [
          submitActionItemA, submitActionItemB
        ];

        submitActionService = TestBed.get(SubmitActionService);
        httpMock = TestBed.get(HttpTestingController);
    });

    it('when created will not make the HTTP get call',
      () => {
        httpMock.expectNone(url);

        httpMock.verify();
      });

    it('when getSubmitActions is called will make the HTTP get call for Submit Action Items',
      () => {
        submitActionService.getSubmitActions();

        httpMock.expectOne(url)
          .flush(submitActionList);

        httpMock.verify();
      });

    it('when getSubmitActions is called, will return an Observable with the submtAcionList',
      () => {
        let submitActionLists: SubmitActionItem[];
        submitActionService.getSubmitActions()
          .subscribe((groups: SubmitActionItem[]) => submitActionLists = groups);

        httpMock.expectOne(url)
          .flush(submitActionList);

        expect(submitActionLists).toEqual(submitActionList);

        httpMock.verify();
      });
  });
