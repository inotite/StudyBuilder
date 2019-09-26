import {AppPage} from '../app.po';
import {element, by, ElementFinder, browser, protractor, promise} from 'protractor';
import {ButtonClassMap} from './controls.po';
import {MuiTableColumn} from '../../../src/app/yprime-artifacts/components/mui-table/mui-table-column.model';
import {MuiTableControlType} from '../../../src/app/yprime-artifacts/components/mui-table/mui-table-controlType.model';

export const ROW_COLOR_HIGHLIGHTED = 'rgba(65, 214, 182, 0.1)';

export class GridPage extends AppPage {
   /*
   return true if all row elements are displayed in grid. table parameter is supplied from feature file scenario
   displayedColumns are used to dynamically map table rows to grid.
   */
   async gridDataIsDisplayed(displayedColumns: Array<MuiTableColumn>, table: any, columnKey: string): Promise<Boolean> {
      let isDisplayed;
      const arrayLength = displayedColumns.length;
      const rows = table.rows();
      for (const tableRow of rows) {
         const nameCol: ElementFinder = await this.getElementByCssContainingText(`.mat-column-${columnKey}`, tableRow[0]);
         const gridRow = await this.getGridRowOfCell(nameCol);

         for (let index = 0; index < arrayLength; index++) {
            const col = displayedColumns[index];
            const elem = await gridRow.element(by.css(`.mat-column-${col.id}`));
            const defaultValue: string = await this.getGridCellDefaultValue(col.MuiTableControlType, elem);
            const expectedValue =
               col.MuiTableControlType === MuiTableControlType.MultiChoiceDropdown
                  ? tableRow[index]
                       .toUpperCase()
                       .replace(/[, ]+/g, '')
                       .trim()
                  : tableRow[index].toUpperCase();

            isDisplayed = defaultValue.toUpperCase() === expectedValue;

            if (!isDisplayed) {
               return isDisplayed;
            }
         }
      }

      return isDisplayed;
   }

   /*
get value of of grid cell element by control type enum value
*/
   async getGridCellDefaultValue(type: MuiTableControlType, elem: ElementFinder): Promise<ElementFinder> {
      let defaultValue: any;
      switch (type) {
         case MuiTableControlType.ReadOnlyList: {
            const textElem = await elem.element(by.css('div span span app-expandable-list div span'));
            defaultValue = (await textElem.isPresent()) ? await textElem.getText() : '';
            break;
         }
         case MuiTableControlType.Text: {
            defaultValue = await elem.getText();
            break;
         }
         case MuiTableControlType.SingleDropdown: {
            defaultValue = await elem.getText();
            break;
         }
         case MuiTableControlType.MultiChoiceDropdown: {
            let text = '';
            const spanElements = await elem.all(by.css('.expandedMessage span'));
            for (const span of spanElements) {
               text += await span.getText();
            }

            defaultValue = text.replace(/[, ]+/g, '').trim();
            break;
         }
         case MuiTableControlType.Label: {
            defaultValue = await elem.getText();
            break;
         }
         case MuiTableControlType.Slider: {
            const toggle = await elem.element(by.css('div span span mat-slide-toggle'));
            defaultValue = await toggle.getAttribute('ng-reflect-checked');
            break;
         }
         case MuiTableControlType.ReadOnlyCheck: {
            const iconElem = await elem.element(by.css('div span span'));
            const isPresent = await iconElem.element(by.cssContainingText('mat-icon', 'done')).isPresent();
            defaultValue = isPresent ? '' : 'Off';
            break;
         }
         default: {
            defaultValue = undefined;
         }
      }

      return defaultValue;
   }

   /*
get element in grid by element type and text value
*/
   async getGridCellElementByType(type: string, value: string): Promise<ElementFinder> {
      let elem: ElementFinder;

      switch (type) {
         case 'text': {
            elem = await element(by.cssContainingText('mat-cell div span span', value));
            break;
         }
         case 'input': {
            elem = await element(by.css('mat-cell div span span mat-form-field div div div input'));
            break;
         }
         case 'multi-select': {
            elem = await element(by.css('mat-cell div span span mat-form-field div div div mat-select'));
            break;
         }
         default: {
            elem = undefined;
         }
      }

      return elem;
   }

   /*
method to search for row element if paging is required
*/
   async getGridCellElement(type: string, value: string): Promise<any> {
      let isPresent = false;
      let isLastPage = false;
      await this.firstGridPage(); // set to start from first page

      while (true) {
         const elem = await this.getGridCellElementByType(type, value);
         isPresent = await elem.isPresent();

         if (isPresent) {
            return elem;
         } else if (isLastPage) {
            return undefined;
         } else {
            isLastPage = await this.nextGridPage();
         }
      }
   }

   /*
return all rows in grid by material row element
*/
   async getAllGridRows(): Promise<ElementFinder[]> {
      const rows = await element.all(by.css('mat-row'));

      return rows;
   }

   /*
get parent row element of cell element
*/
   async getGridRowOfCell(startingElement: ElementFinder): Promise<ElementFinder> {
      let elem = startingElement;
      while (true) {
         const tagName = await elem.getTagName();
         if (tagName === 'html') {
            return undefined;
         }

         const isRowElem = await this.hasClass(elem, 'mat-row');
         if (isRowElem) {
            return elem;
         } else {
            elem = await elem.element(by.xpath('..'));
         }
      }
   }

   /*
get button in grid row by button name
*/
   async getButtonInRow(row: ElementFinder, buttonName: string): Promise<ElementFinder> {
      const buttonClass = ButtonClassMap[buttonName];
      const cell: ElementFinder = await row.element(by.className('mat-column-actionPanel'));
      const button: ElementFinder = await cell.element(by.css(`.${buttonClass} button`));

      return await button;
   }

   /*
click button in grid row by  button name
*/
   async clickActionButton(row: ElementFinder, buttonName: string): Promise<void> {
      const buttonClass = ButtonClassMap[buttonName];
      const cell: ElementFinder = await row.element(by.className('mat-column-actionPanel'));
      const button: ElementFinder = await cell.element(by.css(`.${buttonClass} button`));

      return await button.click();
   }

   /*
check if element is button or text. used for checking if grid row is in edit mode
*/
   elementTypeByActionButton(buttonName: string) {
      const buttonClass = ButtonClassMap[buttonName];
      const elemType = buttonClass === 'ActionPanelSaveButton' || buttonClass === 'ActionPanelCancelButton' ? 'input' : 'text';

      return elemType;
   }

   /*
   click next page arrow button if not disabled. if disabled then grid is on last page
   */
   async nextGridPage(): Promise<boolean> {
      const elem = await element(by.css('button.mat-paginator-navigation-next.mat-icon-button'));

      return await this.clickButton(elem);
   }

   /*
   click first page arrow button if not disabled. if disabled then grid is on first page
   */
   async firstGridPage(): Promise<boolean> {
      const elem = await element(by.css('button.mat-paginator-navigation-first.mat-icon-button'));

      return await this.clickButton(elem);
   }

   /*
   click button if not disabled
   */
   async clickButton(btn: ElementFinder): Promise<boolean> {
      const disabled: boolean = (await btn.getAttribute('disabled')) === 'true';

      if (!disabled) {
         await btn.click();
      }

      return disabled;
   }

   /*
return true if row is highlighted
*/
   async gridRowIsHighlighted(elem: ElementFinder): Promise<boolean> {
      const color = await elem.getCssValue('background-color');

      return color === ROW_COLOR_HIGHLIGHTED;
   }

   /*
   get element list of all names (first column)
   */
   async getGridNameList(): Promise<string[]> {
      const nameList: string[] = [];
      const cssClass = '.mat-cell.cdk-column-name.mat-column-name.ng-star-inserted';
      let isLastPage = false;

      while (!isLastPage) {
         const names = await this.getAllElementsByCss(cssClass);
         for (const name of names) {
            const text = await name.getText();
            await nameList.push(text);
         }
         isLastPage = await this.nextGridPage();
      }

      return nameList;
   }

   /*
click button in header row (add / cancel, etc)
*/
   async clickIconButton(name: string): Promise<any> {
      const id = await this.getButtonIconId(name);
      const elem = await this.getIconButtonElement(id);
      await elem.click();
   }

   /*
   get grid row button by name and cell value
   */
   async getGridRowByCellValue(cellValue: string): Promise<ElementFinder> {
      const elem = await this.getGridCellElement('text', cellValue);
      return await this.getGridRowOfCell(elem);
   }

   /*
   get grid row button by name and cell value
   */
   async getGridRowButton(buttonName: string, cellValue: string): Promise<ElementFinder> {
      const row: ElementFinder = await this.getGridRowByCellValue(cellValue);
      return await this.getButtonInRow(row, buttonName);
   }

   /*
   check if grid row button is enabled
   */
   async isRowButtonEnabled(buttonName: string, cellValue: string): Promise<Boolean> {
      const button = await this.getGridRowButton(buttonName, cellValue);
      return await !!button.getAttribute('disabled');
   }

   /*
   hover over grid button
   */
   async hoverOverButton(buttonName: string, cellValue: string): Promise<void> {
      const button = await this.getGridRowButton(buttonName, cellValue);
      await this.moveMouseToElem(button);
   }

   /*
   getting a element tooltip with css
   */
   async getElementTooltipByCss(search: string): Promise<string> {
      const elem = await element(by.css(search));
      return await elem.getAttribute('title');
   }

   async getRowToggleButtonByColumn(rowName: string, columnId: string): Promise<ElementFinder> {
      const row = await this.getGridRowByCellValue(rowName);
      return await row.element(by.css('input.mat-slide-toggle-input[name="' + columnId + '"]'));
   }

   /*
   get grid row button by name and cell value
   */
   async getRowInput(rowName: string, inputName: string): Promise<ElementFinder> {
      const row = await this.getGridRowByCellValue(rowName);
      return await row.element(by.css('input[ng-reflect-name="' + inputName + '"]'));
   }

   /*
   get toggle count by column id and value
   */
   async getColumnToggleCountByIdAndValue(columnId: string, value: boolean): Promise<number> {
      await this.firstGridPage();
      let result = 0;
      let isLastPage = false;

      while (!isLastPage) {
         result += await element.all(by.css(`input.mat-slide-toggle-input[name="${columnId}"][aria-checked="${value}"]`)).count();
         isLastPage = await this.nextGridPage();
      }

      return result;
   }

   /*
   checks if button is present in the row
   */
   async isButtonPresent(buttonName: string, rowName: string): Promise<boolean> {
      const elem = await this.getGridCellElement('text', rowName);
      const row: ElementFinder = await this.getGridRowOfCell(elem);

      const button = await this.getButtonInRow(row, buttonName);
      return await button.isPresent();
   }

   /*
   select multiple options in multi select dropdown
   */
   async multiselectRowDropdown(optionsText: string, dropDownLabel: string, rowName): Promise<void> {
      const elem = await this.getGridCellElement('text', rowName);
      const row: ElementFinder = await this.getGridRowOfCell(elem);
      const id = await this.getLabelFor(dropDownLabel);
      const multiselect = await row.element(by.css(`mat-select[id=${id}][aria-multiselectable="true"]`));
      await multiselect.click();
      const options: string[] = optionsText.split(',');
      options.forEach(async (optionText: string) => {
         const option = await this.getMatOptionByTextValue(optionText.trim());
         await option.click();
      });

      await this.clickPageTitle();
   }
}
