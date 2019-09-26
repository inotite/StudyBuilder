import { MenuData } from './../models/menu-data.model';
import { StudyTypes } from './../models/study-types.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { ConfigService } from './config.service';
import { homePageIconUrl } from '../helpers/url.constant';
import { BaseHttpService } from './base-http.service';

@Injectable({ providedIn: 'root' } as any)
export class MenuService extends BaseHttpService {
   private menus = new BehaviorSubject<MenuData>({
      studySetup: [],
      configure: [],
      document: [],
      customize: []
   });
   private studyType: StudyTypes;

   constructor(
      private readonly http: HttpClient,
      private readonly configService: ConfigService
   ) {
      super();
      this.url = homePageIconUrl;
   }

   // Get a collection of Menu objects
   getMenus(): Observable<MenuData> {
      this.getStudyType();

      return this.menus;
   }

   private getStudyType() {
      if (!this.studyType) {
         this.configService.getStudyType().subscribe((type: StudyTypes) => {
            if (type !== this.studyType) {
               this.studyType = type;

               this.findMenus();
            }
         });
      }
   }

   private findMenus() {
      this.http
         .get<MenuData>(this.url + (this.studyType as number))
         .subscribe(
            (menus: MenuData) => this.menus.next(menus),
            this.handleError
         );
   }
}
