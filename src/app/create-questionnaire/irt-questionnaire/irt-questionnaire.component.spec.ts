import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { IrtQuestionnaireComponent } from './irt-questionnaire.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientModule } from '@angular/common/http';
import { SubmitActionComponent } from '../submit-action/submit-action.component';
import { EmailContentService } from '../../shared/services/emailcontent.service';
import { EmailContentItem } from '../../shared/models/email-content-item.model';
import { TestHelper } from '../../shared/helpers/test.helper';
import { Subject, BehaviorSubject } from 'rxjs';

describe('IrtQuestionnaireComponent', () => {
   let component: IrtQuestionnaireComponent;
   let emailContentService: EmailContentService;
   let fixture: ComponentFixture<IrtQuestionnaireComponent>;
   let emailContents: EmailContentItem[];
   let emailContentStub: Partial<EmailContentService>;
   let emailContentObservable: Subject<EmailContentItem[]>;

   beforeEach(async(() => {
      emailContents = [
         {
            id: 'c3d36544-3440-4baf-92fc-a6957da63e5b',
            name: 'emailContentA'
         },
         {
            id: 'be3a8e1d-a1bb-401a-b99d-2b18047dc4a2',
            name: 'emailContentB'
         }
      ];

      emailContentStub = {
         getEmailContents: () => {
            emailContentObservable = new BehaviorSubject(emailContents);
            return emailContentObservable;
         }
      };

      TestBed.configureTestingModule({
         imports: [DragDropModule, HttpClientModule],
         declarations: [IrtQuestionnaireComponent, SubmitActionComponent],
         providers: [
            {
               provide: EmailContentService,
               useValue: emailContentStub
            }
         ],
         schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      })
         .compileComponents()
         .then(() => {
            fixture = TestBed.createComponent(IrtQuestionnaireComponent);
            component = fixture.componentInstance;
            emailContentService = fixture.debugElement.injector.get(
               EmailContentService
            );
            spyOn(emailContentService, 'getEmailContents').and.callThrough();
         });
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(IrtQuestionnaireComponent);
      component = fixture.componentInstance;
      emailContentService = fixture.debugElement.injector.get(
         EmailContentService
      );
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });

   it('should call to the EmailContentService getEmailContents during OnInit', () => {
      component.ngOnInit();

      expect(emailContentService.getEmailContents).toHaveBeenCalled();
   });

   it('will add the value sent from the Email Content Service to email content list', () => {
      expect(component.emailContentList[0]).toEqual(emailContents[0]);
      expect(component.emailContentList[1]).toEqual(emailContents[1]);
   });

   it('will add all values returned from Email Content Service to email content list', () => {
      expect(component.emailContentList.length).toEqual(emailContents.length);
   });

   it('will unsubscribe from EmailContentService getEmailContents observable in ngOnDestroy', () => {
      let testItems: EmailContentItem[];

      emailContentObservable.subscribe(
         (data: EmailContentItem[]) => (testItems = data)
      );

      component.ngOnInit();
      component.ngOnDestroy();

      // If we successfully unsubscribed within ngOnDestroy, this value won't get assigned
      emailContentObservable.next([]);

      expect(testItems).toEqual(emailContents);
   });

   it('should have a div with the field-wrapper class', () => {
      const element = TestHelper.getElementByCss(
         fixture,
         'div.field-wrapper'
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

   it('will create a ListItem for each item from EmailContentService getEmailContents', () => {
      const items = TestHelper.getAllElementsByCss(fixture, 'mat-option');

      expect(items.length).toEqual(emailContents.length);
   });
});
