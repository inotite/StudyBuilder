import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
   name: 'formatBytes'
})
export class FormatBytesPipe implements PipeTransform {
   transform(size: number): string {
      const decimals = 2;
      if (!size) {
         return '0 Bytes';
      }
      const k = 1024;
      const dm = decimals < 0 ? 0 : decimals;
      const sizes = ['Bytes', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(size) / Math.log(k));

      return parseFloat((size / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
   }
}
