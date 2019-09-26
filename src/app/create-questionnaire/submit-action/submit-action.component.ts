import {
   Component,
   OnInit,
   AfterViewInit,
   ViewChild,
   ElementRef,
   Renderer2,
   forwardRef
} from '@angular/core';
import {
   CdkDragDrop,
   moveItemInArray,
   transferArrayItem
} from '@angular/cdk/drag-drop';
import { SubmitActionService } from '../../shared/services/submitaction.service';
import { SubmitActionItem } from '../../shared/models/submit-action-item.model';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import {
   ControlValueAccessor,
   FormControl,
   NG_VALUE_ACCESSOR,
   NG_VALIDATORS,
   FormGroup,
   Validator,
   Validators,
   AbstractControl,
   ValidationErrors,
   FormArray
} from '@angular/forms';

@Component({
   selector: 'app-submit-action',
   templateUrl: './submit-action.component.html',
   styleUrls: ['./submit-action.component.scss'],
   providers: [
      {
         provide: NG_VALUE_ACCESSOR,
         useExisting: forwardRef(() => SubmitActionComponent),
         multi: true
      },
      {
         provide: NG_VALIDATORS,
         useExisting: forwardRef(() => SubmitActionComponent),
         multi: true
      }
   ]
})
export class SubmitActionComponent
   implements OnInit, AfterViewInit, ControlValueAccessor, Validator {
   @ViewChild('actionListContainer') listContainerView: ElementRef;
   @ViewChild('selectedListContainer') selectedContainerView: ElementRef;
   submitActionList: SubmitActionItem[];
   submitActionListSelected: SubmitActionItem[];
   containerHeight: number;

   public submitActionForm: FormGroup = new FormGroup({
      submitActionList: new FormControl(['']),
      submitActionListSelected: new FormControl([''])
   });

   private unsubscribe = new Subject<void>();

   constructor(
      private submitActionService: SubmitActionService,
      private sanitizer: DomSanitizer,
      private renderer: Renderer2
   ) {}

   ngOnInit() {
      this.submitActionService
         .getSubmitActions()
         .pipe(takeUntil(this.unsubscribe))
         .subscribe(
            (data: SubmitActionItem[]) => (this.submitActionList = data)
         );

      this.submitActionListSelected = [];
   }

   transformHtml(asset: string) {
      return this.sanitizer.bypassSecurityTrustHtml(`<img src="${asset}"/>`);
   }

   ngAfterViewInit() {
      if (this.listContainerView && this.selectedContainerView) {
         setTimeout(() => {
            this.setContainerSizes();
         }, 300);
      }
   }

   drop(event: CdkDragDrop<string[]>) {
      if (event.previousContainer === event.container) {
         moveItemInArray(
            event.container.data,
            event.previousIndex,
            event.currentIndex
         );
      } else {
         transferArrayItem(
            event.previousContainer.data,
            event.container.data,
            event.previousIndex,
            event.currentIndex
         );
      }

      this.submitActionForm.controls['submitActionListSelected'].setValue(
         event.container.data
      );
   }

   private setContainerSizes(): void {
      const height = `${this.listContainerView.nativeElement.offsetHeight}px`;
      const width = `${this.listContainerView.nativeElement.offsetWidth}px`;
      this.renderer.setStyle(
         this.selectedContainerView.nativeElement,
         'height',
         height
      );
      this.renderer.setStyle(
         this.selectedContainerView.nativeElement,
         'width',
         width
      );
      this.renderer.setStyle(
         this.listContainerView.nativeElement,
         'height',
         height
      );
      this.renderer.setStyle(
         this.listContainerView.nativeElement,
         'width',
         width
      );
   }

   public onTouched: () => void = () => {};

   writeValue(val: any): void {
      val && this.submitActionForm.setValue(val, { emitEvent: false });
   }
   registerOnChange(fn: any): void {
      this.submitActionForm.valueChanges.subscribe(fn);
   }
   registerOnTouched(fn: any): void {
      this.onTouched = fn;
   }
   setDisabledState?(isDisabled: boolean): void {
      isDisabled
         ? this.submitActionForm.disable()
         : this.submitActionForm.enable();
   }

   validate(c: AbstractControl): ValidationErrors | null {
      return this.submitActionForm.valid
         ? null
         : {
              invalidForm: {
                 valid: false,
                 message: 'irtQuestionnaireForm fields are invalid'
              }
           };
   }

   setControlsAsTouched() {
      this.setAsTouched(this.submitActionForm);
   }

   setAsTouched(group: FormGroup | FormArray) {
      group.markAsTouched();
      for (const i in group.controls) {
         if (group.controls[i] instanceof FormControl) {
            group.get(i).markAsTouched({ onlySelf: true });
            group.get(i).updateValueAndValidity();
         } else {
            this.setAsTouched(group.controls[i]);
         }
      }
   }

   clearForm() {
      this.clearFormControls(this.submitActionForm);
   }

   clearFormControls(group: FormGroup | FormArray) {
      group.markAsUntouched();
      group.reset();
   }
}
