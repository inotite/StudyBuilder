import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageViewComponent } from './image-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MaterialUIModule } from '../yprime-artifacts/material-ui/material-ui.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Title } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpBasicCrudService } from '../yprime-artifacts/services/http-basic-crud.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('Images View Component', () => {
   let component: ImageViewComponent;
   let fixture: ComponentFixture<ImageViewComponent>;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         imports: [FormsModule, ReactiveFormsModule, RouterTestingModule,
            HttpClientTestingModule, MaterialUIModule, BrowserAnimationsModule],
         declarations: [ImageViewComponent],
         providers: [
            { provide: Title, useClass: Title },
            {
                  provide: HttpBasicCrudService,
                  useValue: HttpBasicCrudService
            }
         ],
         schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      })
      .compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(ImageViewComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });
});
