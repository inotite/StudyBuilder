import { Injectable } from '@angular/core';
import { studySettingsUrl } from '../helpers/url.constant';
import { Subject, Observable, throwError } from 'rxjs';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { FormField } from 'src/app/yprime-artifacts/models/form-field.model';

@Injectable({
  providedIn: 'root'
})
export class StudySettingsService {
  private studySettingsUrl = studySettingsUrl.endsWith('/') ? studySettingsUrl : studySettingsUrl + '/';
  private studySettingsCollection = new Subject<FormField[]>();

  constructor(private readonly http: HttpClient) { }

  getStudySettingsCollection(section: string, group: string): Observable<FormField[]> {
    this.http
      .get<FormField[]>(this.studySettingsUrl + section + '/' + group + '/')
      .subscribe((studySettingsCollection) => this.studySettingsCollection.next(studySettingsCollection), this.handleError);
    return this.studySettingsCollection;
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
