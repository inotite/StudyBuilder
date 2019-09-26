import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
   BehaviorSubject,
   Observable,
   Subject,
   Subscription,
   throwError
} from 'rxjs';

import { ConfigData } from '../models/config-data.model';
import { StudyTypes } from '../models/study-types.model';
import { staticDataUrl, saveStudyCustomUrl } from '../helpers/url.constant';
import { BaseHttpService } from './base-http.service';

@Injectable({ providedIn: 'root' } as any)
export class ConfigService extends BaseHttpService {
   private urlSubscription: Subscription;
   private studyTypeSubject = new BehaviorSubject<StudyTypes>(
      StudyTypes.Unified
   );
   private yPrimeLogoSubject = new BehaviorSubject<string>('');
   private homePageBannerSubject = new BehaviorSubject<string>('');
   private favIconSubject = new BehaviorSubject<string>('');
   private studyTypeId: StudyTypes;
   private yPrimeLogoPath: string;
   private homePageBannerPath: string;
   private favIconPath: string;

   constructor(private readonly http: HttpClient) {
      super();
      this.url = staticDataUrl;
   }

   getStudyType(): Observable<StudyTypes> {
      if (!this.urlSubscription) {
         this.getData();
      }

      return this.studyTypeSubject;
   }

   getYPrimeLogoPath(): Observable<string> {
      if (!this.urlSubscription) {
         this.getData();
      }

      return this.yPrimeLogoSubject;
   }

   getHomePageBannerPath(): Observable<string> {
      if (!this.urlSubscription) {
         this.getData();
      }

      return this.homePageBannerSubject;
   }

   getFavIconPath(): Observable<string> {
      if (!this.urlSubscription) {
         this.getData();
      }

      return this.favIconSubject;
   }

   setStudyType(studyType: StudyTypes) {
      this.http
         .put(saveStudyCustomUrl + studyType, {})
         .subscribe(
            () => this.updateStudyType(studyType),
            this.handleError
         );
   }

   private getData() {
      if (this.urlSubscription) {
         this.urlSubscription.unsubscribe();
      }

      this.urlSubscription = this.http
         .get<ConfigData>(this.url)
         .subscribe((data: ConfigData) => {
            this.updateStudyType(data.studyTypeId as StudyTypes);
            this.updateYPrimeLogoPath(data.yPrimeLogoPath);
            this.updateHomePageBannerPath(data.homePageBannerPath);
            this.updateFavIconPath(data.favIconPath);
         }, this.handleError);
   }

   private updateStudyType(type: StudyTypes) {
      if (this.studyTypeId !== type) {
         this.studyTypeId = type;
         this.studyTypeSubject.next(type);
      }
   }

   private updateYPrimeLogoPath(path: string) {
      if (this.yPrimeLogoPath !== path) {
         this.yPrimeLogoPath = path;
         this.yPrimeLogoSubject.next(path);
      }
   }

   private updateHomePageBannerPath(path: string) {
      if (this.homePageBannerPath !== path) {
         this.homePageBannerPath = path;
         this.homePageBannerSubject.next(path);
      }
   }

   private updateFavIconPath(path: string) {
      if (this.favIconPath !== path) {
         this.favIconPath = path;
         this.favIconSubject.next(path);
      }
   }
}
