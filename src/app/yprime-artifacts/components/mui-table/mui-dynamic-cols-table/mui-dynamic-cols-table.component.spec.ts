import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MuiDynamicColsTableComponent } from './mui-dynamic-cols-table.component';
import {
   CUSTOM_ELEMENTS_SCHEMA,
   NO_ERRORS_SCHEMA,
   ChangeDetectorRef,
   SimpleChange,
   NgModule
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MaterialUIModule } from '../../../material-ui/material-ui.module';
import {
   MatTableModule,
   MatDialogConfig,
   MatInput,
   MatSpinner,
   MatDialogRef,
   MAT_DIALOG_DATA
} from '@angular/material';
import { MuiTableColumn } from '../mui-table-column.model';
import { MuiTableStatus } from '../mui-table-status.model';
import { MuiTableControlType } from '../mui-table-controlType.model';
import { PipeHelper } from '../../../pipes/pipe-helper';
import { ProcessingStatus } from '../processing-status.model';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InlineTableTestModel } from '../inline-table-consumer-base/inline-table-consumer-base.component.spec';
import { CommonModule } from '@angular/common';
import { MuiConfirmationDialogComponent } from '../../mui-confirmation-dialog/mui-confirmation-dialog.component';
import { MuiConfirmationDialog } from '../../mui-confirmation-dialog/mui-confirmation-dialog.model';
import { MuiTableAction } from '../mui-table-action.model';
import { MuiColumnActionType } from '../mui-table-actionType.model';
import { By } from '@angular/platform-browser';
import { of, Observable } from 'rxjs';
import { MuiDynamicTableColumn } from '../mui-dynamic-table-column.model';
import { MuiTableColumnSource } from '../mui-table-column-source.model';

@NgModule({
   imports: [CommonModule, MaterialUIModule],
   schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
   declarations: [MuiConfirmationDialogComponent],
   entryComponents: [MuiConfirmationDialogComponent]
})
export class FakeTestDialogModule {}

describe('Dynamic Columns Table Component', () => {
   let component: MuiDynamicColsTableComponent;
   let dynamicColumnSchema: any;
   let fixture: ComponentFixture<MuiDynamicColsTableComponent>;
   const inlineTableData = new Array<InlineTableTestModel>();

   for (let index = 0; index < 31; index++) {
      const ordinal = index.toString();
      inlineTableData.push(<InlineTableTestModel>{
         id: ordinal,
         name: 'DataItem ' + ordinal,
         actionPanel: index % 2 === 0
      });
   }

   function assignInput(inputElement: HTMLInputElement, text: string) {
      const allInputs = fixture.debugElement.queryAll(By.directive(MatInput));
      const de = allInputs.find(
         item => item.nativeElement.id === inputElement[0].id
      );
      de.nativeElement.value = text;
      de.nativeElement.dispatchEvent(new Event('input'));

      fixture.detectChanges();
      return fixture.whenStable();
   }

   function validateTableBlock(
      pageNumber: number,
      pageSize: number,
      totalRecords: number
   ) {
      // validate header
      const headerRow = fixture.nativeElement.querySelectorAll(
         'mat-header-row'
      );
      expect(headerRow.length).toBe(1);

      const headerCols = fixture.nativeElement.querySelectorAll(
         'button.mat-sort-header-button'
      );
      expect(headerCols.length).toBe(3);
      expect(headerCols[0].innerText).toBe('Choice Type');
      expect(headerCols[1].innerText).toBe('name');

      // validate grid
      const currentSet = (pageNumber - 1) * pageSize;
      const tableRows = fixture.nativeElement.querySelectorAll('mat-row');
      expect(tableRows.length).toBe(
         totalRecords - currentSet > pageSize
            ? pageSize
            : totalRecords - currentSet
      );

      for (let index = 0; index < pageSize; index++) {
         const counter = currentSet + index;
         if (counter < totalRecords) {
            const rowCells = tableRows[index].querySelectorAll('mat-cell');
            expect(rowCells.length).toBe(3);
            expect(rowCells[1].innerText).toBe(
               'DataItem ' + counter.toString()
            );

            const panelEditable = index % 2 === 0;
            const editActionPanel = rowCells[1].querySelectorAll(
               '.ActionPanelEditButton'
            );
            const editButton = editActionPanel[0].childNodes[0];
            expect(editButton.innerText).toBe('create');
            expect(editButton.title).toBe(
               panelEditable ? '' : 'Cannot be deleted or modified'
            );
            expect(editButton.disabled).toBe(!panelEditable);

            const deleteActionPanel = rowCells[1].querySelectorAll(
               '.ActionPanelDeleteButton'
            );
            const deleteButton = deleteActionPanel[0].childNodes[0];
            expect(deleteButton.innerText).toBe('delete');
            expect(deleteButton.title).toBe(
               panelEditable ? '' : 'Cannot be deleted or modified'
            );
            expect(deleteButton.disabled).toBe(!panelEditable);
         }
      }
   }

   function getDynamicColumnSchema$() {
      return Observable.create(observer => {
         observer.next(dynamicColumnSchema);
         observer.complete();
      });
   }

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         declarations: [MuiDynamicColsTableComponent, PipeHelper],
         schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
         imports: [
            FormsModule,
            ReactiveFormsModule,
            HttpClientTestingModule,
            CommonModule,
            BrowserAnimationsModule,
            MaterialUIModule,
            MatTableModule,
            BrowserAnimationsModule,
            FakeTestDialogModule
         ],
         providers: [
            { provide: MatDialogRef, useValue: {} },
            { provide: MAT_DIALOG_DATA, useValue: {} }
         ]
      }).compileComponents();
   }));

   beforeEach(async(() => {
      fixture = TestBed.createComponent(MuiDynamicColsTableComponent);
      component = fixture.componentInstance;
      component.columnNames = [
         <MuiDynamicTableColumn>{ id: 'id', isKey: true },
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
               staticDataSource: getDynamicColumnSchema$(),
               syncSourceIndex: 1
            }
         },
         <MuiDynamicTableColumn>{
            id: 'name',
            isVisible: true,
            MuiTableControlType: MuiTableControlType.Text,
            isRequired: true,
            maxLength: 60,
            canBeAdded: true,
            canBeEdited: true,
            columnDisplayName: 'name'
         },
         <MuiDynamicTableColumn>{
            id: 'actionPanel',
            isVisible: true,
            columnDisplayName: '',
            helpText: 'Cannot be deleted or modified',
            MuiTableControlType: MuiTableControlType.DataDrivenActionPanel
         }
      ];
      dynamicColumnSchema = [
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
      component.deleteConfirmationSetting = <MuiConfirmationDialog>{
         title: 'Confirmation',
         message: 'Do you wish to delete the record?',
         yesButtonTitle: 'Yes',
         noButtonTitle: 'No'
      };

      fixture.detectChanges();
   }));

   it('should create', () => {
      expect(component).toBeTruthy();
   });

   it('should create with defined columns', () => {
      expect(component.columnNames.length).toBe(4);
      expect(component.displayedColumns.length).toBe(3);
      expect(inlineTableData.length).toBe(31);
   });

   describe('View Mode of grid', () => {
      it('should display spinner when status is processing', () => {
         const processingStatus = <ProcessingStatus>{
            status: MuiTableStatus.Processing
         };

         component.paginator.pageSize = 5;

         // we are following isolated testing pattern
         //  https://angular.io/guide/testing#!#isolated-v-testing-utilities
         // directly call ngOnChanges
         component.ngOnChanges({
            data: new SimpleChange(null, null, false),
            processingStatus: new SimpleChange(null, processingStatus, false)
         });
         fixture.detectChanges();

         fixture.whenStable().then(() => {
            fixture.whenRenderingDone().then(() => {
               // detectChanges again to ensure that the UI is refreshed and the pager shows up correctly when viewed
               fixture.detectChanges();
               expect(component.showSpinner).toBeTruthy();
               const spinner = fixture.debugElement.queryAll(
                  By.directive(MatSpinner)
               );
               expect(spinner.length).toBe(1);

               // we are following isolated testing pattern
               //  https://angular.io/guide/testing#!#isolated-v-testing-utilities
               // directly call ngOnChanges
               component.ngOnChanges({
                  data: new SimpleChange(
                     null,
                     new Array<InlineTableTestModel>(),
                     false
                  ),
                  processingStatus: new SimpleChange(
                     null,
                     processingStatus,
                     false
                  )
               });
               fixture.detectChanges();

               fixture.whenStable().then(() => {
                  fixture.whenRenderingDone().then(() => {
                     fixture.detectChanges();

                     const spinnerCtl = fixture.debugElement.queryAll(
                        By.directive(MatSpinner)
                     );
                     expect(spinnerCtl.length).toBe(0);
                     expect(component.showSpinner).toBeFalsy();
                  });
               });
            });
         });
      });

      it('should display no records when no data is provided', () => {
         const processingStatus = <ProcessingStatus>{
            status: MuiTableStatus.None
         };

         component.paginator.pageSize = 5;

         // we are following isolated testing pattern
         //  https://angular.io/guide/testing#!#isolated-v-testing-utilities
         // directly call ngOnChanges
         component.ngOnChanges({
            data: new SimpleChange(
               null,
               new Array<InlineTableTestModel>(),
               false
            ),
            processingStatus: new SimpleChange(null, processingStatus, false)
         });

         fixture.detectChanges();
         fixture.whenStable().then(() => {
            fixture.whenRenderingDone().then(() => {
               // detectChanges again to ensure that the UI is refreshed and the pager shows up correctly when viewed
               fixture.detectChanges();

               // validate header
               const headerRow = fixture.nativeElement.querySelectorAll(
                  'mat-header-row'
               );
               expect(headerRow.length).toBe(1);

               const headerCols = fixture.nativeElement.querySelectorAll(
                  'button.mat-sort-header-button'
               );
               expect(headerCols.length).toBe(3);
               expect(headerCols[0].innerText).toBe('Choice Type');
               expect(headerCols[1].innerText).toBe('name');

               // validate pager
               expect(component.paginator.length).toBe(0);
               expect(component.paginator.pageSize).toBe(5);

               // validate grid has 0 records
               const tableRows = fixture.nativeElement.querySelectorAll(
                  'mat-row'
               );
               expect(tableRows.length).toBe(0);

               const messageText = fixture.nativeElement.querySelectorAll(
                  '.message'
               );
               expect(messageText[0].innerText).toBe('No Records Found.');
            });
         });
      });

      it('should display five records on first page with an action panel of edit and delete buttons', () => {
         const processingStatus = <ProcessingStatus>{
            status: MuiTableStatus.Complete
         };

         component.paginator.pageSize = 5;

         // we are following isolated testing pattern
         //  https://angular.io/guide/testing#!#isolated-v-testing-utilities
         // directly call ngOnChanges
         component.ngOnChanges({
            data: new SimpleChange(null, inlineTableData, false),
            processingStatus: new SimpleChange(null, processingStatus, false)
         });

         component.sort.active = 'name';
         component.sort.direction = 'asc';
         component.dataSource.sort = component.sort;

         fixture.detectChanges();
         fixture.whenStable().then(() => {
            fixture.whenRenderingDone().then(() => {
               // detectChanges again to ensure that the UI is refreshed and the pager shows up correctly when viewed
               fixture.detectChanges();

               // validate pager

               expect(component.paginator.length).toBe(31);
               expect(component.paginator.pageSize).toBe(5);

               const tableRows = fixture.nativeElement.querySelectorAll(
                  'mat-row'
               );
               let rowCells = tableRows[0].querySelectorAll('mat-cell');
               expect(rowCells[1].innerText).toBe('DataItem 0');

               rowCells = tableRows[1].querySelectorAll('mat-cell');
               expect(rowCells[1].innerText).toBe('DataItem 1');

               rowCells = tableRows[2].querySelectorAll('mat-cell');
               expect(rowCells[1].innerText).toBe('DataItem 10');

               rowCells = tableRows[3].querySelectorAll('mat-cell');
               expect(rowCells[1].innerText).toBe('DataItem 11');

               rowCells = tableRows[4].querySelectorAll('mat-cell');
               expect(rowCells[1].innerText).toBe('DataItem 12');
            });
         });
      });

      it('should support sorting on the name column', () => {
         const processingStatus = <ProcessingStatus>{
            status: MuiTableStatus.Complete
         };

         component.paginator.pageSize = 5;

         // we are following isolated testing pattern
         //  https://angular.io/guide/testing#!#isolated-v-testing-utilities
         // directly call ngOnChanges
         component.ngOnChanges({
            data: new SimpleChange(null, inlineTableData, false),
            processingStatus: new SimpleChange(null, processingStatus, false)
         });

         component.sort.active = 'name';
         component.sort.direction = 'asc';
         component.dataSource.sort = component.sort;

         fixture.detectChanges();
         fixture.whenStable().then(() => {
            fixture.whenRenderingDone().then(() => {
               // detectChanges again to ensure that the UI is refreshed and the pager shows up correctly when viewed
               fixture.detectChanges();

               // validate pager
               expect(component.paginator.length).toBe(31);
               expect(component.paginator.pageSize).toBe(5);

               let tableRows = fixture.nativeElement.querySelectorAll(
                  'mat-row'
               );
               let rowCells = tableRows[0].querySelectorAll('mat-cell');
               expect(rowCells[1].innerText).toBe('DataItem 0');

               rowCells = tableRows[1].querySelectorAll('mat-cell');
               expect(rowCells[1].innerText).toBe('DataItem 1');

               rowCells = tableRows[2].querySelectorAll('mat-cell');
               expect(rowCells[1].innerText).toBe('DataItem 10');

               rowCells = tableRows[3].querySelectorAll('mat-cell');
               expect(rowCells[1].innerText).toBe('DataItem 11');

               rowCells = tableRows[4].querySelectorAll('mat-cell');
               expect(rowCells[1].innerText).toBe('DataItem 12');

               component.sort.direction = 'desc';
               component.sort.active = 'name';
               component.dataSource.sort = component.sort;

               fixture.detectChanges();
               fixture.whenStable().then(() => {
                  fixture.whenRenderingDone().then(() => {
                     // detectChanges again to ensure that the UI is refreshed and the pager shows up correctly when viewed
                     fixture.detectChanges();
                     // validate pager
                     expect(component.paginator.length).toBe(31);
                     expect(component.paginator.pageSize).toBe(5);

                     tableRows = fixture.nativeElement.querySelectorAll(
                        'mat-row'
                     );
                     rowCells = tableRows[0].querySelectorAll('mat-cell');
                     expect(rowCells[1].innerText).toBe('DataItem 9');

                     rowCells = tableRows[1].querySelectorAll('mat-cell');
                     expect(rowCells[1].innerText).toBe('DataItem 8');

                     rowCells = tableRows[2].querySelectorAll('mat-cell');
                     expect(rowCells[1].innerText).toBe('DataItem 7');

                     rowCells = tableRows[3].querySelectorAll('mat-cell');
                     expect(rowCells[1].innerText).toBe('DataItem 6');

                     rowCells = tableRows[4].querySelectorAll('mat-cell');
                     expect(rowCells[1].innerText).toBe('DataItem 5');
                  });
               });
            });
         });
      });

      it('should page the grid from first to last and vice-versa with provided dataset of 31 records', () => {
         const processingStatus = <ProcessingStatus>{
            status: MuiTableStatus.None
         };

         // we are following isolated testing pattern
         //  https://angular.io/guide/testing#!#isolated-v-testing-utilities
         // directly call ngOnChanges
         component.sort.active = 'id';
         component.sort.direction = 'asc';
         component.paginator.pageSize = 5;

         component.ngOnChanges({
            data: new SimpleChange(null, inlineTableData, false),
            processingStatus: new SimpleChange(null, processingStatus, false)
         });

         const pageSizes = [10];
         for (let index = 0; index < pageSizes.length; index++) {
            const pageSize = pageSizes[index];
            component.paginator._changePageSize(pageSize);

            fixture.detectChanges();
            fixture.whenStable().then(() => {
               fixture.whenRenderingDone().then(() => {
                  // detectChanges again to ensure that the UI is refreshed and the pager shows up correctly when viewed
                  fixture.detectChanges();

                  // validate pager
                  expect(component.paginator.length).toBe(31);
                  expect(component.paginator.pageSize).toBe(pageSize);

                  const pageCount = component.paginator.getNumberOfPages();
                  for (
                     let pageNumber = 1;
                     pageNumber < pageCount;
                     pageNumber++
                  ) {
                     expect(component.paginator.pageIndex).toBe(pageNumber - 1);
                     validateTableBlock(pageNumber, pageSize, 31);
                     component.paginator.nextPage();
                     fixture.detectChanges();
                  }

                  for (
                     let pageNumber = pageCount;
                     pageNumber > 1;
                     pageNumber--
                  ) {
                     expect(component.paginator.pageIndex).toBe(pageNumber - 1);
                     validateTableBlock(pageNumber, pageSize, 31);
                     component.paginator.previousPage();
                     fixture.detectChanges();
                  }
               });
            });
         }
      });

      it('should validate that action Panel is disabled for records that cannot be edited or deleted', () => {
         const processingStatus = <ProcessingStatus>{
            status: MuiTableStatus.None
         };

         component.sort.active = 'id';
         component.sort.direction = 'asc';
         component.paginator.pageSize = 5;

         // we are following isolated testing pattern
         //  https://angular.io/guide/testing#!#isolated-v-testing-utilities
         // directly call ngOnChanges
         component.ngOnChanges({
            data: new SimpleChange(null, inlineTableData, false),
            processingStatus: new SimpleChange(null, processingStatus, false)
         });

         fixture.detectChanges();
         fixture.whenStable().then(() => {
            fixture.whenRenderingDone().then(() => {
               // detectChanges again to ensure that the UI is refreshed and the pager shows up correctly when viewed
               fixture.detectChanges();

               // validate pager
               expect(component.paginator.length).toBe(31);
               expect(component.paginator.pageSize).toBe(5);

               const pageCount = component.paginator.getNumberOfPages();
               validateTableBlock(1, 5, 31);
            });
         });
      });

      it('should validate that title is displayed for disabled action Panel buttons', () => {
         const processingStatus = <ProcessingStatus>{
            status: MuiTableStatus.None
         };

         component.sort.active = 'id';
         component.sort.direction = 'asc';
         component.paginator.pageSize = 5;

         // we are following isolated testing pattern
         //  https://angular.io/guide/testing#!#isolated-v-testing-utilities
         // directly call ngOnChanges
         component.ngOnChanges({
            data: new SimpleChange(null, inlineTableData, false),
            processingStatus: new SimpleChange(null, processingStatus, false)
         });

         fixture.detectChanges();
         fixture.whenStable().then(() => {
            fixture.whenRenderingDone().then(() => {
               // detectChanges again to ensure that the UI is refreshed and the pager shows up correctly when viewed
               fixture.detectChanges();

               // validate pager
               expect(component.paginator.length).toBe(31);
               expect(component.paginator.pageSize).toBe(5);

               const pageCount = component.paginator.getNumberOfPages();
               validateTableBlock(1, 5, 31);
            });
         });
      });

      it('should process delete operation on a Yes confirmation', () => {
         const index = 0;
         const processingStatus = <ProcessingStatus>{
            status: MuiTableStatus.None
         };

         component.paginator.pageSize = 5;

         // we are following isolated testing pattern
         //  https://angular.io/guide/testing#!#isolated-v-testing-utilities
         // directly call ngOnChanges
         component.ngOnChanges({
            data: new SimpleChange(null, inlineTableData, false),
            processingStatus: new SimpleChange(null, processingStatus, false)
         });

         fixture.detectChanges();
         fixture.whenStable().then(() => {
            fixture.whenRenderingDone().then(() => {
               // detectChanges again to ensure that the UI is refreshed and the pager shows up correctly when viewed
               fixture.detectChanges();

               const tableRows = fixture.nativeElement.querySelectorAll(
                  'mat-row'
               );
               const rowCells = tableRows[index].querySelectorAll('mat-cell');
               expect(rowCells.length).toBe(3);
               expect(rowCells[1].innerText).toBe('DataItem 0');

               const deleteAction = <MuiTableAction>{ actionType: 1, id: '0' };
               const returnedVal = {
                  afterClosed: () => of(true)
               };

               spyOn(component['dialog'], 'open').and.returnValue(returnedVal);
               spyOn(component.actionClicked, 'emit');

               const deleteActionPanel = rowCells[1].querySelectorAll(
                  '.ActionPanelDeleteButton'
               );
               const deleteButton = deleteActionPanel[0].childNodes[0];
               deleteButton.click();

               expect(component.actionClicked.emit).toHaveBeenCalledWith(
                  deleteAction
               );
            });
         });
      });

      it('should cancel delete operation for a No delete confirmation', () => {
         const index = 0;
         const processingStatus = <ProcessingStatus>{
            status: MuiTableStatus.None
         };

         component.paginator.pageSize = 5;

         // we are following isolated testing pattern
         //  https://angular.io/guide/testing#!#isolated-v-testing-utilities
         // directly call ngOnChanges
         component.ngOnChanges({
            data: new SimpleChange(null, inlineTableData, false),
            processingStatus: new SimpleChange(null, processingStatus, false)
         });

         fixture.detectChanges();
         fixture.whenStable().then(() => {
            fixture.whenRenderingDone().then(() => {
               // detectChanges again to ensure that the UI is refreshed and the pager shows up correctly when viewed
               fixture.detectChanges();

               const tableRows = fixture.nativeElement.querySelectorAll(
                  'mat-row'
               );
               const rowCells = tableRows[index].querySelectorAll('mat-cell');
               expect(rowCells.length).toBe(3);
               expect(rowCells[1].innerText).toBe('DataItem 0');

               const deleteAction = <MuiTableAction>{ actionType: 1, id: '0' };
               const returnedVal = {
                  afterClosed: () => of(false)
               };

               spyOn(component['dialog'], 'open').and.returnValue(returnedVal);
               spyOn(component.actionClicked, 'emit');

               const deleteActionPanel = rowCells[1].querySelectorAll(
                  '.ActionPanelDeleteButton'
               );
               const deleteButton = deleteActionPanel[0].childNodes[0];
               deleteButton.click();

               expect(component.actionClicked.emit).not.toHaveBeenCalled();
            });
         });
      });
   });

   describe('Editable Mode of grid', () => {
      it('should show edit view when record is edited', () => {
         const index = 0;
         const processingStatus = <ProcessingStatus>{
            status: MuiTableStatus.None
         };

         component.paginator.pageSize = 5;

         // we are following isolated testing pattern
         //  https://angular.io/guide/testing#!#isolated-v-testing-utilities
         // directly call ngOnChanges
         component.ngOnChanges({
            data: new SimpleChange(null, inlineTableData, false),
            processingStatus: new SimpleChange(null, processingStatus, false)
         });

         fixture.detectChanges();
         fixture.whenStable().then(() => {
            fixture.whenRenderingDone().then(() => {
               // detectChanges again to ensure that the UI is refreshed and the pager shows up correctly when viewed
               fixture.detectChanges();

               const tableRows = fixture.nativeElement.querySelectorAll(
                  'mat-row'
               );
               const rowCells = tableRows[index].querySelectorAll('mat-cell');

               let saveButtonPanel = rowCells[1].querySelectorAll(
                  '.ActionPanelSaveButton'
               );
               expect(saveButtonPanel.length).toBe(0);

               const editActionPanel = rowCells[1].querySelectorAll(
                  '.ActionPanelEditButton'
               );
               const editButton = editActionPanel[0].childNodes[0];
               editButton.click();

               fixture.detectChanges();
               fixture.whenStable().then(() => {
                  fixture.whenRenderingDone().then(() => {
                     saveButtonPanel = rowCells[1].querySelectorAll(
                        '.ActionPanelSaveButton'
                     );
                     expect(saveButtonPanel.length).toBe(1);

                     const saveButton = saveButtonPanel[0].childNodes[0];
                     expect(saveButton.innerText).toBe('check_circle');

                     const cancelButtonPanel = rowCells[1].querySelectorAll(
                        '.ActionPanelCancelButton'
                     );
                     const cancelButton = cancelButtonPanel[0].childNodes[0];
                     expect(cancelButton.innerText).toBe('highlight_off');

                     const col0 = rowCells[0].querySelectorAll('input');
                     expect(col0[0].placeholder).toBe('name');
                     expect(col0[0].maxLength).toBe(60);
                     expect(col0[0].required).toBe(true);
                     expect(col0[0].type).toBe('text');
                     expect(col0[0].value).toBe('DataItem 0');
                  });
               });
            });
         });
      });

      it('should switch back to view mode when edit mode is cancelled', () => {
         const index = 0;
         const processingStatus = <ProcessingStatus>{
            status: MuiTableStatus.None
         };

         component.sort.active = 'id';
         component.sort.direction = 'asc';
         component.paginator.pageSize = 5;

         // we are following isolated testing pattern
         //  https://angular.io/guide/testing#!#isolated-v-testing-utilities
         // directly call ngOnChanges
         component.ngOnChanges({
            data: new SimpleChange(null, inlineTableData, false),
            processingStatus: new SimpleChange(null, processingStatus, false)
         });

         fixture.detectChanges();
         fixture.whenStable().then(() => {
            fixture.whenRenderingDone().then(() => {
               // detectChanges again to ensure that the UI is refreshed and the pager shows up correctly when viewed
               fixture.detectChanges();

               const tableRows = fixture.nativeElement.querySelectorAll(
                  'mat-row'
               );
               const rowCells = tableRows[index].querySelectorAll('mat-cell');
               const editActionPanel = rowCells[1].querySelectorAll(
                  '.ActionPanelEditButton'
               );
               const editButton = editActionPanel[0].childNodes[0];
               editButton.click();

               fixture.detectChanges();
               fixture.whenStable().then(() => {
                  fixture.whenRenderingDone().then(() => {
                     const cancelButtonPanel = rowCells[1].querySelectorAll(
                        '.ActionPanelCancelButton'
                     );
                     const cancelButton = cancelButtonPanel[0].childNodes[0];
                     cancelButton.click();

                     fixture.detectChanges();
                     fixture.whenStable().then(() => {
                        fixture.whenRenderingDone().then(() => {
                           validateTableBlock(1, 5, 31);
                        });
                     });
                  });
               });
            });
         });
      });

      it('should show valiation message for invalid record', () => {
         const index = 0;
         const processingStatus = <ProcessingStatus>{
            status: MuiTableStatus.None
         };

         component.paginator.pageSize = 5;

         // we are following isolated testing pattern
         //  https://angular.io/guide/testing#!#isolated-v-testing-utilities
         // directly call ngOnChanges
         component.ngOnChanges({
            data: new SimpleChange(null, inlineTableData, false),
            processingStatus: new SimpleChange(null, processingStatus, false)
         });

         fixture.detectChanges();
         fixture.whenStable().then(() => {
            fixture.whenRenderingDone().then(() => {
               // detectChanges again to ensure that the UI is refreshed and the pager shows up correctly when viewed
               fixture.detectChanges();

               spyOn(component.actionClicked, 'emit');

               const tableRows = fixture.nativeElement.querySelectorAll(
                  'mat-row'
               );
               const rowCells = tableRows[index].querySelectorAll('mat-cell');
               const editActionPanel = rowCells[1].querySelectorAll(
                  '.ActionPanelEditButton'
               );
               const editButton = editActionPanel[0].childNodes[0];
               editButton.click();

               fixture.detectChanges();
               fixture.whenStable().then(() => {
                  fixture.whenRenderingDone().then(() => {
                     // update the editRow to invalid
                     const input = rowCells[0].querySelectorAll('input');
                     assignInput(input, '');

                     const saveButtonPanel = rowCells[1].querySelectorAll(
                        '.ActionPanelSaveButton'
                     );
                     const saveButton = saveButtonPanel[0].childNodes[0];

                     saveButton.click();
                     fixture.detectChanges();
                     fixture.whenStable().then(() => {
                        fixture.whenRenderingDone().then(() => {
                           expect(
                              component.actionClicked.emit
                           ).not.toHaveBeenCalled();
                           expect(component.showErrorMessage).toBeTruthy();

                           const validationMessage = rowCells[1].querySelectorAll(
                              '.showErrorMessage'
                           );
                           expect(validationMessage[0].innerText).toBe(
                              'Alert: Please address all highlighted fields'
                           );
                        });
                     });
                  });
               });
            });
         });
      });

      it('should emit the validated record for processing by the caller', () => {
         const index = 0;
         const processingStatus = <ProcessingStatus>{
            status: MuiTableStatus.None
         };

         component.paginator.pageSize = 5;

         // we are following isolated testing pattern
         //  https://angular.io/guide/testing#!#isolated-v-testing-utilities
         // directly call ngOnChanges
         component.ngOnChanges({
            data: new SimpleChange(null, inlineTableData, false),
            processingStatus: new SimpleChange(null, processingStatus, false)
         });

         fixture.detectChanges();
         fixture.whenStable().then(() => {
            fixture.whenRenderingDone().then(() => {
               // detectChanges again to ensure that the UI is refreshed and the pager shows up correctly when viewed
               fixture.detectChanges();

               spyOn(component.actionClicked, 'emit');

               const tableRows = fixture.nativeElement.querySelectorAll(
                  'mat-row'
               );
               const rowCells = tableRows[index].querySelectorAll('mat-cell');
               const editActionPanel = rowCells[1].querySelectorAll(
                  '.ActionPanelEditButton'
               );
               const editButton = editActionPanel[0].childNodes[0];
               editButton.click();

               fixture.detectChanges();
               fixture.whenStable().then(() => {
                  fixture.whenRenderingDone().then(() => {
                     // update the editRow
                     const editData = Object.assign(inlineTableData[0]);
                     editData.name = 'DataItem 000';

                     const input = rowCells[0].querySelectorAll('input');
                     assignInput(input, editData.name);

                     const saveButtonPanel = rowCells[1].querySelectorAll(
                        '.ActionPanelSaveButton'
                     );
                     const saveButton = saveButtonPanel[0].childNodes[0];
                     expect(saveButton.innerText).toBe('check_circle');

                     saveButton.click();
                     fixture.detectChanges();
                     fixture.whenStable().then(() => {
                        fixture.whenRenderingDone().then(() => {
                           const action = <MuiTableAction>{
                              actionType: MuiColumnActionType.SaveChanges,
                              id: inlineTableData[0].id,
                              data: editData
                           };

                           expect(component.showErrorMessage).toBeFalsy();
                           expect(
                              component.actionClicked.emit
                           ).toHaveBeenCalledWith(action);
                        });
                     });
                  });
               });
            });
         });
      });
   });

   // describe('Add Mode of grid', () => {
   //    it('should show valiation message for invalid record', () => {
   //       spyOn(component.actionClicked, 'emit');
   //       const addButton = fixture.nativeElement.querySelectorAll('.addButton');
   //       const processingStatus = <ProcessingStatus>{
   //          status: MuiTableStatus.None
   //       };

   //       component.paginator.pageSize = 5;

   //       // we are following isolated testing pattern
   //       //  https://angular.io/guide/testing#!#isolated-v-testing-utilities
   //       // directly call ngOnChanges
   //       component.ngOnChanges({
   //          data: new SimpleChange(null, inlineTableData, false),
   //          processingStatus: new SimpleChange(null, processingStatus, false)
   //       });

   //       // update the editRow to invalid
   //       const input = fixture.debugElement.query(By.directive(MatInput));
   //       input.nativeElement.value = '';
   //       input.nativeElement.dispatchEvent(new Event('input'));
   //       fixture.detectChanges();

   //       fixture.whenStable().then(() => {
   //          expect(addButton[0].innerText).toBe('add_circle');
   //          addButton[0].childNodes[0].click();

   //          fixture.detectChanges();
   //          fixture.whenStable().then(() => {
   //             fixture.whenRenderingDone().then(() => {
   //                expect(component.actionClicked.emit).not.toHaveBeenCalled();
   //                expect(component.addForm.valid).toBeFalsy();

   //                const validationMessage = fixture.nativeElement.querySelectorAll('.showErrorMessage');
   //                expect(validationMessage[0].innerText).toBe('Alert: Please address all highlighted fields');
   //             });
   //          });
   //       });
   //    });

   //    it('should emit added record for caller processing', () => {
   //       spyOn(component.actionClicked, 'emit');
   //       const addButton = fixture.nativeElement.querySelectorAll('.addButton');
   //       const processingStatus = <ProcessingStatus>{
   //          status: MuiTableStatus.None
   //       };

   //       component.paginator.pageSize = 5;

   //       // we are following isolated testing pattern
   //       //  https://angular.io/guide/testing#!#isolated-v-testing-utilities
   //       // directly call ngOnChanges
   //       component.ngOnChanges({
   //          data: new SimpleChange(null, inlineTableData, false),
   //          processingStatus: new SimpleChange(null, processingStatus, false)
   //       });

   //       // update the editRow to invalid
   //       const input = fixture.debugElement.query(By.directive(MatInput));
   //       input.nativeElement.value = '123';
   //       input.nativeElement.dispatchEvent(new Event('input'));
   //       fixture.detectChanges();

   //       fixture.whenStable().then(() => {
   //          expect(addButton[0].innerText).toBe('add_circle');
   //          addButton[0].childNodes[0].click();

   //          fixture.detectChanges();
   //          fixture.whenStable().then(() => {
   //             fixture.whenRenderingDone().then(() => {
   //                expect(component.addForm.valid).toBeTruthy();
   //                expect(component.actionClicked.emit).toHaveBeenCalledWith({
   //                   actionType: 2,
   //                   id: null,
   //                   data: Object({name: '123'}),
   //                   isMultiPartForm: false
   //                });
   //             });
   //          });
   //       });
   //    });
   // });
});
