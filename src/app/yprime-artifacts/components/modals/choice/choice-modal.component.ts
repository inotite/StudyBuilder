import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MuiTableColumn } from '../../mui-table/mui-table-column.model';
import { MuiTableControlType } from '../../mui-table/mui-table-controlType.model';
import { MuiTableAction } from '../../mui-table/mui-table-action.model';
import { BaseModel } from '../../../models/base.model';
import { MuiColumnActionType } from '../../mui-table/mui-table-actionType.model';
import { MuiOptionChoice } from '../../mui-table/mui-option-choice.model';
import { Guid } from '../../../../shared/helpers/guid.helper';
import { MuiTableStatus } from '../../mui-table/mui-table-status.model';
import { ProcessingStatus } from '../../mui-table/processing-status.model';

@Component({
   selector: 'app-choice-modal',
   templateUrl: './choice-modal.component.html',
   styleUrls: ['./choice-modal.component.scss']
})
export class ChoiceModalComponent<T extends BaseModel<string | number>>
   implements OnInit {
   data: Array<MuiOptionChoice> = [];
   guid: Guid = new Guid();
   processingStatus = <ProcessingStatus>{
      status: MuiTableStatus.None
   };
   columnNames: Array<MuiTableColumn> = [
      <MuiTableColumn>{ id: 'id', isKey: true },
      <MuiTableColumn>{
         id: 'name',
         isVisible: true,
         MuiTableControlType: MuiTableControlType.Text,
         width: 300,
         isRequired: true,
         maxLength: 60,
         canBeAdded: true,
         canBeEdited: true,
         columnDisplayName: 'Choice'
      },
      <MuiTableColumn>{
         id: 'actionPanel',
         isVisible: true,
         columnDisplayName: '',
         MuiTableControlType: MuiTableControlType.DataDrivenActionPanel
      }
   ];

   constructor(
      private dialogRef: MatDialogRef<ChoiceModalComponent<MuiOptionChoice>>,
      @Inject(MAT_DIALOG_DATA) public choices: any
   ) {
      this.data = choices;
   }

   ngOnInit() {}

   onActionClicked(action: MuiTableAction) {
      this.processAction(action);
   }

   processAction(action: MuiTableAction) {
      if (action.actionType === MuiColumnActionType.Delete) {
         this.data = [...this.data.filter(d => d.id !== action.id)];
      } else if (action.actionType === MuiColumnActionType.SaveChanges) {
         this.data = [...this.data.filter(d => d.id !== action.id)];
         this.data = [...this.data, action.data];
      } else if (action.actionType === MuiColumnActionType.Add) {
         action.data.id = this.guid.newGuid();
         const displayOrders = this.data.map(d => d.displayOrder);
         const highestNumber = displayOrders.length
            ? Math.max(...displayOrders)
            : 0;
         action.data.displayOrder = highestNumber + 1;
         this.data = [...this.data, action.data];
      }

      this.processingStatus = <ProcessingStatus>{
         status: MuiTableStatus.Complete,
         notificationActionType: action.actionType,
         notificationMessage: 'action completed'
      };
   }

   updateChoices() {
      this.dialogRef.close(this.data);
   }
}
