import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SubjectInformationComponent } from './subject-information.component';
// tslint:disable-next-line: max-line-length
import { MuiDynamicColsTableComponent } from '../yprime-artifacts/components/mui-table/mui-dynamic-cols-table/mui-dynamic-cols-table.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { MaterialUIModule } from '../yprime-artifacts/material-ui/material-ui.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PipeHelper } from '../yprime-artifacts/pipes/pipe-helper';
import { Title } from '@angular/platform-browser';

describe('SubjectInformationComponent', () => {
   let component: SubjectInformationComponent;
   let fixture: ComponentFixture<SubjectInformationComponent>;

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
            SubjectInformationComponent,
            MuiDynamicColsTableComponent,
            PipeHelper
         ],
         providers: [{ provide: Title, useClass: Title }],
         schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(SubjectInformationComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });
});
