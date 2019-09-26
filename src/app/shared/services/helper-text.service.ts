import { Injectable } from '@angular/core';
import { HelperText } from '../models/helper-text.model';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelperTextService {

  private subject = new Subject<any>();

  setHelperText(helperText: HelperText) {
    this.subject.next({ helperText });
  }

  getHelperText(): Observable<any> {
    return this.subject.asObservable();
  }
}
