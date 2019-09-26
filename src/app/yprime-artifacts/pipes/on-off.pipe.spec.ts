import { OnOffPipe } from './on-off.pipe';

describe('OnOffPipe', () => {
   it('create an instance', () => {
      const pipe = new OnOffPipe();
      expect(pipe).toBeTruthy();
   });

   it('returns "On" if value is true', () => {
      const pipe = new OnOffPipe();
      expect(pipe.transform(true)).toEqual('On');
   });

   it('returns "Off" if value is false', () => {
      const pipe = new OnOffPipe();
      expect(pipe.transform(false)).toEqual('Off');
   });
});
