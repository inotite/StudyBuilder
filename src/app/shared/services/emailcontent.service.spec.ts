import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {EmailContentService} from './emailcontent.service';
import {EmailContentItem} from '../models/email-content-item.model';
import {TestBed} from '@angular/core/testing';
import {emailContentUrl} from '../helpers/url.constant';

describe('EmailContentService', () => {
   const url = emailContentUrl.endsWith('/') ? emailContentUrl : emailContentUrl + '/';
   let emailContentService: EmailContentService;
   let httpMock: HttpTestingController;
   let emailContentList: EmailContentItem[];

   beforeEach(async () => {
      TestBed.configureTestingModule({
         providers: [EmailContentService],
         imports: [HttpClientTestingModule]
      });

      const emailContentItemA: EmailContentItem = {
         id: '9acd43d3-827a-4a35-8323-7bf5cee367c7',
         name: 'email type A'
      };

      const emailContentItemB: EmailContentItem = {
         id: '4316663c-575c-47de-bdbc-37d730890929',
         name: 'email type B'
      };

      emailContentList = [emailContentItemA, emailContentItemB];

      emailContentService = TestBed.get(EmailContentService);
      httpMock = TestBed.get(HttpTestingController);
   });

   it('when created will not make the HTTP get call', () => {
      httpMock.expectNone(url);

      httpMock.verify();
   });

   it('when getEmailContents is called will make the HTTP get call for Email Content Items', () => {
      emailContentService.getEmailContents();

      httpMock.expectOne(url).flush(emailContentList);

      httpMock.verify();
   });

   it('when getEmailContents is called, will return an Observable with the emailContentList', () => {
      let emailContentLists: EmailContentItem[];
      emailContentService.getEmailContents().subscribe((groups: EmailContentItem[]) => (emailContentLists = groups));

      httpMock.expectOne(url).flush(emailContentList);

      expect(emailContentLists).toEqual(emailContentList);

      httpMock.verify();
   });
});
