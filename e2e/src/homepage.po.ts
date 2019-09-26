import {by, element, ElementFinder, browser, promise, $} from 'protractor';
import {AppPage} from './app.po';

export class HomePage extends AppPage {
   async getStudyTypeDropdown(): Promise<string> {
      return await this.getDropdownSelect('#homeDropdown select').then(async elem => await elem.getText());
   }

   async selectOptionByIndex(index: number, css: string): Promise<any> {
      const homeDropdownSelect = await this.getDropdownSelect(css);

      const deferred = promise.defer();
      browser
         .executeScript(
            'arguments[0].selectedIndex = arguments[1];' + 'arguments[0].dispatchEvent(new Event("change"));',
            homeDropdownSelect,
            index
         )
         .then(function() {
            deferred.fulfill();
         });
      return deferred.promise;
   }

   async iconNamesForSection(sectionName: string): Promise<string[]> {
      const rows = await element.all(by.css('app-home-horizontal-row, app-home-vertical-row'));

      let result: string[] = [];

      for (const row of rows) {
         if (row.any(by.cssContainingText('div.header-cell label, div.header-title label', sectionName))) {
            result = await row.all(by.css('app-home-icon')).getText();
         }
      }

      return result;
   }

   async iconNameByCssClass(cssClass: string): Promise<string> {
      return await element.all(by.css(`div.home-icon-wrapper span.fa-stack:has(i.fa.${cssClass}) + label.icon-title`)).getText();
   }

   async iconsArePresent(): Promise<boolean> {
      return await element(by.css('app-home-icon')).isPresent();
   }

   async getIconNameList(): Promise<string> {
      return await element.all(by.css('app-home-icon')).getText();
   }

   async getIconCodeList(): Promise<string> {
      return await element
         .all(by.css('app-home-icon'))
         .all(by.tagName('i'))
         .getAttribute('class');
   }

   async getLinkDisplayText(): Promise<string> {
      return await element(by.tagName('app-home-vertical-row'))
         .all(by.tagName('a'))
         .getText();
   }

   async isFooterPresent(): Promise<boolean> {
      return await element(by.tagName('footer')).isPresent();
   }
}
