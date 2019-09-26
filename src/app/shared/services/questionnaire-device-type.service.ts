import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { questionnaireDeviceTypeUrl } from '../helpers/url.constant';
import { QuestionnaireDeviceType } from '../models/questionnaire-device-type.model';
import { Observable, Subject } from 'rxjs';
import { BaseHttpService } from './base-http.service';

@Injectable({ providedIn: 'root' } as any)
export class QuestionnaireDeviceTypeService extends BaseHttpService {
   private questionnaireDeviceTypes = new Subject<QuestionnaireDeviceType[]>();

   constructor(private http: HttpClient) {
      super();
      this.url = questionnaireDeviceTypeUrl;
   }

   getQuestionnaireDeviceTypes(): Observable<QuestionnaireDeviceType[]> {
      this.http
         .get<QuestionnaireDeviceType[]>(this.url)
         .subscribe(
            (data: QuestionnaireDeviceType[]) =>
               this.questionnaireDeviceTypes.next(data),
            this.handleError
         );

      return this.questionnaireDeviceTypes;
   }
}
