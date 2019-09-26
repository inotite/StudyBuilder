import { Injectable } from '@angular/core';
import {AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormUtilityService {

  constructor() { }

   public setAsTouched(group: FormGroup | FormArray) {
      group.markAsTouched();
      for (const i in group.controls) {
         if (group.controls[i] instanceof FormControl) {
            const control = group.controls[i];
            control.markAsTouched({onlySelf: true});
            control.updateValueAndValidity();
            if (control) {
            }
         } else {
            this.setAsTouched(group.controls[i]);
         }
      }
   }

   public isFieldValid(group: FormGroup | FormArray, field: string): boolean {
      return (
         !group.get(field).valid &&
         group.get(field).touched &&
         group.get(field).enabled
      );
   }

   public subscribeEnabledStatusToValueChange(form: FormGroup, parentControlName: string, childControlName: string) {
     const parentControl = this.getControl(form, parentControlName);
     const childControl = this.getControl(form, childControlName);

      parentControl.valueChanges.subscribe(value => {
         if (value !== '' && value !== null && value !== false && parentControl.valid) {
            childControl.enable();
            childControl.setValidators([Validators.required]);
         } else {
            childControl.disable();
            childControl.setValue(null);
            parentControl.clearValidators();
         }
         childControl.updateValueAndValidity();
      });
   }

   public validate(form: FormGroup | FormArray, c: AbstractControl, errorMessage: string): ValidationErrors | null {
      return form.valid
         ? null
         : {
            invalidForm: {
               valid: false,
               message: errorMessage
            }
         };
   }

   public getControl(form: FormGroup, controlName: string): AbstractControl {
      return form.controls[controlName];
   }

   public clearFormControls(group: FormGroup | FormArray) {
      group.markAsUntouched();
      group.reset();
   }
}
