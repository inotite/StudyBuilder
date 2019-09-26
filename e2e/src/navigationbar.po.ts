import {AppPage} from './app.po';
import {element, by, ElementFinder} from 'protractor';

export class NavigationBar extends AppPage {
   async navigateTo(url: string = '/Countries'): Promise<any> {
      return await super.navigateTo(url);
   }

   async getIconClasses(): Promise<string> {
      return await this.getNavigationBar()
         .all(by.css('i'))
         .getAttribute('class');
   }

   async getTopButtonTexts(): Promise<string> {
      return await this.getNavigationBar()
         .all(by.css('button.nav-link'))
         .getText();
   }

   async checkYPrimeLogoExists(): Promise<boolean> {
      return await this.getNavigationBar()
         .all(by.css('img'))
         .isPresent();
   }

   async clickMenuHeader(name: string): Promise<void> {
      return await element(by.css(`button.nav-link.${name}`)).click();
   }

   async clickMenuLink(name: string): Promise<void> {
      return await element(by.css(`button.dropdown-item.${name}`)).click();
   }

   async getVisibleSubButtonTexts(): Promise<string> {
      return await this.getNavigationBar()
         .all(by.css('button[aria-expanded="true"] + div button'))
         .getText();
   }

   async getAllSubButtonTexts(): Promise<string> {
      return await this.getNavigationBar()
         .all(by.css('#collapsingNavbar button.dropdown-item'))
         .getText();
   }

   private getNavigationBar(): ElementFinder {
      return element(by.css('#menubar'));
   }

   async getFooterTexts(): Promise<string> {
      return await this.getFooter()
         .getText();
   }

   private getFooter(): ElementFinder {
      return element(by.tagName('footer'));
   }
}
