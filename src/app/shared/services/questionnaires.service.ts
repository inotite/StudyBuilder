import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Questionnaire} from '../models/questionnaire.model';
import {Observable, Subject} from 'rxjs';
import {questionnaireUrl} from '../helpers/url.constant';
import {BaseHttpService} from './base-http.service';

@Injectable({providedIn: 'root'} as any)
export class QuestionnairesService extends BaseHttpService {
   private questionnaireList = new Subject<Questionnaire[]>();
   private cancelQuestionnaireSubject = new Subject<any>();
   currentQuestionnaireList = new Subject<Questionnaire[]>();

   constructor(private readonly http: HttpClient) {
      super();
      this.url = questionnaireUrl;
   }

   getQuestionnaireListItems(): Observable<Questionnaire[]> {
      this.http
         .get<Questionnaire[]>(this.url)
         .subscribe((questionnaireList: Questionnaire[]) => this.questionnaireList.next(questionnaireList), this.handleError);

      return this.questionnaireList;
   }

   updateCurrentQuestionnaireList(updatedList: Questionnaire[]) {
      this.currentQuestionnaireList.next(updatedList);
   }

   cancelQuestionnaire() {
      this.cancelQuestionnaireSubject.next();
   }

   cancelQuestionnaireSubscription(): Observable<any> {
      return this.cancelQuestionnaireSubject.asObservable();
   }
}
