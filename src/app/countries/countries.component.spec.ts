import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MuiInlineTableComponent} from '../yprime-artifacts/components/mui-table/mui-inline-table/mui-inline-table.component';
import {PipeHelper} from '../yprime-artifacts/pipes/pipe-helper';
import {CountriesComponent} from './countries.component';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {MaterialUIModule} from '../yprime-artifacts/material-ui/material-ui.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Title} from '@angular/platform-browser';
import {MuiTableControlType} from '../yprime-artifacts/components/mui-table/mui-table-controlType.model';

describe('CountriesComponent', () => {
   let component: CountriesComponent;
   let fixture: ComponentFixture<CountriesComponent>;
   beforeEach(async(() => {
      TestBed.configureTestingModule({
         imports: [FormsModule, ReactiveFormsModule, HttpClientTestingModule, MaterialUIModule, BrowserAnimationsModule],
         declarations: [CountriesComponent, MuiInlineTableComponent, PipeHelper],
         providers: [{provide: Title, useClass: Title}],
         schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(CountriesComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   beforeAll(function() {
      spyOn(CountriesComponent.prototype, 'ngOnInit').and.callThrough();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });

   it('Should call ngOnInit twice, on the component and its super', () => {
      expect(CountriesComponent.prototype.ngOnInit).toHaveBeenCalledTimes(2);
      expect(component.apiUrl).toBeDefined();
      expect(component.entityDisplayName).toBeDefined();
   });

   it('should validate the columnNames for countries', () => {
      expect(component.columnNames).toBeDefined();
      expect(component.columnNames.filter(c => c.isKey === true).length).toBe(1);
      expect(component.columnNames.length).toBe(7);
   });

   it('should validate data driven actionPanel for countries', () => {
      expect(component.columnNames).toBeDefined();
      const matches = component.columnNames.filter(c => c.id === 'actionPanel' && c.isVisible === true);
      expect(matches.length).toBe(1);
      expect(matches[0].MuiTableControlType === MuiTableControlType.DataDrivenActionPanel).toBeTruthy();
   });

   it('Page title should be countries', () => {
      const titleService = TestBed.get(Title);
      expect(titleService.getTitle()).toBe('Countries');
   });
});
