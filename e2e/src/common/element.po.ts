import { element, by, ElementFinder, browser } from 'protractor';

export class Element {
   /*
recursively finds a parent element of elem passed as parameter along with css selector, using inner text as contstraint
If if top level html element is found returns undefined.
*/
   async closestByCssContainingText(
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
         }
      }
   }

   /*
return element by id name
*/
   async getElementById(id: string): Promise<ElementFinder> {
      return await element(by.id(id));
   }

   /*
returns child element if found on parent by searching for parent and child label
*/
   async checkChildLabelExists(
      parentLabel: string,
      childLabel: string
   ): Promise<ElementFinder> {
      let parentElem = await element(
         by.cssContainingText('label', parentLabel)
      );
      if (!(await parentElem.isPresent())) {
         parentElem = await element(
            by.cssContainingText('mat-label', parentLabel)
         );
      }

      let childElem = await this.closestByCssContainingText(
         parentElem,
         'label',
         childLabel
      );
      if (!(await childElem.isPresent())) {
         childElem = await this.closestByCssContainingText(
            parentElem,
            'mat-label',
            parentLabel
         );
      }

      return childElem;
   }

   /*
return element by class
*/
   async getElementByClassName(cls: string): Promise<any> {
      const elem = await element(by.className(cls));

      return elem;
   }
   /*
return all elements that match css selector
*/

   async getAllElementsByCss(css: string): Promise<ElementFinder[]> {
      return await element.all(by.css(css));
   }
   /*
get element by id and return attribute value by attribute parameter
*/
   async getElementAttributeValueById(
      id: string,
      attribute: string
   ): Promise<string> {
      return await element(by.id(id)).getAttribute(attribute);
   }

   /*
return true if element is found by css selector and inner text
*/

   async checkElementExistsByCSS(
      elementTag: string,
      text: string
   ): Promise<boolean> {
      return await element(by.cssContainingText(elementTag, text)).isPresent();
   }
   /*
get element by css selector and inner text
*/
   async getElementByCssContainingText(
      elementTag: string,
      text: string
   ): Promise<ElementFinder> {
      return await element(by.cssContainingText(elementTag, text));
   }

   /*
get count of child elements by parent id as paramenter
*/
   async getChildElementCount(id: string): Promise<number> {
      const count = await element(by.id(id))
         .all(by.xpath('./*'))
         .count();
      return count;
   }

   /*
get count of child elements by parent css selector as paramenter
*/
   async getChildElementCountByCss(css: string): Promise<number> {
      const count = await element(by.css(css))
         .all(by.xpath('./*'))
         .count();
      return count;
   }

   /*
get element by css selector
*/
   getElementByCss(elementCss: string): ElementFinder {
      return element(by.css(elementCss));
   }

   /*
return true if page title element is found by css and title text
*/
   async checkTitleIsDisplayed(title: string): Promise<boolean> {
      const pageTitle = element.all(by.cssContainingText('h2', title));
      return await pageTitle.isPresent();
   }
}
