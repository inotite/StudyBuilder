export class DashCaseHelper {
   transform(value: string, args?: any): string {
      return value.replace(' ', '-').toLowerCase();
   }
}
