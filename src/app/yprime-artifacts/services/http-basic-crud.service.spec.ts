import { TestBed, async } from '@angular/core/testing';
import { HttpBasicCrudService } from './http-basic-crud.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseModel } from '../models/base.model';

export interface DummyData extends BaseModel<string> {
  name: string;
  actionPanel: boolean;
}

describe('HttpBasicCrudService', () => {
  const testHttpData: Array<DummyData> = [
    {
       id: 'c3d36544-3440-4baf-92fc-a6957da63e5b',
       name: 'TestA',
       actionPanel: false
    },
    {
       id: 'c3d36544-3440-4baf-92fc-a6957da63e5b',
       name: 'TestB',
       actionPanel: false
    }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [],
     schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
   })
   .compileComponents();
  }));

  it('should be created', () => {
    const service: HttpBasicCrudService = TestBed.get(HttpBasicCrudService);
    expect(service).toBeTruthy();
  });

  it('should call HttpBasicCrudService service get method', () => {
    const httpService: HttpClient = TestBed.get(HttpClient);
    spyOn(httpService, 'get').and.returnValues(of(testHttpData));
    const service: HttpBasicCrudService = TestBed.get(HttpBasicCrudService);
    service.get$<DummyData>('123').subscribe(res => {
      expect(res).toBe(testHttpData);
    });
    expect(httpService.get).toHaveBeenCalledWith('123', jasmine.any(Object));
  });

  it('should call HttpBasicCrudService service getData method', () => {
    const httpService: HttpClient = TestBed.get(HttpClient);
    spyOn(httpService, 'get').and.returnValues(of(testHttpData[0]));
    const service: HttpBasicCrudService = TestBed.get(HttpBasicCrudService);
    service.getData$<DummyData>('123').subscribe(res => {
      expect(res).toBe(testHttpData[0]);
    });
    expect(httpService.get).toHaveBeenCalledWith('123', jasmine.any(Object));
  });

  it('should call HttpBasicCrudService service getById method', () => {
    const httpService: HttpClient = TestBed.get(HttpClient);
    spyOn(httpService, 'get').and.returnValues(of(testHttpData[0]));
    const service: HttpBasicCrudService = TestBed.get(HttpBasicCrudService);
    service.getById$<DummyData>('123', 456).subscribe(res => {
      expect(res).toBe(testHttpData[0]);
    });
    expect(httpService.get).toHaveBeenCalledWith('123/456', jasmine.any(Object));
  });

  it('should call HttpBasicCrudService service delete method', () => {
    const httpService: HttpClient = TestBed.get(HttpClient);
    spyOn(httpService, 'delete').and.returnValue(of(true));
    const service: HttpBasicCrudService = TestBed.get(HttpBasicCrudService);
    service.delete$('123', 456).subscribe(res => {
      expect(res).toBeTruthy();
    });
    expect(httpService.delete).toHaveBeenCalledWith('123/456', jasmine.any(Object));
  });

  it('should call HttpBasicCrudService service add method', () => {
    const httpService: HttpClient = TestBed.get(HttpClient);
    spyOn(httpService, 'post').and.returnValue(of(testHttpData[0]));
    const service: HttpBasicCrudService = TestBed.get(HttpBasicCrudService);
    service.add$('123', testHttpData[0]).subscribe(res => {
      expect(res).toBe(testHttpData[0]);
    });
    expect(httpService.post).toHaveBeenCalledWith('123', testHttpData[0], jasmine.any(Object));
  });

  it('should call HttpBasicCrudService service update method', () => {
    const httpService: HttpClient = TestBed.get(HttpClient);
    spyOn(httpService, 'put').and.returnValue(of(true));
    const service: HttpBasicCrudService = TestBed.get(HttpBasicCrudService);
    service.update$('123', 'c3d36544-3440-4baf-92fc-a6957da63e5b', testHttpData[0]).subscribe((res) => {
      expect(res).toBeTruthy();
    });
    expect(httpService.put).toHaveBeenCalledWith('123/c3d36544-3440-4baf-92fc-a6957da63e5b',
      testHttpData[0], jasmine.any(Object));
  });

  it('should call HttpBasicCrudService service and handle failures', () => {
    const httpService: HttpClient = TestBed.get(HttpClient);
    spyOn(httpService, 'post').and.returnValue(throwError({
      status: 422,
      error: {
        message: 'Test 422 error'
      }
    }));

    const service: HttpBasicCrudService = TestBed.get(HttpBasicCrudService);
    service.add$('123', testHttpData[0]).subscribe(() => {},
    (err) => { expect(err.status).toBe(422); });
  });
});
