import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MuiInlineTableComponent} from '../yprime-artifacts/components/mui-table/mui-inline-table/mui-inline-table.component';
import {PipeHelper} from '../yprime-artifacts/pipes/pipe-helper';
import {LanguagesComponent} from './languages.component';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {MaterialUIModule} from '../yprime-artifacts/material-ui/material-ui.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Title} from '@angular/platform-browser';
import {MuiTableControlType} from '../yprime-artifacts/components/mui-table/mui-table-controlType.model';
import {SetupService} from '../shared/services/setup.service';
import {of} from 'rxjs';
import {ExceptionService} from '../yprime-artifacts/services/exception.service';

xdescribe('LanguagesComponent', () => {
   let component: LanguagesComponent;
   let fixture: ComponentFixture<LanguagesComponent>;
   const setupServiceStub: any = {};
   const exceptionServiceStub: any = {};
   const inlineTableTestModel = [
      {
         id: 'c3d36544-3440-4baf-92fc-a6957da63e5b',
         name: 'TestA'
      },
      {
         id: 'c3d36544-3440-4baf-92fc-a6957da63e5b',
         name: 'TestB'
      }
   ];

   const optionModel = [
      {
         id: 'c3d36544-3440-4baf-92fc-a6957da63e5b',
         name: 'TestA'
      }
   ];

   beforeEach(() => {
      exceptionServiceStub.getUserDisplayMessage = jasmine.createSpy('getUserDisplayMessage$').and.callFake(() => '');

      setupServiceStub.getAvailableLanguages$ = jasmine.createSpy('getAvailableLanguages$').and.callFake(() => of(inlineTableTestModel));
      setupServiceStub.getDefaultLanguage$ = jasmine.createSpy('getDefaultLanguage$').and.callFake(() => of(optionModel));
   });

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         imports: [FormsModule, ReactiveFormsModule, HttpClientTestingModule, MaterialUIModule, BrowserAnimationsModule],
         declarations: [LanguagesComponent, MuiInlineTableComponent, PipeHelper],
         providers: [
            {provide: Title, useClass: Title},
            {
               provide: SetupService,
               useValue: setupServiceStub
            },
            {
               provide: ExceptionService,
               useValue: exceptionServiceStub
            }
         ],
         schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(LanguagesComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   beforeAll(function() {
      spyOn(LanguagesComponent.prototype, 'ngOnInit').and.callThrough();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });

   it('Should call ngOnInit twice, on the component and its super', () => {
      expect(LanguagesComponent.prototype.ngOnInit).toHaveBeenCalledTimes(2);
      expect(component.apiUrl).toBeDefined();
      expect(component.entityDisplayName).toBeDefined();
   });

   it('should validate the columnNames for languages', () => {
      expect(component.columnNames).toBeDefined();
      expect(component.columnNames.filter(c => c.isKey === true).length).toBe(1);
      expect(component.columnNames.length).toBe(9);
   });

   it('should validate data driven actionPanel for languages', () => {
      expect(component.columnNames).toBeDefined();
      const matches = component.columnNames.filter(c => c.id === 'actionPanel' && c.isVisible === true);
      expect(matches.length).toBe(1);
      expect(matches[0].MuiTableControlType === MuiTableControlType.DataDrivenActionPanel).toBeTruthy();
   });

   it('Page title should be languages', () => {
      const titleService = TestBed.get(Title);
      expect(titleService.getTitle()).toBe('Languages');
   });
});
