import {Component, forwardRef, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule} from '@angular/forms';


export function MakeProvider(type: any) {
   return {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => type),
      multi: true
   };
}

@Component({
   selector: 'app-true-false-radio-group',
   templateUrl: './true-false-radio-group.component.html',
   styleUrls: ['./true-false-radio-group.component.scss'],
   providers: [MakeProvider(TrueFalseRadioGroupComponent)]
})
export class TrueFalseRadioGroupComponent implements OnInit, ControlValueAccessor {
   private val: boolean;
   public isDisabled: boolean;
   get value(): boolean {
      return this.val;
   }
   set value(v: boolean) {
      if (v !== this.val) {
         this.val = v;
         this.onChange(v);
      }
   }

   constructor() {}

   ngOnInit() {}

   onChange = (v: boolean) => {};
   onTouched = () => {};

   registerOnChange(fn: any): void {
      this.onChange = fn;
   }

   registerOnTouched(fn: any): void {
      this.onTouched = fn;
   }

   setDisabledState(isDisabled: boolean): void {
      this.isDisabled = isDisabled;
   }

   writeValue(obj: boolean): void {
      this.val = obj;
      this.onChange(obj);
   }
}
