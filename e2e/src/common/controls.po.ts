import { element, by, ElementFinder, browser } from 'protractor';
import { Element } from './element.po';
import { StringHelper } from '../e2e-helper/string-helper';

const stringHelper = new StringHelper();

export enum ButtonIcon {
   Add = 'Add',
   Cancel = 'Cancel'
}

export enum FieldType {
   Dropdown = 'Dropdown',
   Togglebutton = 'Togglebutton',
   Inputtextbox = 'Inputtextbox',
   Radiobutton = 'Radiobutton',
   Numberinput = 'Numberinput',
   FileUpload = 'Fileupload',
   Textbox = 'Textbox'
}

/*
 A map for button names in scenarios to class name of element
*/
export let ButtonClassMap: { [key: string]: string } = {};
ButtonClassMap['Save changes icon'] = 'ActionPanelSaveButton';
ButtonClassMap['Cancel icon'] = 'ActionPanelCancelButton';
ButtonClassMap['Edit icon'] = 'ActionPanelEditButton';
ButtonClassMap['Delete icon'] = 'ActionPanelDeleteButton';
ButtonClassMap['No-Confirmation'] = 'button[mat-dialog-close]';
ButtonClassMap['Yes-Confirmation'] = 'span.yes-button  button';

/*
 A map for icon names in scenarios to get asset name of element
*/
export let IconNameMap: { [key: string]: string } = {};
IconNameMap['View Image'] = 'assets/file_image_upload.svg';

export class Controls extends Element {
   private selectedOptionSelector = 'span.mat-select-value-text';
   private matOptionByTextSelector = 'span.mat-option-text';

   /*
get control element by label name and control type
*/
   async getMatchingInput(
      label: string,
      fieldType: string
   ): Promise<ElementFinder> {
      let returnValue: ElementFinder;
      switch (fieldType) {
         case FieldType.Dropdown: {
            returnValue = await this.getMatDropdownByLabel(label);
            break;
         }
         case FieldType.Togglebutton: {
            returnValue = await this.getToggleByLabel(label);
            break;
         }
         case FieldType.Textbox:
         case FieldType.Inputtextbox: {
            returnValue = await this.getTextboxByLabel(label);
            break;
         }
         case FieldType.Radiobutton: {
            returnValue = await this.getRadiobuttonByLabel(label, 'True');
            break;
         }
         case FieldType.Numberinput: {
            returnValue = await this.getNumberInputByLabel(label);
            break;
         }
         case FieldType.FileUpload: {
            returnValue = await this.getUploadImageIcon();
            break;
         }
      }

      return returnValue;
   }

   /*
get radio group and click radio button using label name
*/
   async selectChildRadioGroupChoice(
      label: string,
      choiceLabel: string,
      fieldType: string
   ): Promise<ElementFinder> {
      const parentControl = await this.getMatchingInput(label, fieldType);
      const elem = await this.closestByCssContainingText(
         parentControl,
         'input[type=radio]',
         choiceLabel
      );

      browser
         .actions()
         .mouseMove(elem)
         .perform();

      browser
         .actions()
         .click()
         .perform();

      return elem;
   }

   // method works with mat-option material control
   async selectMatDropDownOption(
      dropDownLabel: string,
      valueToFind: string
   ): Promise<any> {
      try {
         const option = await this.getMatSelectOption(
            dropDownLabel,
            valueToFind
         );

         await option.click();
         return true;
      } catch (e) {
         return false;
      }
   }

   /*
   get dropdown element by label name. Click dropdown to display option list and select
   option by text.
   */
   async selectFromMatDropDown(
      dropDownLabelText: string,
      optionText: string
   ): Promise<any> {
      try {
         await (await this.getMatDropdownByLabel(dropDownLabelText)).click();
         const option = await this.getMatOptionByTextValue(optionText);
         // await browser
         //    .actions()
         //    .mouseMove(option)
         //    .perform();
         // await browser
         //    .actions()
         //    .click()
         //    .perform();
         await option.click();
      } catch (e) {
         await (await this.getMatDropdownByLabel(dropDownLabelText)).click();
         const option = await this.getMatOptionByTextValue(optionText);
         // await browser
         //    .actions()
         //    .mouseMove(option)
         //    .perform();

         // await browser
         //    .actions()
         //    .click()
         //    .perform();

         await option.click();
      }
   }

   async getSelectedOption(css: string): Promise<string> {
      return await this.getDropdownSelect(css).then(
         async elem =>
            await element(by.css('option:checked')).getAttribute('value')
      );
   }

   async selectOption(value: string, css: string): Promise<void> {
      await this.getDropdownSelect(css).then(
         async elem =>
            await elem.element(by.cssContainingText('option', value)).click()
      );
   }

   async getDropdownSelect(css: string): Promise<ElementFinder> {
      let isTimedOut = false;
      setTimeout(() => {
         isTimedOut = true;
      }, 60000); /* quit trying after a minute.*/
      while (!(await element(by.css(css)).isPresent()) && !isTimedOut) {
         continue;
      }
      return await element(by.css(css));
   }

   /*
   get radio group button by label name and element type. find radio option button by choice label
   */
   async getChildRadioGroupChoice(
      label: string,
      choiceLabel: string,
      fieldType: string
   ): Promise<ElementFinder> {
      const parentControl = await this.getMatchingInput(label, fieldType);
      const elem = await this.getFollowingSiblingByCssContainingText(
         parentControl,
         'mat-radio-button',
         choiceLabel
      );

      return elem;
   }

   /*
   returns id of button icon element by passing button name as parameter
   */

   async getButtonIconId(name: string): Promise<string> {
      let value: any;

      switch (name) {
         case ButtonIcon.Add: {
            value = 'addButton';
            break;
         }
         case ButtonIcon.Cancel: {
            value = 'cancelButton';
            break;
         }
      }

      return await value;
   }

   /*
   recursively finds a parent element of elem passed as parameter along with css selector,
   and check within each parent for sibling element using inner text as contstraint
   If if top level html element is found returns undefined.
   */
   async getFollowingSiblingByCssContainingText(
      startingElement: ElementFinder,
      css: string,
      searchText: string
   ): Promise<ElementFinder> {
      let elem = startingElement;
      while (true) {
         const tagName = await elem.getTagName();
         if (tagName === 'html') {
            return undefined;
         }

         const possibleElem = await element(
            by.cssContainingText(css, searchText)
         );

         if (await possibleElem.isPresent()) {
            return possibleElem;
         } else {
            elem = await elem.element(by.xpath('..'));
            if (
               await elem
                  .element(by.cssContainingText(css, searchText))
                  .isPresent()
            ) {
               return await elem.element(by.cssContainingText(css, searchText));
            }
         }
      }
   }

   /*
recursively finds a parent element of elem passed as parameter along with css selector
and check within each parent for sibling element
If if top level html element is found returns undefined.
*/
   async getFollowingSiblingByCss(
      startingElement: ElementFinder,
      css: string
   ): Promise<ElementFinder> {
      let elem = startingElement;
      while (true) {
         const tagName = await elem.getTagName();
         if (tagName === 'html') {
            return undefined;
         }

         const possibleElem = await elem.element(by.css(css));
         if (await possibleElem.isPresent()) {
            return possibleElem;
         } else {
            elem = await elem.element(by.xpath('..'));
            if (await elem.element(by.css(css)).isPresent()) {
               return await elem.element(by.css(css));
            }
         }
      }
   }

   /*
recursively finds a parent element of elem passed as parameter along with css selector
If if top level html element is found returns undefined.
*/
   async closestByCss(
      startingElement: ElementFinder,
      css: string
   ): Promise<ElementFinder> {
      let elem = startingElement;
      while (true) {
         const tagName = await elem.getTagName();
         if (tagName === 'html') {
            return undefined;
         }

         const possibleElem = await element(by.css(css));
         if (await possibleElem.isPresent()) {
            return possibleElem;
         } else {
            elem = await elem.element(by.xpath('..'));
         }
      }
   }

   /*
get radion button element by label name and text
*/
   async getRadiobuttonByLabel(
      label: string,
      optionLabel: string
   ): Promise<ElementFinder> {
      const labelElem = await element(by.cssContainingText('mat-label', label));
      const radioButtonText = await this.closestByCssContainingText(
         labelElem,
         'div.mat-radio-label-content span',
         optionLabel
      );
      const radioButton = await this.closestByCss(
         radioButtonText,
         'mat-radio-button'
      );

      return radioButton;
   }

   /*
get input type number element by label name
*/
   async getNumberInputByLabel(label: string): Promise<ElementFinder> {
      return await this.getFollowingSiblingByCss(
         await this.getLabelElement(label),
         'input[type=number]'
      );
   }

   /*
get dropdown element by label name and text. dropdown element id has to match label for attribute value.
*/
   async getMatDropdownByLabel(labelText: string): Promise<ElementFinder> {
      const label = await element(by.cssContainingText('label', labelText));
      const labelId = await label.getAttribute('for');

      return await element(by.id(labelId));
   }

   /*
get element by label name and text. dropdown element id has to match label for attribute value.
*/
   private async getTextboxByLabel(label: string): Promise<ElementFinder> {
      const labelId = await element(
         by.cssContainingText('label', label)
      ).getAttribute('for');
      return await element(by.id(labelId));
   }

   /*
get dropdown element by label name and return closest material select element
*/
   private async getDropdownByLabel(label: string): Promise<ElementFinder> {
      const labelElem = await this.getLabelElement(label);
      return await this.closestByCss(labelElem, 'mat-select');
   }

   /*
get label element by name, returns label or material label element
*/
   async getLabelElement(label: string): Promise<ElementFinder> {
      let elem = element(by.cssContainingText('mat-label', label));
      if (!(await elem.isPresent())) {
         elem = element(by.cssContainingText('label', label));
      }
      return await elem;
   }

   /*
get select options element by dropdown label name, click dropdown and return option element by text value
*/
   async getMatSelectOption(
      dropDownLabel: string,
      valueToFind: string
   ): Promise<ElementFinder> {
      const dropDown = await this.getMatDropdownByLabel(dropDownLabel);
      await dropDown.click();

      return await element(
         by.cssContainingText(this.matOptionByTextSelector, valueToFind)
      );
   }

   /*
find button by id and perform click action
*/

   async clickButtonById(id: string): Promise<void> {
      await element(by.id(id)).click();
   }

   /*
get material option element by option text value
*/
   async getMatOptionByTextValue(optionText): Promise<ElementFinder> {
      return await element(
         by.cssContainingText('.mat-option-text', optionText)
      );
   }

   /*
get toggle element by label name. toggle id must match label for attribute value
*/
   private async getToggleByLabel(labelText: string): Promise<ElementFinder> {
      const label = await this.getLabelElement(labelText);
      const labelId = await label.getAttribute('for');
      const toggle = await element(by.id(labelId));

      return toggle;
   }

   /*
get toggle element by label name and return checked attribute value
*/
   async getToggleCheckedStatus(
      label: string,
      checked: string
   ): Promise<string> {
      const elem = (await this.getLabelElement(label))
         .element(by.xpath('..'))
         .element(by.css('input[type=checkbox]'));

      browser
         .actions()
         .mouseMove(elem)
         .perform();

      if (
         checked.toUpperCase() === 'TRUE' &&
         (await elem.getAttribute('aria-checked')) === 'false'
      ) {
         browser
            .actions()
            .click()
            .perform();
      }

      if (
         checked.toUpperCase() === 'FALSE' &&
         (await elem.getAttribute('aria-checked')) === 'true'
      ) {
         browser
            .actions()
            .click()
            .perform();
      }

      return (await elem.getAttribute('aria-checked')) as string;
   }

   // method works with mat-select material control
   async getMatDropDownOptionsExist(
      dropDownLabel: string,
      valuesToFind: string
   ): Promise<boolean> {
      let returnVal = true;

      const optionList = stringHelper.splitAndTrim(valuesToFind, ',');

      for (let i = 0; i < optionList.length; ++i) {
         if (
            (await this.selectMatDropDownOption(
               dropDownLabel,
               optionList[i]
            )) === false
         ) {
            returnVal = await this.isMatDropdownSelectedOption(
               dropDownLabel,
               optionList[i]
            );
            break;
         }
      }

      return returnVal;
   }

   async getMatDropdownOptionsDoNotExist(
      dropDownLabel: string,
      valuesToFind: string
   ): Promise<boolean> {
      let result = true;

      if (valuesToFind.length > 0) {
         const optionList = stringHelper.splitAndTrim(valuesToFind, ',');
         for (let i = 0; i < optionList.length; i++) {
            const option = await this.getMatSelectOption(
               dropDownLabel,
               optionList[i]
            );
            result = result && !(await option.isPresent());
         }
      }

      return result;
   }

   /*
get placeholder or toggle value of element by control type
*/
   public async DefaultValue(
      fieldType: string,
      elem: ElementFinder
   ): Promise<string> {
      let returnValue: any;

      switch (fieldType) {
         case FieldType.Dropdown: {
            returnValue = await elem.getAttribute('ng-reflect-placeholder');
            break;
         }
         case FieldType.Togglebutton: {
            const toggle = elem.element(by.css('label div input'));
            returnValue = await toggle.getAttribute('aria-checked');
            break;
         }
         case FieldType.Inputtextbox: {
            returnValue = await elem.getAttribute('ng-reflect-placeholder');
            break;
         }
         case FieldType.Numberinput: {
            returnValue = await elem.getAttribute('ng-reflect-placeholder');
            break;
         }
         case FieldType.Textbox: {
            returnValue = (await elem.getText()).trim();
            break;
         }
      }
      return returnValue;
   }

   /*
click button of dialog pop up element using button name to map element id
*/
   async clickConfirmationButton(
      buttonName: string,
      elem: ElementFinder
   ): Promise<void> {
      const confirmationButton = ButtonClassMap[`${buttonName}-Confirmation`];
      const button = await elem.element(by.css(confirmationButton));
      await button.click();
   }

   /*
   boolean method to see if radio button is checked by class
   */
   async isRadioButtonSelected(
      label: string,
      choiceLabel: string,
      fieldType: string
   ): Promise<boolean> {
      const radioGroupChoice = await this.getChildRadioGroupChoice(
         label,
         choiceLabel,
         fieldType
      );
      await radioGroupChoice.click();
      const classes = await radioGroupChoice.getAttribute('class');
      return classes.includes('mat-radio-checked');
   }

   /*
   boolean method to see if option is selected by option text
   */
   private async isMatDropdownSelectedOption(
      dropDownLabel: string,
      option: string
   ): Promise<boolean> {
      let result = false;
      try {
         const dropDown = await this.getMatDropdownByLabel(dropDownLabel);
         result = await dropDown
            .element(by.cssContainingText(this.selectedOptionSelector, option))
            .isPresent();
      } catch (e) {
         result = false;
      }
      return result;
   }

   /*
   get element id by label
   */
   async getElementIdByLabel(labelText: string): Promise<string> {
      const label = await this.getLabelElement(labelText);
      return await label.getAttribute('for');
   }

   /*
   get mat-icon for given label
   */
   async getMatIconByLabel(
      label: ElementFinder,
      icon: string
   ): Promise<ElementFinder> {
      return await label.element(by.cssContainingText('mat-icon', icon));
   }

   /*
   get label for attribute which is usually Id parameter
   */
   async getLabelFor(labelText: string): Promise<string> {
      const label = await element(by.cssContainingText('label', labelText));
      return await label.getAttribute('for');
   }

   /*
   get the upload image icon
   */
   async getUploadImageIcon(): Promise<ElementFinder> {
      return await element(
         by.css(
            'app-file-upload > div > label > img[src="assets/file_image_upload.svg"]'
         )
      );
   }

   /*
   get the label icon
   */
   async getLabelIcon(
      labelText: string,
      iconName: string
   ): Promise<ElementFinder> {
      const labelElem = await this.getLabelElement(labelText);
      const labelId = await labelElem.getAttribute('for');
      const iconElem = await this.getElementById(labelId);
      const imgSrc = IconNameMap['View Image'];
      return iconElem.element(by.css(`img[src="${imgSrc}"]`));
   }
}
