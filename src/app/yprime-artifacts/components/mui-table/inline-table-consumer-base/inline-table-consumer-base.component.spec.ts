import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {InlineTableConsumerBaseComponent} from './inline-table-consumer-base.component';
import {BaseModel} from 'src/app/yprime-artifacts/models/base.model';
import {Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {MuiTableColumn} from '../mui-table-column.model';
import {MuiTableControlType} from '../mui-table-controlType.model';
import {PipeHelper} from '../../../pipes/pipe-helper';
import {Title} from '@angular/platform-browser';
import {ExceptionService} from 'src/app/yprime-artifacts/services/exception.service';
import {HttpBasicCrudService} from 'src/app/yprime-artifacts/services/http-basic-crud.service';
import {MuiInlineTableComponent} from '../mui-inline-table/mui-inline-table.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MaterialUIModule} from 'src/app/yprime-artifacts/material-ui/material-ui.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {of, Observable} from 'rxjs';
import {MuiColumnActionType} from '../mui-table-actionType.model';
import {MuiTableAction} from '../mui-table-action.model';
import {MuiConfirmationDialog} from '../../mui-confirmation-dialog/mui-confirmation-dialog.model';

export interface InlineTableTestModel extends BaseModel<string> {
   name: string;
   actionPanel: boolean;
}

@Component({
   template: `
      <app-mui-inline-table
         [data]="data"
         [processingStatus]="processingStatus"
         [deleteConfirmationSetting]="deleteConfirmationSetting"
         (actionClicked)="onActionClicked($event)"
         [columnNames]="columnNames"
      ></app-mui-inline-table>
   `
})
class StandardInlineTableTestComponent extends InlineTableConsumerBaseComponent<InlineTableTestModel> implements OnInit {
   columnNames: Array<MuiTableColumn> = [
      <MuiTableColumn>{id: 'id', isKey: true},
      <MuiTableColumn>{
         id: 'name',
         isVisible: true,
         MuiTableControlType: MuiTableControlType.Text,
         maxLength: 60,
         canBeAdded: true,
         canBeEdited: true,
         columnDisplayName: 'Name'
      },
      <MuiTableColumn>{
         id: 'actionPanel',
         isVisible: true,
         columnDisplayName: '',
         MuiTableControlType: MuiTableControlType.DataDrivenActionPanel
      }
   ];

   constructor(private title: Title, exceptionService: ExceptionService, httpBasicCrudService: HttpBasicCrudService) {
      super(exceptionService, httpBasicCrudService);

      // provide properties for the base component.
      this.apiUrl = 'fakeApiNOURL';
      this.entityDisplayName = 'Standard Inline Table Test';
   }

   ngOnInit() {
      this.title.setTitle('Standard Inline Table Test');
      super.ngOnInit();
   }
}

describe('Standard Inline Table Test Component', () => {
   let component: StandardInlineTableTestComponent;
   let fixture: ComponentFixture<StandardInlineTableTestComponent>;
   const crudServiceStub: any = {};
   const inlineTableTestModel = [
      {
         id: 'c3d36544-3440-4baf-92fc-a6957da63e5b',
         name: 'TestA',
         actionPanel: false
      },
      {
         id: 'c3d36544-3440-4baf-92fc-a6957da63e5b',
         name: 'TestB',
         actionPanel: false
      }
   ];

   beforeEach(() => {
      crudServiceStub.get$ = jasmine.createSpy('get$').and.callFake(() => of(inlineTableTestModel));
      crudServiceStub.update$ = jasmine.createSpy('update$').and.callFake((row: InlineTableTestModel) => of(new Observable<boolean>()));
      crudServiceStub.add$ = jasmine
         .createSpy('add$')
         .and.callFake((row: InlineTableTestModel) => of(new Observable<InlineTableTestModel>()));
      crudServiceStub.delete$ = jasmine.createSpy('delete$').and.callFake((id: String) => of(new Observable<boolean>()));
   });

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         imports: [FormsModule, ReactiveFormsModule, HttpClientTestingModule, MaterialUIModule, BrowserAnimationsModule],
         declarations: [InlineTableConsumerBaseComponent, MuiInlineTableComponent, PipeHelper, StandardInlineTableTestComponent],
         providers: [
            {
               provide: HttpBasicCrudService,
               useValue: crudServiceStub
            }
         ],
         schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(StandardInlineTableTestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });

   it('should validate that key is specified in the configured columnNames', () => {
      expect(component.columnNames).toBeDefined();
      expect(component.columnNames.filter(c => c.isKey === true).length).toBe(1);
   });

   it('should validate that apiUrl is provided', () => {
      expect(component.apiUrl).toBeDefined();
   });

   it('should call stub service get method when page initializes', () => {
      expect(crudServiceStub.get$).toHaveBeenCalledTimes(1);
   });

   it('should call stub service update method when record is edited', () => {
      const action$ = spyOn(component, 'processAction$').and.callThrough();

      const editAction: MuiTableAction = {
         id: 'b3d36555-3440-4baf-92fc-a6957da63e5b',
         data: {},
         actionType: MuiColumnActionType.SaveChanges,
         isMultiPartForm: false
      };

      component.onActionClicked(editAction);

      expect(action$).toHaveBeenCalledWith(editAction);
      expect(crudServiceStub.update$).toHaveBeenCalled();
   });

   it('should call stub service add method when record is added', () => {
      const action$ = spyOn(component, 'processAction$').and.callThrough();
      const addAction: MuiTableAction = {
         id: 'b3d36555-3440-4baf-92fc-a6957da63e5b',
         data: {},
         actionType: MuiColumnActionType.Add,
         isMultiPartForm: false
      };

      component.onActionClicked(addAction);
      expect(action$).toHaveBeenCalledWith(addAction);
      expect(crudServiceStub.add$).toHaveBeenCalled();
   });

   it('should call stub service delete method when record is deleted', () => {
      const action$ = spyOn(component, 'processAction$').and.callThrough();
      const deleteAction: MuiTableAction = {
         id: 'b3d36555-3440-4baf-92fc-a6957da63e5b',
         data: {},
         actionType: MuiColumnActionType.Delete,
         isMultiPartForm: false
      };

      component.onActionClicked(deleteAction);
      expect(action$).toHaveBeenCalledWith(deleteAction);
      expect(crudServiceStub.delete$).toHaveBeenCalled();
   });

   it('should match the delete confirmation setting for Standard Inline Table Test component', () => {
      const deleteConfirmationSetting = <MuiConfirmationDialog>{
         title: 'Confirmation',
         message: 'The Standard Inline Table Test will be deleted from this study. Are you sure you want to delete?',
         yesButtonTitle: 'Yes',
         noButtonTitle: 'No'
      };
      expect(component.deleteConfirmationSetting).toEqual(deleteConfirmationSetting);
   });
});
