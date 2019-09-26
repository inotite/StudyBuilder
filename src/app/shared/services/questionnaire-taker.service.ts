import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {QuestionnaireTaker} from '../models/questionnaire-taker.model';
import {questionnaireTakerTypeUrl} from '../helpers/url.constant';
import {HttpClient} from '@angular/common/http';
import {BaseHttpService} from './base-http.service';

@Injectable({
   providedIn: 'root'
})
export class QuestionnaireTakerService extends BaseHttpService {
   private questionnaireTakers = new Subject<QuestionnaireTaker[]>();

   constructor(private http: HttpClient) {
      super();
      this.url = questionnaireTakerTypeUrl;
   }

   getTakers(): Observable<QuestionnaireTaker[]> {
      this.http
         .get<QuestionnaireTaker[]>(this.url)
         .subscribe((data: QuestionnaireTaker[]) => this.questionnaireTakers.next(data), this.handleError);

      return this.questionnaireTakers;
   }
}
