import { TestBed } from '@angular/core/testing';

import { HelperTextService } from './helper-text.service';
import { HelperText } from '../models/helper-text.model';

describe('HelperTextService', () => {
  let helperTextService: HelperTextService;
  const testData = {
    heading: 'Test heading',
    content: 'Test content',
    example: 'Test example',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    helperTextService = TestBed.get(HelperTextService);
  });

  it('should be created', () => {
    expect(helperTextService).toBeTruthy();
  });

  it('when getHelperText is called, will return an Observable with the test value', () => {
     let helperText: HelperText;

     helperTextService.getHelperText().subscribe((message) => {
        helperText = message.helperText;
     });

     helperTextService.setHelperText(testData);

     expect(helperText).toEqual(testData);
  });
});
