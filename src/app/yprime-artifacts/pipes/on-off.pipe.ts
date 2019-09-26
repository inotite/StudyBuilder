import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
   name: 'onOff'
})
export class OnOffPipe implements PipeTransform {
   transform(value: boolean, args?: any): string {
      return value ? 'On' : 'Off';
   }
}
