import { Given, When, Then } from 'cucumber';
import { ElementFinder, browser, protractor, by } from 'protractor';
import { GridPage } from '../src/common/grid.po';

const chai = require('chai');
const expect = chai.expect;
const gridPage = new GridPage();

Given('I select {string} Study type', async (type: string) => {
   await gridPage.navigateTo().then(async data => {
      return await gridPage.selectOption(type, '#homeDropdown select');
   });
});

Given('caregiver {string} is added in the grid', async (value: string) => {});

Given('caregiver {string} is assigned to Subject', async (value: string) => {});

When('I click {string} icon button', async (name: string) => {
   await gridPage.clickIconButton(name);
});

When(
   'I hover over the caregiver {string} row in the grid',
   async (value: string) => {
      const elem = await gridPage.getGridCellElement('text', value);
      const row: ElementFinder = await gridPage.getGridRowOfCell(elem);
      await gridPage.moveMouseToElem(row);
   }
);

When(
   'I click {string} button for caregiver {string}',
   async (buttonName: string, value: string) => {
      const elemType = gridPage.elementTypeByActionButton(buttonName);
      const elem = await gridPage.getGridCellElement(elemType, value);
      const row: ElementFinder = await gridPage.getGridRowOfCell(elem);

      await gridPage.clickActionButton(row, buttonName);
   }
);

When(
   'I click {string} button on Confirmation pop-up with message {string}',
   async (buttonName: string, message: string) => {
      const elem = await gridPage.getAllElementsByCss('mat-dialog-container');
      await gridPage.clickConfirmationButton(buttonName, elem[0]);
   }
);

When(
   'I hover mouse over {string} button for caregiver {string}',
   async (buttonName: string, value: string) => {
      const elem = await gridPage.getGridCellElement('text', value);
      const row: ElementFinder = await gridPage.getGridRowOfCell(elem);
      const button = await gridPage.getButtonInRow(row, buttonName);

      browser
         .actions()
         .mouseMove(button)
         .perform();
   }
);

Then('following data is enabled', async table => {
   const data = table.rows();

   for (const value of data) {
      const elem: ElementFinder = await gridPage.getGridCellElement(
         'input',
         ''
      );
      const isInputForValue = await elem.getAttribute('ng-reflect-model');
      expect(isInputForValue).to.equal(value[0]);
   }
});

Then('following data is not enabled', async table => {
   const data = table.rows();

   for (const value of data) {
      const elem: ElementFinder = await gridPage.getGridCellElement(
         'text',
         value[0]
      );
      const isPresent = await elem.isPresent();
      expect(isPresent).to.equal(true);
   }
});

Then('page displays following data', async (dataTable: any) => {
   const data = dataTable.hashes();

   for (const value of data) {
      const elem = await gridPage.getMatchingInput(
         value.Label,
         value.Fieldtype
      );
      const exists = await elem.isPresent();
      const isEnabled = await elem.isEnabled();

      expect(exists).to.equal(true);
      expect(isEnabled.toString().toUpperCase()).to.equal(
         value.Enabled.toUpperCase()
      );

      if (value.Placeholder !== '') {
         const placeholder = await gridPage.DefaultValue(value.Fieldtype, elem);
         expect(placeholder.toUpperCase()).to.equal(
            value.Placeholder.toUpperCase()
         );
      }

      if (value.Defaultvalue !== '') {
         const defaultValue = await gridPage.DefaultValue(
            value.Fieldtype,
            elem
         );
         expect(defaultValue.toUpperCase()).to.equal(
            value.Defaultvalue.toUpperCase()
         );
      }
   }
});

Then('asterisk symbol is displayed for {string}', async (text: any) => {
   const elem = await gridPage.getElementByClassName('asterik');

   const isVisible = await elem.isDisplayed();
   expect(isVisible).to.equal(true);
});

Then('{string} icon button is displayed', async (name: any) => {
   const id = await gridPage.getButtonIconId(name);
   const elem = await gridPage.getIconButtonElement(id);

   const isVisible = await elem.isDisplayed();
   expect(isVisible).to.equal(true);
});

Then('{string} column header is displayed for grid', async (header: string) => {
   const elem = await gridPage.getGridHeaderElement(header);

   const isVisible = await elem.isDisplayed();
   expect(isVisible).to.equal(true);
});

Then('{string} text is not displayed', async (text: string) => {
   const elem = await gridPage.getElementByCssContainingText('span', text);

   const isVisible = await elem.isPresent();
   expect(isVisible).to.equal(false);
});

Then('grid displays following data', async table => {
   const rows = table.rows();
   for (const value of rows) {
      const elem = await gridPage.getGridCellElement('text', value);
      const exists = await elem.isPresent();
      expect(exists).to.equal(true);
   }
});

Then('grid displays following for each row', async table => {
   const rows = table.rows();
   for (const value of rows) {
      const input = await gridPage.getMatchingInput(
         'Caregiver name',
         'Inputtextbox'
      );
      await input.click();
      await input.sendKeys(value[0]);
      await gridPage.clickIconButton('Add');

      const elem = await gridPage.getGridCellElement('text', value[0]);
      const exists = await elem.isPresent();
      const row: ElementFinder = await gridPage.getGridRowOfCell(elem);

      const editButton = await gridPage.getButtonInRow(row, 'Edit icon');
      const editIsPresent = await editButton.isPresent();
      const editIsEnabled = await !!editButton.getAttribute('disabled');

      const deleteButton = await gridPage.getButtonInRow(row, 'Delete icon');
      const deleteIsPresent = await deleteButton.isPresent();
      const deleteIsEnabled = await !!deleteButton.getAttribute('disabled');

      expect(editIsPresent).to.equal(true);
      expect(editIsEnabled).to.equal(true);
      expect(deleteIsPresent).to.equal(true);
      expect(deleteIsEnabled).to.equal(true);
      expect(exists).to.equal(true);
   }
});

Then(
   '{string} button is displayed for caregiver {string}',
   async (buttonName: string, value: string) => {
      const elementType = gridPage.elementTypeByActionButton(buttonName);
      const elem = await gridPage.getGridCellElement(elementType, value);
      const row: ElementFinder = await gridPage.getGridRowOfCell(elem);

      const button = await gridPage.getButtonInRow(row, buttonName);
      const isPresent = await button.isPresent();

      expect(isPresent).to.equal(true);
   }
);

Then(
   '{string} button is hidden for caregiver {string}',
   async (buttonName: string, value: string) => {
      const elem: ElementFinder = await gridPage.getGridCellElement(
         'input',
         value
      );
      const row: ElementFinder = await gridPage.getGridRowOfCell(elem);

      const button = await gridPage.getButtonInRow(row, buttonName);
      const isPresent = await button.isPresent();

      expect(isPresent).to.equal(false);
   }
);

Then(
   '{string} button is not displayed for caregiver {string}',
   async (buttonName: string, value: string) => {
      const elem: ElementFinder = await gridPage.getGridCellElement(
         'text',
         value
      );
      const row: ElementFinder = await gridPage.getGridRowOfCell(elem);

      const button = await gridPage.getButtonInRow(row, buttonName);
      const isPresent = await button.isPresent();

      expect(isPresent).to.equal(false);
   }
);

Then(
   '{string} snackbar {string} is displayed',
   async (message: string, type: string) => {
      let attempts = 0;
      while (attempts < 2) {
         try {
            const snackbar = await gridPage.getElementByClassName(
               `snack-${type}`
            );
            const exists = await snackbar.isDisplayed();
            const text = await snackbar.getText();
            expect(exists).to.equal(true);
            expect(text.includes(message)).to.equal(true);
            break;
         } catch (StaleElementException) {
            attempts++;
         }
      }
   }
);

Then('caregiver {string} is not added in the grid', async (value: string) => {
   const nameList = await gridPage.getGridNameList();
   const IsUnique = nameList.length === new Set(nameList).size;

   expect(IsUnique).to.equal(true);
});

Then('grid data is sorted by following', async table => {
   const values = table.rows();
   const nameList = await gridPage.getGridNameList();
   const sorted: number[] = [];

   for (const value of values) {
      const idx = await nameList.indexOf(value[0]);
      await sorted.push(idx);
   }

   const isSorted = await !!sorted.reduce((n, item) => item > n && item);

   expect(isSorted).to.equal(true);
});

Then('caregiver {string} row is highlighted', async (value: string) => {
   const elem = await gridPage.getGridCellElement('text', value);
   const row: ElementFinder = await gridPage.getGridRowOfCell(elem);
   const isHighlighted = await gridPage.gridRowIsHighlighted(row);

   expect(isHighlighted).to.equal(true);
});

Then(
   'I enter {string} for caregiver {string} input',
   async (text: string, value: string) => {
      const valueLength = value.split('');
      const elem = await gridPage.getGridCellElement('input', '');
      await elem.click();

      for (const v of valueLength) {
         await elem.sendKeys(protractor.Key.BACK_SPACE);
      }

      if (text !== '') {
         await elem.sendKeys(text);
      }

      await gridPage.clickPageTitle(); // this is just to trigger validation on blur
   }
);

Then(
   '{string} field is highlighted for selected row',
   async (field: string) => {
      const elem = await gridPage.getGridCellElement('input', '');
      const invalid = await gridPage.hasClass(elem, 'ng-invalid');
      expect(invalid).to.equal(true);
   }
);

Then(
   'Confirmation pop-up with message {string} is displayed',
   async (message: string) => {
      const elem = await gridPage.getAllElementsByCss('mat-dialog-container');
      const exists = await elem[0].isPresent();
      const text = await elem[0].getText();

      expect(exists).to.equal(true);
      expect(text.includes(message)).to.equal(true);
   }
);

Then('row {string} is not displayed in the grid', async (value: string) => {
   const EC = protractor.ExpectedConditions;
   const rows = await gridPage.getAllGridRows();
   let exists = false;
   for (const row of rows) {
      const name = await row.element(
         by.cssContainingText('mat-cell div span span', value)
      );
      browser.wait(EC.stalenessOf(name), 5000);
      exists = await name.isPresent();
   }

   expect(exists).to.equal(false);
});

Then('caregiver {string} is displayed in the grid', async (value: string) => {
   let exists = false;
   let elem = await gridPage.getGridCellElement('text', value);
   exists = await elem.isPresent();
   // try again in case grid wasn't refreshed
   if (!exists) {
      setTimeout(async () => {
         elem = await gridPage.getGridCellElement('text', value);
         exists = await elem.isPresent();
      }, 2000);
   }

   expect(exists).to.equal(true);
});

Then(
   '{string} button is disabled for caregiver {string}',
   async (buttonName: string, value: string) => {
      const elem = await gridPage.getGridCellElement('text', value);
      const row: ElementFinder = await gridPage.getGridRowOfCell(elem);
      const button = await gridPage.getButtonInRow(row, buttonName);
      const editIsEnabled = await !!button.getAttribute('disabled');

      expect(editIsEnabled).to.equal(true);
   }
);

Then(
   '{string} text is displayed for caregiver {string} {string} button',
   async (message: string, value: string, buttonName: string) => {
      const elem = await gridPage.getGridCellElement('text', value);
      const row: ElementFinder = await gridPage.getGridRowOfCell(elem);
      const button = await gridPage.getButtonInRow(row, buttonName);
      const text = await button.getAttribute('title');

      expect(text).to.equal(message);
   }
);

Then('caregiver {string} is not editable', async (value: string) => {
   const elem: ElementFinder = await gridPage.getGridCellElement('text', value);
   const editable = await elem.isDisplayed();

   expect(editable).to.equal(true);
});

Then('grid is re-enabled', async () => {
   const gridRows = await gridPage.getAllElementsByCss('.mat-row');

   for (const row of gridRows) {
      const editMode = await gridPage.hasClass(row, 'editMode');
      expect(editMode).to.equal(false);
   }
});
