import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SubmitActionComponent } from './submit-action.component';
import { SubmitActionItem } from '../../shared/models/submit-action-item.model';
import { CUSTOM_ELEMENTS_SCHEMA, forwardRef } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Subject, BehaviorSubject } from 'rxjs';
import { SubmitActionService } from '../../shared/services/submitaction.service';
import { TestHelper } from '../../shared/helpers/test.helper';
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
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

describe('SubmitActionComponent', () => {
   let component: SubmitActionComponent;
   let fixture: ComponentFixture<SubmitActionComponent>;
   let submitActionService: SubmitActionService;
   let submitActionStub: Partial<SubmitActionService>;
   let submitActionObservable: Subject<SubmitActionItem[]>;
   let submitActionList: SubmitActionItem[];

   beforeEach(async(() => {
      submitActionList = [
         {
            id: '4316663c-575c-47de-bdbc-37d730890929',
            displayName: 'submit Action B',
            typeName: 'submitActionB',
            successPatientStatusTypeId: 2,
            failurePatientStatusTypeId: 2
         },
         {
            id: '9acd43d3-827a-4a35-8323-7bf5cee367c7',
            displayName: 'submit Action A',
            typeName: 'submitActionA',
            successPatientStatusTypeId: 1,
            failurePatientStatusTypeId: 1
         }
      ];
      submitActionStub = {
         getSubmitActions: () => {
            submitActionObservable = new BehaviorSubject(submitActionList);
            return submitActionObservable;
         }
      };
      TestBed.configureTestingModule({
         imports: [
            DragDropModule,
            HttpClientModule,
            FormsModule,
            ReactiveFormsModule
         ],

         declarations: [SubmitActionComponent],
         providers: [
            {
               provide: SubmitActionService,
               useValue: submitActionStub
            }
         ],
         schemas: [CUSTOM_ELEMENTS_SCHEMA]
      })
         .compileComponents()
         .then(() => {
            fixture = TestBed.createComponent(SubmitActionComponent);
            component = fixture.componentInstance;
            submitActionService = fixture.debugElement.injector.get(
               SubmitActionService
            );
            spyOn(submitActionService, 'getSubmitActions').and.callThrough();
            spyOn(component, 'ngAfterViewInit').and.callThrough();
            spyOn(component, 'transformHtml').and.callThrough();
            fixture.detectChanges();
         });
   }));

   it('should create', () => {
      expect(component).toBeTruthy();
   });

   it('should call to the SubmitActionService getSubmitActions during OnInit', () => {
      component.ngOnInit();

      expect(submitActionService.getSubmitActions).toHaveBeenCalled();
   });

   it('should call ngAfterViewInit once', () => {
      expect(component.ngAfterViewInit).toHaveBeenCalledTimes(1);
   });

   it('should call transformHtml once', () => {
      expect(component.transformHtml).toHaveBeenCalledTimes(4);
   });

   it('should have a div with the submit-action-container class', () => {
      const element = TestHelper.getElementByCss(
         fixture,
         'div.submit-action-container'
      ) as HTMLDivElement;

      expect(element).toBeTruthy();
   });

   it('should have a div with the dragdropArrow class', () => {
      const element = TestHelper.getElementByCss(
         fixture,
         'div.drag-drop-arrow'
      ) as HTMLDivElement;

      expect(element).toBeTruthy();
   });

   it('should have a div with the selected-container class', () => {
      const element = TestHelper.getElementByCss(
         fixture,
         'div.selected-container'
      ) as HTMLDivElement;

      expect(element).toBeTruthy();
   });

   it('should have a div with the submit-action-item-box class', () => {
      const element = TestHelper.getElementByCss(
         fixture,
         'div.submit-action-item-box'
      ) as HTMLDivElement;

      expect(element).toBeTruthy();
   });

   it('should have a div with the submit-action-item-box class', () => {
      const element = TestHelper.getElementByCss(
         fixture,
         'div.submit-action-item-box'
      ) as HTMLDivElement;

      expect(element).toBeTruthy();
   });
});
