import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { SubmitActionItem } from '../models/submit-action-item.model';
import { Subject, Observable, throwError } from 'rxjs';
import { submitActionUrl } from '../helpers/url.constant';

@Injectable(({ providedIn: 'root' }) as any)
export class SubmitActionService {
  private submitActionUrl = submitActionUrl.endsWith('/') ? submitActionUrl : submitActionUrl + '/';
  private submitActionList = new Subject<SubmitActionItem[]>();

  constructor(private readonly http: HttpClient) {
  }

  getSubmitActions(): Observable<SubmitActionItem[]> {
    this.http.get<SubmitActionItem[]>(this.submitActionUrl)
      .subscribe(
        (SubmitActionList: SubmitActionItem[]) => this.submitActionList.next(SubmitActionList),
        this.handleError);

        return this.submitActionList;
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
