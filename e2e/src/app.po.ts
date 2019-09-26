import { browser, ElementFinder, element, by } from 'protractor';
import { Controls } from './common/controls.po';

export enum Button {
   SaveChanges = 'SAVE CHANGES',
   Cancel = 'CANCEL',
   CreateQuestionnaire = 'CREATE QUESTIONNAIRE'
}

export class AppPage extends Controls {
   async navigateTo(url: string = '/'): Promise<any> {
      url = url[0] === '/' ? url : '/' + url;
      if (url.length > 1) {
         url = url[0] + url[1].toUpperCase() + url.slice(2);
      }

      if (url.length === 0 && (await this.checkNavigationBarExists())) {
         return await this.clickHomePageIconLink();
      } else {
         return await browser.get(url);
      }
   }

   async checkNavigationBarExists(): Promise<boolean> {
      return await element(by.id('menubar')).isPresent();
   }

   async getHomePageIconLink(): Promise<ElementFinder> {
      return element(by.id('yPrime-nav-logo'));
   }

   async clickHomePageIconLink(): Promise<any> {
      const home = await this.getHomePageIconLink();
      return await home.click();
   }

   async getIconButtonElement(id: any): Promise<any> {
      return await element(by.css(`span.${id} button span mat-icon`));
   }

   async getGridHeaderElement(headerName: any): Promise<any> {
      const header = await element(
         by.cssContainingText('button.mat-sort-header-button', headerName)
      );

      return header;
   }

   async hasClass(elem: ElementFinder, cls: string): Promise<Boolean> {
      return await elem.getAttribute('class').then(async classes => {
         return (await classes.split(' ').indexOf(cls)) !== -1;
      });
   }

   async clickIconLink(linkName: string): Promise<void> {
      await element(by.linkText(linkName)).click();
   }

   async SwitchToNewlyOpenedTab(): Promise<void> {
      const handles = await browser.getAllWindowHandles();
      const newTabHandle = handles[1];
      await browser.switchTo().window(newTabHandle);
   }

   async moveMouseToElem(elem: ElementFinder): Promise<void> {
      await browser
         .actions()
         .mouseMove(elem)
         .perform();
   }

   /* helper function to click the page, useful for closing dropdowns, etc */
   async clickPageTitle(): Promise<void> {
      const elem = await element(by.id('body-title'));
      await browser
         .actions()
         .mouseMove(elem)
         .perform();

      await browser
         .actions()
         .click()
         .perform();
   }

   async onCorrectPage(pageHeader: string): Promise<boolean> {
      const page = element.all(by.cssContainingText('h2', pageHeader));
      return await page.isPresent();
   }
}
