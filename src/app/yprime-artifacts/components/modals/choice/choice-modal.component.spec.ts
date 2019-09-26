import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChoiceModalComponent } from './choice-modal.component';
import { MuiOptionChoice } from '../../mui-table/mui-option-choice.model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// tslint:disable-next-line: max-line-length
import { MuiDynamicColsTableComponent } from '../../mui-table/mui-dynamic-cols-table/mui-dynamic-cols-table.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { MaterialUIModule } from '../../../material-ui/material-ui.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PipeHelper } from '../../../pipes/pipe-helper';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

describe('ChoiceModalComponent', () => {
   let component: ChoiceModalComponent<MuiOptionChoice>;
   let fixture: ComponentFixture<ChoiceModalComponent<MuiOptionChoice>>;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         imports: [
            FormsModule,
            ReactiveFormsModule,
            HttpClientTestingModule,
            MaterialUIModule,
            BrowserAnimationsModule
         ],
         declarations: [
            ChoiceModalComponent,
            MuiDynamicColsTableComponent,
            PipeHelper
         ],
         schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
         providers: [
            { provide: MatDialogRef, useValue: {} },
            { provide: MAT_DIALOG_DATA, useValue: {} }
         ]
      }).compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(ChoiceModalComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });
});
