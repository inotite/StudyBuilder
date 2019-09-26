import {
   Component,
   OnInit,
   ViewChild,
   ChangeDetectionStrategy,
   Input,
   OnChanges,
   SimpleChanges,
   ChangeDetectorRef,
   Output,
   EventEmitter
} from '@angular/core';

import {
   MatSort,
   MatTableDataSource,
   Sort,
   MatPaginator,
   MatSnackBar,
   MatDialog,
   MatDialogConfig,
   MatSlideToggleChange
} from '@angular/material';
import { MuiTableColumn } from '../mui-table-column.model';
import { MuiTableStatus } from '../mui-table-status.model';
import { MuiTableAction } from '../mui-table-action.model';
import { MuiColumnActionType } from '../mui-table-actionType.model';
import { MuiTableControlType } from '../mui-table-controlType.model';
import { NgForm, NgModel } from '@angular/forms';
import { ProcessingStatus } from '../processing-status.model';
import { MuiConfirmationDialogComponent } from '../../mui-confirmation-dialog/mui-confirmation-dialog.component';
import { MuiConfirmationDialog } from '../../mui-confirmation-dialog/mui-confirmation-dialog.model';
import { BaseModel } from 'src/app/yprime-artifacts/models/base.model';
import { Observable, of } from 'rxjs';
import { DynamicTableData } from '../mui-table-dynamic-data.model';
import { MuiTableColumnSource } from '../mui-table-column-source.model';
import { MuiOption } from '../mui-option.model';
import { FileItem } from 'src/app/yprime-artifacts/models/file-item.model';
import { ChoiceModalComponent } from '../../modals/choice/choice-modal.component';
import { MuiDynamicColumnSchema } from '../mui-dynamic-column-schema.model';
import { MuiDynamicTableColumn } from '../mui-dynamic-table-column.model';

@Component({
   selector: 'app-mui-dynamic-cols-table',
   changeDetection: ChangeDetectionStrategy.OnPush,
   templateUrl: './mui-dynamic-cols-table.component.html',
   styleUrls: ['./mui-dynamic-cols-table.component.scss']
})
export class MuiDynamicColsTableComponent implements OnInit, OnChanges {
   @Input() data: Array<BaseModel<string | number>>;
   @Input() dynamicData: Array<DynamicTableData>;
   @Input() pageName = '';
   @Input() columnNames: Array<MuiDynamicTableColumn>;
   @Input() dynamicColumnSchema: MuiDynamicColumnSchema[];
   @Input() processingStatus: ProcessingStatus;
   @Input() deleteConfirmationSetting: MuiConfirmationDialog;
   @Output() actionClicked = new EventEmitter<MuiTableAction>();
   @Output() optionList = new EventEmitter<MuiOption[]>();

   showSpinner = false;
   showErrorMessage = false;
   editId = '';
   keyName = '';
   notificationMessage = '';
   dataSource;
   displayedColumns;
   statusId: MuiTableStatus = MuiTableStatus.None;
   columnActionTypeEnum: typeof MuiColumnActionType = MuiColumnActionType;
   columnControlTypeEnum: typeof MuiTableControlType = MuiTableControlType;
   addRowRequired = true;
   addRow = {};
   editRow = {};
   isMultiPartForm = false;
   isFileError = false;
   fileNotSelected = false;
   fileErrorMessage = '';
   fileSizeLimit = 2097152; // 2 * 1024 * 1024 (2MB)
   uploadControlName = '';
   selectAllId = 'selectAll';
   deselectAllId = 'deselectAll';
   deselectAllObj: BaseModel<string> = { id: this.deselectAllId };
   manageChoiceError = false;

   @ViewChild('addForm') addForm: NgForm;
   @ViewChild(MatPaginator) paginator: MatPaginator;
   @ViewChild(MatSort) sort: MatSort = new MatSort();
   constructor(
      private cdr: ChangeDetectorRef,
      private snackBar: MatSnackBar,
      private dialog: MatDialog
   ) {}

   ngOnInit() {
      if (this.columnNames && this.columnNames.length > 0) {
         this.displayedColumns = this.columnNames
            .filter(f => f.isVisible && f.isVisible === true)
            .map(x => x.id);
         this.columnNames.map((x, index) => {
            if (x.isKey) {
               this.keyName = x.id;
            }
            if (x.MuiTableControlType === MuiTableControlType.FileUpload) {
               this.isMultiPartForm = true;
               this.uploadControlName = x.id;
            }
         });
      }
   }

   ngOnChanges(changes: SimpleChanges) {
      if (changes.data && changes.data.currentValue) {
         this.dataSource = new MatTableDataSource(changes.data.currentValue);
         this.dataSource.paginator = this.paginator;

         if (this.sort.active) {
            this.dataSource.sort = this.sort;
         }

         this.editRow = {};
         this.editId = '';

         if (changes.data.currentValue.length === 0) {
            this.notificationMessage = 'No Records Found.';
         } else {
            this.notificationMessage = '';
         }

         // the ProcessingStatus status will not be detected for firstChange
         this.updateStatus(<ProcessingStatus>{
            status: MuiTableStatus.Complete
         });
      } else if (changes.processingStatus) {
         this.updateStatus(changes.processingStatus.currentValue);
      } else if (changes.choiceAdded) {
         this.manageChoiceError = false;
      }
   }

   private setSpinnerWithMax10sLimit() {
      this.setSpinner(true);

      setTimeout(() => {
         if (this.showSpinner) {
            this.notificationMessage =
               'We are experiencing longer than normal processing times...';
            this.setSpinner(false);
         }
      }, 10000);
   }

   private setSpinner(value: boolean) {
      this.showSpinner = value;
      this.cdr.markForCheck();
   }

   private updateStatus(processingStatus: ProcessingStatus) {
      switch (processingStatus.status) {
         case MuiTableStatus.Processing:
            this.setSpinnerWithMax10sLimit();
            break;
         case MuiTableStatus.Complete:
         case MuiTableStatus.ProcessingError:
            if (
               processingStatus.notificationActionType &&
               processingStatus.notificationActionType ===
                  MuiColumnActionType.Add
            ) {
               this.addForm.resetForm();
            }

            if (processingStatus.notificationMessage) {
               setTimeout(() => {
                  this.notificationMessage = '';
                  this.snackBar.open(
                     processingStatus.notificationMessage,
                     'Close',
                     {
                        duration: 2000,
                        panelClass:
                           processingStatus.status === MuiTableStatus.Complete
                              ? ['snack-info']
                              : ['snack-error']
                     }
                  );
               }, 0);
            }

            this.setSpinner(false);
            break;
         default:
            break;
      }
   }

   getListItem(items: [], textKeyName: string): string[] {
      return items ? items.map(i => i[textKeyName]) : [''];
   }

   private saveAction() {
      if (this.isEditRowValid()) {
         const action = <MuiTableAction>{
            actionType: MuiColumnActionType.SaveChanges,
            id: this.editId,
            data: this.editRow
         };
         this.showErrorMessage = false;
         this.actionClicked.emit(action);
      } else {
         this.showErrorMessage = true;
      }
   }

   private isEditRowValid(): boolean {
      let result = true;
      const refColumn = this.columnNames.filter(c => c.isColumnReferenceSchema);
      const schemaId = this.editRow[refColumn[0].id];
      const dynamicSchema = this.dynamicColumnSchema.find(
         s => s.id === schemaId
      ).columnSchema;
      const matches = this.columnNames.filter(
         c => c.isRequired === true && dynamicSchema.includes(c.id)
      );
      if (matches && matches.length > 0) {
         matches.forEach(item => {
            if (
               this.editRow[item[this.keyName]] instanceof Array &&
               this.editRow[item[this.keyName]].length === 0
            ) {
               result = false;
            } else if (
               !this.editRow[item[this.keyName]] &&
               this.editRow[item[this.keyName]] !== 0
            ) {
               result = false;
            }
         });
      }
      return result;
   }

   updateDropdown(id, addMode: boolean, column: MuiDynamicTableColumn) {
      if (column.columnDataSource.syncOnAction) {
         const matches = this.dynamicData[
            column.columnDataSource.syncSourceIndex
         ].data.filter(item => item[column.columnDataSource.idKeyName] === id);
         if (matches && matches.length > 0) {
            if (addMode) {
               if (column.isColumnReferenceSchema) {
               } else {
                  this.addRow = { ...this.addRow, ...matches[0] };
               }
            } else {
               this.editRow = { ...this.editRow, ...matches[0] };
            }
         }
         this.cdr.markForCheck();
      } else if (column.isColumnReferenceSchema) {
         for (const key of Object.keys(this.addRow)) {
            if (key !== column.id) {
               this.addRow[key] = null;
            }
         }
         this.manageChoiceError = false;
         this.cdr.markForCheck();
      }
   }

   compareObjects(o1: any, o2: any): boolean {
      return o1 && o1.id && o2 && o2.id && o1.id === o2.id;
   }

   onAddAction() {
      if (this.isMultiPartForm) {
         const file = this.addRow[this.uploadControlName];
         this.validateFile(file);
      }

      this.validateChoices();

      if (this.addForm.valid) {
         const action = <MuiTableAction>{
            actionType: MuiColumnActionType.Add,
            id: null,
            data: this.addRow,
            isMultiPartForm: this.isMultiPartForm
         };
         this.actionClicked.emit(action);
         this.showErrorMessage = false;

         setTimeout(() => {
            this.addRow = {};
         }, 0);
      } else {
         this.showErrorMessage = true;
      }
   }

   cancelAction(isEditMode: boolean) {
      if (isEditMode) {
         this.editId = '';
         this.editRow = {};
      } else {
         this.addForm.resetForm();
         this.addRow = {};
      }
      this.showErrorMessage = false;
      this.cdr.markForCheck();
   }

   onEditAction(row: any) {
      this.showErrorMessage = false;
      this.editId = row[this.keyName];
      Object.assign(this.editRow, row);
      this.cdr.markForCheck();
   }

   onDeleteAction(id: string) {
      const action = <MuiTableAction>{};
      action.actionType = MuiColumnActionType.Delete;
      action.id = id;

      this.processDeleteConfirmation(action);
   }

   private UniqueCheck(columnName: string) {}

   public onSliderChange(
      value: MatSlideToggleChange,
      column: MuiTableColumn,
      row: any
   ) {
      if (value.checked && column.columnDataSource) {
         const sliderOption: Array<MuiOption> = this.dynamicData[
            column.columnDataSource.syncSourceIndex
         ].data;
         const message =
            sliderOption.length > 0
               ? `${sliderOption[0].name} ${column.uniqueConstraintnMessage}`
               : '';
         const dialogConfig = new MatDialogConfig();
         dialogConfig.disableClose = false;
         dialogConfig.autoFocus = true;
         dialogConfig.data = <MuiConfirmationDialog>{
            title: 'Confirmation',
            message: message,
            yesButtonTitle: 'Yes',
            noButtonTitle: 'No'
         };

         const dialogRef = this.dialog.open(
            MuiConfirmationDialogComponent,
            dialogConfig
         );
         dialogRef.afterClosed().subscribe(result => {
            if (!(result && result === true)) {
               value.source.checked = false;
               return;
            }
         });
      }
      row[column.id] = value.checked;
   }

   enableDynamicAddColumn(column: MuiDynamicTableColumn): boolean {
      let key: string;
      const refColumn = this.columnNames.filter(c => c.isColumnReferenceSchema);
      const row = this.addRow;
      if (row[refColumn[0].id]) {
         const choiceId = row[refColumn[0].id];
         refColumn[0].columnDataSource.staticDataSource.subscribe(
            choiceTypes => {
               key = choiceTypes
                  .filter(c => c.id === choiceId)[0]
                  ['id'].toString();
            }
         );
         return this.enableDynamicColumn(column, key);
      } else {
         return false;
      }
   }
   enableDynamicEditColumn(column: MuiDynamicTableColumn): boolean {
      const refColumn = this.columnNames.filter(c => c.isColumnReferenceSchema);
      const key = this.editRow[refColumn[0].id];
      return this.enableDynamicColumn(column, key);
   }

   private enableDynamicColumn(
      column: MuiDynamicTableColumn,
      key: string
   ): boolean {
      let enableColumn = false;
      const schema = this.dynamicColumnSchema.find(s => s.id === key)
         .columnSchema;

      if (schema) {
         enableColumn =
            schema.includes(column.id) || column.id === 'actionPanel';
      }

      return enableColumn;
   }

   public onFileChanged(file: FileItem, columnId: string) {
      this.addRow[this.uploadControlName] = file;
      this.addRow['size'] = file.size;
      this.fileNotSelected = false;
      this.cdr.markForCheck();
   }

   public processDeleteConfirmation(action: MuiTableAction) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = this.deleteConfirmationSetting;
      if (!dialogConfig.data) {
         dialogConfig.data = <MuiConfirmationDialog>{
            title: 'Confirmation',
            message: 'Do you wish to delete the record?',
            yesButtonTitle: 'Yes',
            noButtonTitle: 'No'
         };
      }

      const dialogRef = this.dialog.open(
         MuiConfirmationDialogComponent,
         dialogConfig
      );
      dialogRef.afterClosed().subscribe(result => {
         if (result && result === true) {
            this.actionClicked.emit(action);
         }
      });
   }

   public openChoiceModal(columnId: string) {
      const row = this.editId !== '' ? this.editRow : this.addRow;
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = row[columnId];
      this.dialog
         .open(ChoiceModalComponent, dialogConfig)
         .afterClosed()
         .subscribe(data => {
            row[columnId] = data;
            this.manageChoiceError = !(data && data.length > 0);
            this.cdr.markForCheck();
         });
   }

   private validateFile(file: File) {
      if (!file) {
         this.fileNotSelected = true;
         this.addForm.form.setErrors({ fileNotSelected: true });
      } else if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
         this.addForm.form.setErrors({ fileInvalid: true });
         this.isFileError = true;
         this.snackBar.open(
            'Sorry, we could not upload this file. Try saving it in a jpeg or png file type and upload again',
            'Close',
            {
               panelClass: ['snack-error']
            }
         );
      } else if (file.size > this.fileSizeLimit) {
         this.addForm.form.setErrors({ fileInvalid: true });
         this.isFileError = true;
         this.snackBar.open('File exceeds size limit of 2000KB', 'Close', {
            panelClass: ['snack-error']
         });
      }
   }

   private validateChoices() {
      const schema = this.dynamicColumnSchema.find(
         s => s.id === this.addRow['choiceType']
      ).columnSchema;
      if (schema.includes('choices')) {
         if (!this.addRow['choices']) {
            this.manageChoiceError = true;
            this.addForm.form.setErrors({ choiceNotAdded: true });
         } else {
            this.manageChoiceError = false;
         }
      }
   }

   private toggleSelectAllOptions(option1, option2: string) {
      document.getElementById(option1).style.display = 'none';
      document.getElementById(option2).style.display = 'flex';
   }

   private selectAll(select: NgModel, options) {
      // options.push(this.deselectAllObj); // deselect needs to be checked
      select.update.emit(options);
      this.toggleSelectAllOptions(this.selectAllId, this.deselectAllId);
   }

   private deselectAll(select: NgModel) {
      select.update.emit([]);
      this.toggleSelectAllOptions(this.deselectAllId, this.selectAllId);
   }

   private choiceSelect(
      select: NgModel,
      options: BaseModel<string | number>[]
   ) {
      // select.model = select.model.filter(value => {
      //    return value !== this.deselectAllObj;
      // }); // removing the deselectAllObj due to interference with the following logic
      if (select.model.length === options.length) {
         this.selectAll(select, options);
      } else {
         this.toggleSelectAllOptions(this.deselectAllId, this.selectAllId);
      }
   }

   private toggleSelectAll(
      select: NgModel,
      options: MuiTableColumnSource,
      isChoice: boolean
   ) {
      if (options.syncOnAction) {
         this.setSelectDynamicData(
            select,
            this.dynamicData[options.syncSourceIndex].data,
            isChoice
         );
      } else {
         this.setSelectStaticData(select, options.staticDataSource, isChoice);
      }
   }

   private setSelectDynamicData(
      select: NgModel,
      options: BaseModel<string | number>[],
      isChoice: boolean
   ) {
      if (isChoice) {
         this.choiceSelect(select, options);
      } else {
         this.selectAll(select, options);
      }
   }

   private setSelectStaticData(
      select: NgModel,
      observable: Observable<BaseModel<string | number>[]>,
      isChoice: boolean
   ) {
      observable.subscribe((array: BaseModel<string | number>[]) => {
         this.setSelectDynamicData(select, array, isChoice);
      });
   }
}
