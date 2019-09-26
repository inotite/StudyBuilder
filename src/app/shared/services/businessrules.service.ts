import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BusinessRuleList } from '../models/business-rule-list.model';
import { Subject, Observable, throwError } from 'rxjs';
import { businessRuleUrl } from '../helpers/url.constant';
import {BusinessRuleItem} from '../models/business-rule-item.model';

@Injectable(({ providedIn: 'root' }) as any)
export class BusinessRuleService {
  private businessRuleURL = businessRuleUrl.endsWith('/') ? businessRuleUrl : businessRuleUrl + '/';
  private businessRuleList = new Subject<BusinessRuleItem[]>();

  constructor(private readonly http: HttpClient) {
  }

  getBusinessRules(): Observable<BusinessRuleItem[]> {
    this.http.get<BusinessRuleItem[]>(this.businessRuleURL)
      .subscribe(
        (businessRuleItems: BusinessRuleItem[]) => this.businessRuleList.next(businessRuleItems),
        this.handleError);

        return this.businessRuleList;
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
