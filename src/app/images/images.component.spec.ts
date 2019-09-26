import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ImagesComponent } from './images.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MaterialUIModule } from '../yprime-artifacts/material-ui/material-ui.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Title } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { MuiTableControlType } from '../yprime-artifacts/components/mui-table/mui-table-controlType.model';

xdescribe('ImagesComponent', () => {
   let component: ImagesComponent;
   let fixture: ComponentFixture<ImagesComponent>;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         imports: [
            FormsModule,
            ReactiveFormsModule,
            RouterTestingModule,
            HttpClientTestingModule,
            MaterialUIModule,
            BrowserAnimationsModule
         ],
         declarations: [ImagesComponent],
         providers: [{ provide: Title, useClass: Title }],
         schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(ImagesComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });

   it('Should call ngOnInit twice, on the component and its super', () => {
      expect(ImagesComponent.prototype.ngOnInit).toHaveBeenCalledTimes(2);
      expect(component.apiUrl).toBeDefined();
      expect(component.entityDisplayName).toBeDefined();
   });

   it('should validate the columnNames for images', () => {
      expect(component.columnNames).toBeDefined();
      expect(component.columnNames.filter(c => c.isKey === true).length).toBe(
         1
      );
      expect(component.columnNames.length).toBe(6);
   });

   it('should validate data driven actionPanel for countries', () => {
      expect(component.columnNames).toBeDefined();
      const matches = component.columnNames.filter(
         c => c.id === 'actionPanel' && c.isVisible === true
      );
      expect(matches.length).toBe(1);
      expect(
         matches[0].MuiTableControlType ===
            MuiTableControlType.DataDrivenActionPanel
      ).toBeTruthy();
   });

   it('Page title should be images', () => {
      const titleService = TestBed.get(Title);
      expect(titleService.getTitle()).toBe('Images');
   });
});
