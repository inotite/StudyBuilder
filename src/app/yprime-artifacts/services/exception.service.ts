import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiError } from '../models/apiError.model';

@Injectable({
  providedIn: 'root'
})
export class ExceptionService {

  constructor() { }

  private getErrorDetails(errors: ApiError[]): string {
    // parse details only, exclude Id related model state errors from api, research why they are showing up.
    let errorMessage = '';

    errors.forEach((item, index) => {
      const matches = item.details && item.details.filter(c => c.code !== 'Id');
      errorMessage += `${(index > 0) ? ' , ' : ''}${(item.target) ? item.target + ' : ' : ''}${item.message}`;
      if (matches && matches.length > 0) {
        errorMessage += ', ' + this.getErrorDetails(matches);
      }
    });
    return errorMessage;
  }

  getUserDisplayMessage(err): string {
    let errorMessage = '';
    if (err instanceof HttpErrorResponse) {
      // A client-side or network error occurred. Handle it accordingly.
      const errors = err.error as ApiError[];
      if (errors instanceof Array && errors.length > 0) {
        errorMessage = this.getErrorDetails(errors);
      } else {
        errorMessage = `Api returned ${err.status}: ${err.statusText}`;
      }
    } else if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Api returned ${err.status}: ${err.body.error}`;
    }

    return errorMessage;
  }
}
