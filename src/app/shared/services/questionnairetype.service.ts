import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { QuestionnaireTypeItem } from '../models/questionnaire-type-item.model';
import { Subject, Observable, throwError } from 'rxjs';
import { questionnaireTypeUrl } from '../helpers/url.constant';

@Injectable(({ providedIn: 'root' }) as any)
export class QuestionnaireTypeService {
  private questionnaireTypeUrl = questionnaireTypeUrl.endsWith('/') ? questionnaireTypeUrl : questionnaireTypeUrl + '/';
  private questionnaireTypeList = new Subject<QuestionnaireTypeItem[]>();

  constructor(private readonly http: HttpClient) {
  }

  getQuestionnaireTypes(): Observable<QuestionnaireTypeItem[]> {
    this.http.get<QuestionnaireTypeItem[]>(this.questionnaireTypeUrl)
      .subscribe(
        (questionnaireTypeList: QuestionnaireTypeItem[]) => this.questionnaireTypeList.next(questionnaireTypeList),
        this.handleError);

        return this.questionnaireTypeList;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
}
