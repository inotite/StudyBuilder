import { TestBed } from '@angular/core/testing';
import { ExceptionService } from './exception.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiError } from '../models/apiError.model';

describe('ExceptionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExceptionService = TestBed.get(ExceptionService);
    expect(service).toBeTruthy();
  });

  it('should handle null and convert to default format', () => {
    const apiError: Array<ApiError> = null;
    const err = new HttpErrorResponse({error: apiError, status: 400, statusText: 'Bad Request'});
    const service: ExceptionService = TestBed.get(ExceptionService);
    expect(service.getUserDisplayMessage(err)).toBe('Api returned 400: Bad Request');
  });

  it('should handle empty array and convert to default format', () => {
    const apiError: Array<ApiError> = [];
    const err = new HttpErrorResponse({error: apiError, status: 400, statusText: 'Bad Request'});
    const service: ExceptionService = TestBed.get(ExceptionService);
    expect(service.getUserDisplayMessage(err)).toBe('Api returned 400: Bad Request');
  });

  it('should handle null and convert to default format', () => {
    const err = new HttpErrorResponse({error: 'No Change', status: 400, statusText: 'Bad Request'});
    const service: ExceptionService = TestBed.get(ExceptionService);
    expect(service.getUserDisplayMessage(err)).toBe('Api returned 400: Bad Request');
  });

  it('should handle http errors and convert to a user display string format', () => {
    const apiError: Array<ApiError> = [{
      code: 'ValidationError',
      message: 'haha this must be unique',
      target: '',
      details: []
    }];

    const err = new HttpErrorResponse({error: apiError, status: 400, statusText: 'Bad Request'});
    const service: ExceptionService = TestBed.get(ExceptionService);
    expect(service.getUserDisplayMessage(err)).toBe('haha this must be unique');
  });

  it('should handle arrays and convert to a user display string format', () => {
    const apiError: Array<ApiError> = [
    {
      code: 'MainError',
      message: 'One',
      target: '',
      details: [
        {
          code: 'ValidationError',
          message: 'PARTA',
          target: '',
          details: []
        },
        {
          code: 'ValidationError',
          message: 'PARTB',
          target: '',
          details: []
        }
      ]
    },
    {
      code: 'OtherError',
      message: 'Two',
      target: '',
      details: []
    }
  ];

    const err = new HttpErrorResponse({error: apiError, status: 400, statusText: 'Bad Request'});
    const service: ExceptionService = TestBed.get(ExceptionService);
    expect(service.getUserDisplayMessage(err)).toBe('One, PARTA , PARTB , Two');
  });
});
