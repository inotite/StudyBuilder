import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
   name: 'dashCase'
})
export class DashCasePipe implements PipeTransform {
   transform(value: string, args?: any): string {
      return value.replace(' ', '-').toLowerCase();
   }
}
