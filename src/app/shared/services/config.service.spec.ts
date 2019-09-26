import { StudyTypes } from './../models/study-types.model';
import { ConfigData } from './../models/config-data.model';
import {
   HttpClientTestingModule,
   HttpTestingController
} from '@angular/common/http/testing';
import { ConfigService } from './config.service';
import { TestBed } from '@angular/core/testing';
import { staticDataUrl } from '../helpers/url.constant';

describe('ConfigService', () => {
   let configService: ConfigService;
   let httpMock: HttpTestingController;
   let data: ConfigData;

   beforeEach(() => {
      TestBed.configureTestingModule({
         providers: [ConfigService],
         imports: [HttpClientTestingModule]
      });

      data = {
         studyTypeId: 0,
         yPrimeLogoPath: 'yprime.png',
         homePageBannerPath: 'banner.png',
         favIconPath: 'fav.ico'
      };

      configService = TestBed.get(ConfigService);
      httpMock = TestBed.get(HttpTestingController);
   });

   it('when created will not make the HTTP call', () => {
      httpMock.expectNone(staticDataUrl);

      httpMock.verify();
   });

   it('when one of the get methods is called will make the HTTP call', () => {
      configService.getFavIconPath();

      httpMock.expectOne(staticDataUrl + '/');

      httpMock.verify();
   });

   it('when getStudyType is called, will return an Observable with the value', () => {
      let studyType: StudyTypes;

      configService.getStudyType().subscribe((type: StudyTypes) => {
         studyType = type;
      });

      httpMock.expectOne(staticDataUrl + '/').flush(data);

      expect(studyType).toEqual(data.studyTypeId as StudyTypes);

      httpMock.verify();
   });

   it('when getYPrimeLogoPath is called, will return an Observable with the value', () => {
      let imageUrl: string;

      configService.getYPrimeLogoPath().subscribe((url: string) => {
         imageUrl = url;
      });

      httpMock.expectOne(staticDataUrl + '/').flush(data);

      expect(imageUrl).toEqual(data.yPrimeLogoPath);

      httpMock.verify();
   });

   it('when getHomePageBannerPath is called, will return an Observable with the value', () => {
      let bannerUrl: string;

      configService.getHomePageBannerPath().subscribe((url: string) => {
         bannerUrl = url;
      });

      httpMock.expectOne(staticDataUrl + '/').flush(data);

      expect(bannerUrl).toEqual(data.homePageBannerPath);

      httpMock.verify();
   });

   it('when getFavIconPath is called, will return an Observable with the value', () => {
      let iconUrl: string;

      configService.getFavIconPath().subscribe((url: string) => {
         iconUrl = url;
      });

      httpMock.expectOne(staticDataUrl + '/').flush(data);

      expect(iconUrl).toEqual(data.favIconPath);

      httpMock.verify();
   });
});
