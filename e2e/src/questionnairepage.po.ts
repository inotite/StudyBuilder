import {AppPage, Button} from './app.po';
import {element, by, ElementFinder, browser} from 'protractor';

export class QuestionnairePage extends AppPage {
   async clickButtonByText(text: string): Promise<void> {
      let buttonId: any;
      switch (text) {
         case Button.SaveChanges: {
            buttonId = 'saveQuestionnaire';
            break;
         }
         case Button.Cancel: {
            buttonId = 'cancelQuestionnaire';
            break;
         }
         case Button.CreateQuestionnaire: {
            buttonId = 'addQuestionnaire';
            break;
         }
      }
      return await this.clickButtonById(buttonId);
   }

   async checkSaveQuestionnaireButtonExists(): Promise<boolean> {
      return await element(by.id('saveQuestionnaire')).isPresent();
   }

   async checkCancelQuestionnaireButtonExists(): Promise<boolean> {
      return await element(by.id('cancelQuestionnaire')).isPresent();
   }

   async checkRichTextEditoryIconExists(): Promise<boolean> {
      const icon = await this.getElementById('richTextEditorIcon');
      return await icon.isPresent();
   }
   async checkTranslationIconExists(): Promise<boolean> {
      const icon = await this.getElementById('richTextEditorIcon');
      return await icon.isPresent();
   }

   async checkAddQuestionnaireButtonExists(): Promise<boolean> {
      const elem = await this.getElementById('addQuestionnaire');
      return await elem.isPresent();
   }

   async checkDeviceTypeDropDownExists(): Promise<boolean> {
      const elem = await this.getElementById('deviceType');
      return await elem.isPresent();
   }

   async clickAddQuestionnaireButton(): Promise<void> {
      const elem = await this.getElementById('addQuestionnaire');

      await browser
         .actions()
         .mouseMove(elem)
         .perform();

      await browser
         .actions()
         .click()
         .perform();
   }

   async checkLeftPanelDisabled(): Promise<string> {
      const elem = await this.getElementById('addQuestionnaire');
      return await elem.getAttribute('disabled');
   }

   async checkDragDropListIsDisplayed(cssClassName: string, listTitle: string): Promise<boolean> {
      return await this.getDragDropListByTitle(cssClassName, listTitle).isPresent();
   }

   async checkDragDropListDisplaysDefaultText(cssClassName: string, defaultText: string): Promise<boolean> {
      return await this.getDragDropListByDefaultText(cssClassName, defaultText);
   }

   private getDragDropListByTitle(cssClassName: string, listTitle: string): ElementFinder {
      return element(by.cssContainingText(cssClassName, listTitle));
   }

   async getDragDropListByDefaultText(cssClassName: string, defaultText: string): Promise<boolean> {
      return await element(by.xpath(`//div[@data-text='${defaultText}']`)).isPresent();
   }

   public async checkCompletedQuestionnaireResponsesDaysEnabled(): Promise<boolean> {
      return await element(by.id('previousDaysEdit')).isEnabled();
   }

   public async getBusinessRuleValueOption(businessRuleFieldLabel: string, optionLabel: string): Promise<ElementFinder> {
      const brlElem = await this.getLabelElement(businessRuleFieldLabel);
      const rgElem = await this.closestByCss(brlElem, 'mat-radio-group');
      const olElem = await this.closestByCssContainingText(rgElem, 'div.mat-radio-label-content', optionLabel);

      return await this.closestByCss(olElem, 'mat-radio-button');
   }

   async getNoQuestionnaireDisplayText(): Promise<string> {
      return await element(by.id('noQuestionnaire')).getText();
   }

   async getQuestionnaireDisplayText(displayText: string): Promise<string> {
      return await element(by.cssContainingText('li', displayText)).getText();
   }
}
