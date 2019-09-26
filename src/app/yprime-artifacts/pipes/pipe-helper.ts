import {Pipe, PipeTransform} from '@angular/core';
import {FormatBytesPipe} from './format-bytes';

@Pipe({
   name: 'pipeHelper'
})
export class PipeHelper implements PipeTransform {
   transform(value: any, pipeName: any): any {
      if (pipeName === 'formatBytes') {
         const pipe = new FormatBytesPipe();
         return pipe.transform(value);
      }
   }
}
