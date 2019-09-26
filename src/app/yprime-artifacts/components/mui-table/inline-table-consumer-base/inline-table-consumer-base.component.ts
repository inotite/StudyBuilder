import { Component, OnInit } from '@angular/core';
import { ProcessingStatus } from '../processing-status.model';
import { MuiTableStatus } from '../mui-table-status.model';
import { ExceptionService } from 'src/app/yprime-artifacts/services/exception.service';
import { HttpBasicCrudService } from 'src/app/yprime-artifacts/services/http-basic-crud.service';
import { switchMap, map, toArray } from 'rxjs/operators';
import { of, Observable, from } from 'rxjs';
import { MuiTableAction } from '../mui-table-action.model';
import { MuiColumnActionType } from '../mui-table-actionType.model';
import { MuiConfirmationDialog } from '../../mui-confirmation-dialog/mui-confirmation-dialog.model';
import { BaseModel } from 'src/app/yprime-artifacts/models/base.model';
import { DynamicTableData } from '../mui-table-dynamic-data.model';

@Component({
   template: `
      BASE COMPONENT - NO UI NEEDS
   `
})
export class InlineTableConsumerBaseComponent<
   T extends BaseModel<string | number>
> implements OnInit {
   apiUrl: string;
   entityDisplayName = '';
   data: Array<T>;
   dynamicData: Array<DynamicTableData>;
   processingStatus = <ProcessingStatus>{
      status: MuiTableStatus.None
   };
   deleteConfirmationSetting;

   constructor(
      private exceptionService: ExceptionService,
      private readonly httpBasicCrudService: HttpBasicCrudService
   ) {}

   private loadData(): Observable<T[]> {
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
            switchMap(() => this.httpBasicCrudService.get$<T>(this.apiUrl))
         );
      }

      return this.httpBasicCrudService.get$<T>(this.apiUrl);
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
         return this.httpBasicCrudService.update$<T>(
            this.apiUrl,
            action.id,
            action.data
         );
      } else if (action.actionType === MuiColumnActionType.Add) {
         return this.httpBasicCrudService
            .add$<T>(this.apiUrl, action.data, action.isMultiPartForm)
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
