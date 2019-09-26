import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {EmailContentItem} from '../models/email-content-item.model';
import {Subject, Observable, throwError} from 'rxjs';
import {emailContentUrl} from '../helpers/url.constant';

@Injectable({providedIn: 'root'} as any)
export class EmailContentService {
   private emailContentUrl = emailContentUrl.endsWith('/') ? emailContentUrl : emailContentUrl + '/';
   private emailContentList = new Subject<EmailContentItem[]>();

   constructor(private readonly http: HttpClient) {}

   getEmailContents(): Observable<EmailContentItem[]> {
      this.http
         .get<EmailContentItem[]>(this.emailContentUrl)
         .subscribe((emailContentList: EmailContentItem[]) => this.emailContentList.next(emailContentList), this.handleError);

      return this.emailContentList;
   }

   private handleError(error: HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
         console.error('An error occurred:', error.error.message);
      } else {
         console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
      }
      // return an observable with a user-facing error message
      return throwError('Something bad happened; please try again later.');
   }
}
