import {
   HttpClientTestingModule,
   HttpTestingController
} from '@angular/common/http/testing';
import { BusinessRuleService } from './businessrules.service';
import { BusinessRuleList } from '../models/business-rule-list.model';
import { TestBed } from '@angular/core/testing';
import { businessRuleUrl } from '../helpers/url.constant';
import { BusinessRuleItem } from '../models/business-rule-item.model';

describe('BusinessService', () => {
   const url = businessRuleUrl.endsWith('/')
      ? businessRuleUrl
      : businessRuleUrl + '/';
   let businessRuleService: BusinessRuleService;
   let httpMock: HttpTestingController;
   let businessRuleItemList: BusinessRuleItem[];

   beforeEach(async () => {
      TestBed.configureTestingModule({
         providers: [BusinessRuleService],
         imports: [HttpClientTestingModule]
      });

      businessRuleItemList = [
         {
            id: '9acd43d3-827a-4a35-8323-7bf5cee367c7',
            name: 'businessRuleA',
            description: 'businessRuleA',
            inclusive: false
         },
         {
            id: '9bcd43d3-827a-4a35-8323-7bf5cee367c7',
            name: 'businessRuleB',
            description: 'businessRuleB',
            inclusive: false
         }
      ];

      businessRuleService = TestBed.get(BusinessRuleService);
      httpMock = TestBed.get(HttpTestingController);
   });

   it('when created will not make the HTTP get call', () => {
      httpMock.expectNone(url);

      httpMock.verify();
   });

   it('when getBusinessRules is called will make the HTTP get call for Business Rule Items', () => {
      businessRuleService.getBusinessRules();

      httpMock.expectOne(url).flush(businessRuleItemList);

      httpMock.verify();
   });

   it('when getBusinessRules is called, will return an Observable with the businessRuleList', () => {
      let businessRuleItems: BusinessRuleItem[];
      businessRuleService
         .getBusinessRules()
         .subscribe(
            (groups: BusinessRuleItem[]) => (businessRuleItems = groups)
         );

      httpMock.expectOne(url).flush(businessRuleItemList);

      expect(businessRuleItems).toEqual(businessRuleItemList);

      httpMock.verify();
   });
});
