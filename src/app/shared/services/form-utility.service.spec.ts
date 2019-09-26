import { TestBed } from '@angular/core/testing';

import { FormUtilityService } from './form-utility.service';
import {FormControl, FormGroup} from '@angular/forms';

describe('FormUtilityService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
     const service: FormUtilityService = TestBed.get(FormUtilityService);
    expect(service).toBeTruthy();
  });

  it('should set all controls as touched in a form', () => {
     const service: FormUtilityService = TestBed.get(FormUtilityService);
     const form = new FormGroup({
        control1: new FormControl(),
        control2: new FormControl()
     });

     service.setAsTouched(form);
     expect(form.touched).toBeTruthy();
     expect((form.get('control1') as FormControl).touched).toBeTruthy();
     expect((form.get('control2') as FormControl).touched).toBeTruthy();
  });

  it('should return false when a field is disabled', () => {
     const service: FormUtilityService = TestBed.get(FormUtilityService);
     const ctrl1 = new FormControl();
     ctrl1.disable();
     ctrl1.markAsTouched();
     const form = new FormGroup({
        control1: ctrl1
     });
     expect(service.isFieldValid(form, 'control1')).toBeFalsy();
  });
});
