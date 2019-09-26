import {Injectable} from '@angular/core';
import {HttpHeaders, HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';

@Injectable({
   providedIn: 'root'
})
export class HttpBasicCrudService {
   constructor(private readonly http: HttpClient) {}

   private getHttpHeaders(): HttpHeaders {
      const headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');
      return headers;
   }

   private getMultiPartFormHeaders(): HttpHeaders {
      const headers = new HttpHeaders();
      headers.append('Content-Type', 'multipart/form-data');
      return headers;
   }

   get$<T>(url: string): Observable<T[]> {
      return this.http.get<T[]>(url, {headers: this.getHttpHeaders()});
   }

   getData$<T>(url: string): Observable<T> {
      return this.http.get<T>(url, {headers: this.getHttpHeaders()});
   }

   getById$<T>(url: string, id: string | number): Observable<T> {
      return this.http.get<T>(`${url}/${id}`, {headers: this.getHttpHeaders()});
   }

   add$<T>(url: string, row: T, isMultiPartForm: boolean = false): Observable<T> {
      if (isMultiPartForm) {
         const data = this.convertToFormData(row);
         return this.http.post<any>(url, data, {headers: this.getMultiPartFormHeaders()});
      } else {
         return this.http.post<T>(url, row, {headers: this.getHttpHeaders()});
      }
   }

   update$<T>(url: string, id: string | number, row: T): Observable<boolean> {
      return this.http.put<boolean>(`${url}/${id}`, row, {headers: this.getHttpHeaders()});
   }

   delete$(url: string, id: string | number): Observable<boolean> {
      return this.http.delete<boolean>(`${url}/${id}`, {headers: this.getHttpHeaders()});
   }

   private convertToFormData<T>(row: T) {
      const form_data = new FormData();
      const keys = Object.keys(row);
      for (const key of keys) {
         form_data.append(key, row[key]);
      }

      return form_data;
   }
}
