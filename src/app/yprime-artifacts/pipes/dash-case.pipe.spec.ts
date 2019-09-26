import { DashCasePipe } from './dash-case.pipe';

describe('DashCasePipe', () => {
   let pipe: DashCasePipe;

   beforeEach(() => {
      pipe = new DashCasePipe();
   });

   it('create an instance', () => {
      expect(pipe).toBeTruthy();
   });

   it('will return the same string if there are no spaces with all lower case letters', () => {
      const text = 'testing';

      const result = pipe.transform(text);

      expect(result).toEqual(text);
   });

   it('will return the same string as lower case if there are no spaces with all upper case letters', () => {
      const text = 'TESTING';

      const result = pipe.transform(text);

      expect(result).toEqual(text.toLowerCase());
   });

   it('will return the same string if the text is all numbers', () => {
      const text = '0123456';

      const result = pipe.transform(text);

      expect(result).toEqual(text);
   });

   it('will return the same string if there are leters and numbers', () => {
      const text = 'a1B2C3d4';

      const result = pipe.transform(text);

      expect(result).toEqual(text.toLowerCase());
   });

   it('will return an empty string if the text is empty', () => {
      const text = '';

      const result = pipe.transform(text);

      expect(result).toEqual(text);
   });

   it('will replace all spaces with dashes', () => {
      const text = 'test string for dash replacement';
      const expected = text.replace(' ', '-');

      const result = pipe.transform(text);

      expect(result).toEqual(expected);
   });

   it('will replace double spaces with two dashes', () => {
      const text = 'test  string  for  dash replacement';

      const expected = text.replace(' ', '-');

      const result = pipe.transform(text);

      expect(result).toEqual(expected);
   });
});
