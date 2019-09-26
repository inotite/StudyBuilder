import { TestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SetupService } from './setup.service';
import { HttpBasicCrudService } from 'src/app/yprime-artifacts/services/http-basic-crud.service';

describe('SetupService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
           provide: HttpBasicCrudService,
           useValue: HttpBasicCrudService
        }
     ],
     schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
   })
   .compileComponents();
  }));

  it('should be created', () => {
    const service: SetupService = TestBed.get(SetupService);
    expect(service).toBeTruthy();
  });
});
