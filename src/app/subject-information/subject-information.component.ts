import { Component, OnInit, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MuiTableColumn } from '../yprime-artifacts/components/mui-table/mui-table-column.model';
import { MuiTableControlType } from '../yprime-artifacts/components/mui-table/mui-table-controlType.model';
import { ExceptionService } from '../yprime-artifacts/services/exception.service';
// tslint:disable-next-line:max-line-length
import { InlineTableConsumerBaseComponent } from '../yprime-artifacts/components/mui-table/inline-table-consumer-base/inline-table-consumer-base.component';
import { HttpBasicCrudService } from '../yprime-artifacts/services/http-basic-crud.service';
import { MuiTableColumnSource } from '../yprime-artifacts/components/mui-table/mui-table-column-source.model';
import { SetupService } from '../shared/services/setup.service';
import { DynamicTableData } from '../yprime-artifacts/components/mui-table/mui-table-dynamic-data.model';
import { SubjectInformation } from '../shared/models/subject-information.model';
import { BusinessRuleService } from '../shared/services/businessrules.service';
import { Observable, from, of } from 'rxjs';
import { MuiDynamicColumnSchema } from '../yprime-artifacts/components/mui-table/mui-dynamic-column-schema.model';
import { MuiDynamicTableColumn } from '../yprime-artifacts/components/mui-table/mui-dynamic-table-column.model';
import { subjectAttributeUrl } from '../shared/helpers/url.constant';
import { ProcessingStatus } from '../yprime-artifacts/components/mui-table/processing-status.model';
import { MuiTableStatus } from '../yprime-artifacts/components/mui-table/mui-table-status.model';
import { map, switchMap } from 'rxjs/operators';
import { MuiTableAction } from '../yprime-artifacts/components/mui-table/mui-table-action.model';
import { MuiColumnActionType } from '../yprime-artifacts/components/mui-table/mui-table-actionType.model';
import { MuiConfirmationDialog } from '../yprime-artifacts/components/mui-confirmation-dialog/mui-confirmation-dialog.model';

@Component({
   selector: 'app-subject-information',
   templateUrl: './subject-information.component.html',
   styleUrls: ['./subject-information.component.scss']
})
export class SubjectInformationComponent implements OnInit {
   // columnNames remain in dervied class, as the data source for dropdowns can be from various sources
   // and we can accept array as dataSource, the dervied component assumes this responsiblity.
   // Offloading to base can violate S-of-SOLID.
   apiUrl: string;
   entityDisplayName = '';
   data: Array<SubjectInformation>;
   dynamicData: Array<DynamicTableData>;
   processingStatus = <ProcessingStatus>{
      status: MuiTableStatus.None
   };
   deleteConfirmationSetting;
   dynamicColumnSchema: MuiDynamicColumnSchema[];
   columnNames: Array<MuiDynamicTableColumn> = [
      <MuiDynamicTableColumn>{ id: 'id', isVisible: false, isKey: true },
      <MuiDynamicTableColumn>{
         id: 'choiceType',
         isVisible: true,
         canBeAdded: true,
         canBeEdited: false,
         isRequired: true,
         columnDisplayName: 'Choice Type',
         width: 174,
         MuiTableControlType: MuiTableControlType.SingleDropdown,
         isColumnReferenceSchema: true,
         columnDataSource: <MuiTableColumnSource>{
            idKeyName: 'id',
            textKeyName: 'id',
            columnId: 'choiceType',
            syncOnAction: false,
            staticDataSource: this.getDynamicColumnSchema$(),
            syncSourceIndex: 1
         }
      },
      <MuiDynamicTableColumn>{
         id: 'name',
         isVisible: true,
         canBeAdded: true,
         canBeEdited: true,
         isRequired: true,
         columnDisplayName: 'Name',
         maxLength: 120,
         width: 162,
         MuiTableControlType: MuiTableControlType.Text
      },
      <MuiDynamicTableColumn>{
         id: 'businessRuleName',
         isVisible: true,
         canBeAdded: true,
         canBeEdited: true,
         isRequired: false,
         columnDisplayName: 'Business Rule',
         width: 174,
         MuiTableControlType: MuiTableControlType.SingleDropdown,
         columnDataSource: <MuiTableColumnSource>{
            idKeyName: 'id',
            textKeyName: 'name',
            columnId: 'businessRuleId',
            syncOnAction: false,
            staticDataSource: this.setupService.getBusinessRules$(),
            syncSourceIndex: -1
         }
      },
      <MuiDynamicTableColumn>{
         id: 'countries',
         isVisible: true,
         canBeAdded: true,
         canBeEdited: true,
         isRequired: true,
         width: 174,
         MuiTableControlType: MuiTableControlType.MultiChoiceDropdown,
         columnDisplayName: 'Countries',
         columnDataSource: <MuiTableColumnSource>{
            idKeyName: 'id',
            textKeyName: 'name',
            columnId: 'countries',
            syncOnAction: false,
            staticDataSource: this.setupService.getStudyCountries$(),
            syncSourceIndex: -1
         }
      },
      <MuiDynamicTableColumn>{
         id: 'min',
         isVisible: true,
         canBeAdded: true,
         canBeEdited: true,
         isRequired: true,
         width: 50,
         columnDisplayName: 'Min',
         MuiTableControlType: MuiTableControlType.Text
      },
      <MuiDynamicTableColumn>{
         id: 'max',
         isVisible: true,
         canBeAdded: true,
         canBeEdited: true,
         isRequired: true,
         width: 50,
         columnDisplayName: 'Max',
         MuiTableControlType: MuiTableControlType.Text
      },
      <MuiDynamicTableColumn>{
         id: 'disableNumeric',
         isVisible: true,
         canBeAdded: true,
         canBeEdited: true,
         width: 50,
         isRequired: false,
         columnDisplayName: 'Disable Numeric',
         MuiTableControlType: MuiTableControlType.Slider
      },
      <MuiDynamicTableColumn>{
         id: 'choices',
         isVisible: true,
         canBeAdded: true,
         canBeEdited: true,
         isRequired: true,
         columnDisplayName: 'Choices',
         MuiTableControlType: MuiTableControlType.ModalChoice,
         columnDataSource: <MuiTableColumnSource>{
            idKeyName: 'id',
            textKeyName: 'name',
            columnId: 'choices'
         }
      },
      <MuiDynamicTableColumn>{
         id: 'dateFormat',
         isVisible: true,
         canBeAdded: true,
         canBeEdited: true,
         isRequired: true,
         width: 110,
         columnDisplayName: 'Date Format',
         MuiTableControlType: MuiTableControlType.Text
      },
      <MuiDynamicTableColumn>{
         id: 'decimal',
         isVisible: true,
         canBeAdded: true,
         canBeEdited: true,
         isRequired: true,
         width: 75,
         columnDisplayName: 'Decimal',
         MuiTableControlType: MuiTableControlType.Text
      },
      <MuiDynamicTableColumn>{
         id: 'suffix',
         isVisible: true,
         canBeAdded: true,
         canBeEdited: true,
         width: 75,
         isRequired: false,
         columnDisplayName: 'Suffix',
         MuiTableControlType: MuiTableControlType.Text
      },
      <MuiDynamicTableColumn>{
         id: 'actionPanel',
         isVisible: true,
         columnDisplayName: '',
         MuiTableControlType: MuiTableControlType.DataDrivenActionPanel
      }
   ];

   constructor(
      private title: Title,
      private setupService: SetupService,
      private businessRuleService: BusinessRuleService,
      private exceptionService: ExceptionService,
      private readonly httpBasicCrudService: HttpBasicCrudService
   ) {
      // set title here to esure it can be tested
      this.title.setTitle('Subject Information');
      this.entityDisplayName = 'Subject Information';
      this.apiUrl = subjectAttributeUrl;
      this.dynamicData = [];
      this.dynamicColumnSchema = [
         {
            id: 'Radio Button',
            columnSchema: ['name', 'choices', 'businessRuleName', 'countries']
         },
         {
            id: 'Free Text',
            columnSchema: [
               'name',
               'min',
               'max',
               'businessRuleName',
               'disableNumeric',
               'countries'
            ]
         },
         {
            id: 'Date Spinner',
            columnSchema: [
               'name',
               'dateFormat',
               'min',
               'max',
               'businessRuleName',
               'countries'
            ]
         },
         {
            id: 'Number Spinner',
            columnSchema: [
               'name',
               'decimal',
               'suffix',
               'min',
               'max',
               'businessRuleName',
               'countries'
            ]
         }
      ];
   }

   private getDynamicColumnSchema$(): Observable<MuiDynamicColumnSchema[]> {
      return Observable.create(observer => {
         observer.next(this.dynamicColumnSchema);
         observer.complete();
      });
   }

   private loadData(): Observable<SubjectInformation[]> {
      if (this.dynamicData && this.dynamicData.length > 0) {
         const arrayObservables = this.dynamicData.map(
            m => m.dynamicDataSource
         );
         return from(arrayObservables).pipe(
            map((res, index) => {
               res.subscribe(d => {
                  this.dynamicData[index].data = d;
               });
            }),
            switchMap(() =>
               this.httpBasicCrudService.get$<SubjectInformation>(this.apiUrl)
            )
         );
      }

      return this.httpBasicCrudService.get$<SubjectInformation>(this.apiUrl);
   }

   private initialize() {
      this.deleteConfirmationSetting = this.getDeleteConfirmationSetting();

      this.processingStatus = <ProcessingStatus>{
         status: MuiTableStatus.Processing,
         notificationMessage: ''
      };

      this.loadData().subscribe(
         res => {
            this.data = res;
            this.processingStatus.status = MuiTableStatus.Complete;
         },
         err => {
            this.processingStatus = <ProcessingStatus>{
               status: MuiTableStatus.ProcessingError,
               notificationMessage: this.exceptionService.getUserDisplayMessage(
                  err
               )
            };
         }
      );
   }

   ngOnInit() {
      if (this.apiUrl) {
         this.initialize();
      } else {
         this.processingStatus = <ProcessingStatus>{
            status: MuiTableStatus.ProcessingError,
            notificationMessage: 'Configuration Error - Api Url is required.'
         };
      }
   }

   processAction$(action: MuiTableAction) {
      if (action.actionType === MuiColumnActionType.Delete) {
         return this.httpBasicCrudService.delete$(this.apiUrl, action.id);
      } else if (action.actionType === MuiColumnActionType.SaveChanges) {
         return this.httpBasicCrudService.update$<SubjectInformation>(
            `${this.apiUrl}/${action.data['choiceType'].replace(/\s/g, '')}`,
            action.id,
            action.data
         );
      } else if (action.actionType === MuiColumnActionType.Add) {
         const url = `${this.apiUrl}/${action.data['choiceType'].replace(
            /\s/g,
            ''
         )}`;
         return this.httpBasicCrudService
            .add$<SubjectInformation>(url, action.data, action.isMultiPartForm)
            .pipe(switchMap(() => of(true)));
      }
   }

   // This will allow derived class to override and provide a customized message.
   protected getDeleteConfirmationSetting(): MuiConfirmationDialog {
      return <MuiConfirmationDialog>{
         title: 'Confirmation',
         message: `The ${
            this.entityDisplayName
         } will be deleted from this study. Are you sure you want to delete?`,
         yesButtonTitle: 'Yes',
         noButtonTitle: 'No'
      };
   }
   // This will allow derived class to override and provide a customized message.
   protected getOperationMessage(actionType: MuiColumnActionType): string {
      return actionType === MuiColumnActionType.Add
         ? 'added'
         : actionType === MuiColumnActionType.Delete
         ? 'deleted'
         : 'saved';
   }

   onActionClicked(action: MuiTableAction) {
      this.processingStatus.status = MuiTableStatus.Processing;
      const opMessage = this.getOperationMessage(action.actionType);
      this.processAction$(action)
         .pipe(
            map(res => {
               this.processingStatus = <ProcessingStatus>{
                  status: MuiTableStatus.Complete,
                  notificationActionType: action.actionType,
                  notificationMessage:
                     this.entityDisplayName + ' successfully ' + opMessage
               };
            }),
            switchMap(() => this.loadData())
         )
         .subscribe(
            res => {
               this.data = res;
            },
            err => {
               this.processingStatus = <ProcessingStatus>{
                  status: MuiTableStatus.ProcessingError,
                  notificationActionType: action.actionType,
                  notificationMessage: this.exceptionService.getUserDisplayMessage(
                     err
                  )
               };
            }
         );
   }
}
