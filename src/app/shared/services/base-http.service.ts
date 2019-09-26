import {Injectable} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {throwError} from 'rxjs';

@Injectable({
   providedIn: 'root'
})
export abstract class BaseHttpService {
   private formattedUrl: string;

   public get url(): string {
      return this.formattedUrl;
   }

   public set url(value: string) {
      this.formattedUrl = value.endsWith('/') ? value : value + '/';
   }

   protected constructor() {}

   protected handleError(error: HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
         console.error('An error occurred:', error.error.message);
      } else {
         console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
      }
      // return an observable with a user-facing error message
      return throwError('Something bad happened; please try again later.');
   }
}
