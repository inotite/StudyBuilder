export class StringHelper {
   splitAndTrim(items: string, delimiter: string = null): string[] {
      const itemList = delimiter === null ? ((items as any) as string[]) : items.split(delimiter);

      return itemList.map((value: string) => value.trim());
   }

   splitAndTrimDeep(items: string, delimiter: string = ' '): string[] {
      let result: string[] = [];
      const itemList = this.splitAndTrim(items);

      itemList.forEach((child: string) => {
         result = result.concat(this.splitAndTrim(child, delimiter));
      });

      return result;
   }

   patternWithWhitespaces(searchText: string): RegExp {
      const leadingWhitespaces = '^\\s*';
      const trailingWhitespaces = '\\s*$';
      return new RegExp(leadingWhitespaces + searchText + trailingWhitespaces);
   }
}
