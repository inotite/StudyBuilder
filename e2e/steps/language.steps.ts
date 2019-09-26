import { Given, When, Then } from 'cucumber';
import { ElementFinder, browser, protractor, by } from 'protractor';
import { GridPage } from '../src/common/grid.po';
import { MuiTableColumn } from '../../src/app/yprime-artifacts/components/mui-table/mui-table-column.model';
import { MuiTableControlType } from '../../src/app/yprime-artifacts/components/mui-table/mui-table-controlType.model';
import { element } from '@angular/core/src/render3';
import { async } from 'q';
import { LanguagePage } from '../src/language.po';

const chai = require('chai');
const expect = chai.expect;
const gridPage = new GridPage();
const languagePage = new LanguagePage();

Given('I have selected {string} Study Type', async (type: string) => {
   await gridPage.navigateTo().then(async data => {
      return await gridPage.selectOption(type, '#homeDropdown select');
   });
});

Given(
   'the {string} button should be disabled in the row that contains {string} in the {string} column',
   async (buttonName: string, cellValue: string, columnName: string) => {
      const isDisabled = await gridPage.isRowButtonEnabled(
         buttonName,
         cellValue
      );

      expect(isDisabled).to.equal(true);
   }
);

Given(
   'I click on the {string} Togglebutton for row {string}',
   async (columnName: string, cellValue: string) => {
      const labelId = await languagePage.getElementIdByLabel(columnName);
      const toggle = await gridPage.getRowToggleButtonByColumn(
         cellValue,
         labelId
      );

      const prevValue: Boolean = await toggle.getAttribute('aria-checked');

      browser
         .actions()
         .mouseMove(toggle)
         .click(toggle)
         .perform();

      const currValue: Boolean = await toggle.getAttribute('aria-checked');

      expect(prevValue).not.to.equal(currValue);
   }
);

Given(
   'I enter {string} into {string} for row {string}',
   async (newValue: string, columnName: string, rowName: string) => {
      const labelId = await languagePage.getElementIdByLabel(columnName);
      const input = await gridPage.getRowInput(rowName, labelId);
      await input.clear().sendKeys(newValue);
   }
);

When(
   'I hover over {string} row in the Language Grid',
   async (value: string) => {
      const elem = await gridPage.getGridCellElement('text', value);
      const row: ElementFinder = await gridPage.getGridRowOfCell(elem);
      await gridPage.moveMouseToElem(row);
   }
);
When('I select {string} dropdown', async (label: string) => {
   await (await gridPage.getMatDropdownByLabel(label)).click();
});

When(
   'I click {string} button for row {string}',
   async (buttonName: string, value: string) => {
      const elem = await gridPage.getGridCellElement('text', value);
      const row: ElementFinder = await gridPage.getGridRowOfCell(elem);

      await gridPage.clickActionButton(row, buttonName);
   }
);

When(
   'I hover mouse over {string} button for {string} row in the Langauge Grid',
   async (buttonName: string, cellValue: string) => {
      await gridPage.hoverOverButton(buttonName, cellValue);
   }
);

When(
   'I hover over the {string} icon near {string}',
   async (iconName: string, label: string) => {
      const elem = await gridPage.getLabelElement(label);
      const icon = await gridPage.getMatIconByLabel(elem, iconName);
      await gridPage.moveMouseToElem(icon);
   }
);

When(
   'I hover mouse over {string} row in the {string} grid',
   async (value: string, gridName: string) => {
      const elem = await gridPage.getGridCellElement('text', value);
      const row: ElementFinder = await gridPage.getGridRowOfCell(elem);
      await gridPage.moveMouseToElem(row);
   }
);

Then('Language Grid contains the following data', async table => {
   const columns: Array<MuiTableColumn> = [
      <MuiTableColumn>{
         id: 'name',
         isVisible: true,
         canBeAdded: true,
         canBeEdited: true,
         isRequired: true,
         columnDisplayName: 'Language',
         width: 120,
         MuiTableControlType: MuiTableControlType.SingleDropdown
      },
      <MuiTableColumn>{
         id: 'cultureName',
         isVisible: true,
         isKey: true,
         canBeAdded: true,
         canBeEdited: false,
         MuiTableControlType: MuiTableControlType.Label,
         columnDisplayName: 'Culture Code'
      },
      <MuiTableColumn>{
         id: 'displayName',
         isVisible: true,
         isRequired: true,
         width: 125,
         MuiTableControlType: MuiTableControlType.Text,
         maxLength: 60,
         helpText: 'This will be displayed to user when selecting a language',
         canBeAdded: true,
         canBeEdited: true,
         columnDisplayName: 'Display Name'
      },
      <MuiTableColumn>{
         id: 'isDefault',
         isVisible: true,
         canBeAdded: true,
         canBeEdited: true,
         isRequired: true,
         width: 125,
         helpText: 'This is the Study Builder default Language',
         MuiTableControlType: MuiTableControlType.Slider,
         columnDisplayName: 'Default'
      },
      <MuiTableColumn>{
         id: 'translationApproved',
         isVisible: true,
         canBeAdded: false,
         canBeEdited: true,
         MuiTableControlType: MuiTableControlType.Slider,
         columnDisplayName: 'Translation Approved'
      },
      <MuiTableColumn>{
         id: 'isRightToLeft',
         isVisible: true,
         canBeAdded: false,
         canBeEdited: false,
         MuiTableControlType: MuiTableControlType.ReadOnlyCheck,
         columnDisplayName: 'Right to Left'
      },
      <MuiTableColumn>{
         id: 'countries',
         isVisible: true,
         canBeAdded: false,
         canBeEdited: false,
         helpText: 'The list of Countries this Language has been associated to',
         MuiTableControlType: MuiTableControlType.ReadOnlyList,
         columnDisplayName: 'Countries'
      }
   ];

   const isDisplayed = await gridPage.gridDataIsDisplayed(
      columns,
      table,
      'name'
   );
   expect(isDisplayed).to.equal(true);
});

Then(
   '{string} button is displayed for {string} in grid',
   async (buttonName: string, rowName: string) => {
      const isPresent = await gridPage.isButtonPresent(buttonName, rowName);

      expect(isPresent).to.equal(true);
   }
);

Then(
   '{string} button is hidden for {string} in grid',
   async (buttonName: string, rowName: string) => {
      const isPresent = await gridPage.isButtonPresent(buttonName, rowName);

      expect(isPresent).to.equal(false);
   }
);

Then('{string} label is displayed', async (label: string) => {
   const elem = await gridPage.getElementByCssContainingText('label', label);
   const isPresent = await elem.isPresent();

   expect(isPresent).to.equal(true);
});

Then(
   'Information icon is displayed for {string} Label',
   async (label: string) => {
      const labelElem: ElementFinder = await gridPage.getElementByCssContainingText(
         'label',
         label
      );
      const infoIcon = await labelElem.element(by.className('info-cell'));
      const isDisplayed = await infoIcon.isDisplayed();

      expect(isDisplayed).to.equal(true);
   }
);

Then(
   '{string} is displayed in the {string} field',
   async (text: string, label: string) => {
      const elem: ElementFinder = await gridPage.getMatchingInput(
         label,
         'Inputtextbox'
      );
      const elemText = await elem.getAttribute('ng-reflect-model');

      expect(elemText).to.equal(text);
   }
);

Then(
   'only {string} row has Default set to {string} in the Language Grid',
   async (name: string, boolValue: string) => {
      const rows = await gridPage.getAllGridRows();
      let sliderValue = '';
      let result = false;
      for (const row of rows) {
         const defaultCell = await row.element(by.css('.mat-column-isDefault'));
         const nameCell = await row.element(by.css('.mat-column-name'));
         const nameText = await nameCell.getText();
         sliderValue = await gridPage.getGridCellDefaultValue(
            MuiTableControlType.Slider,
            defaultCell
         );

         if (sliderValue === boolValue) {
            if (nameText !== name) {
               return result;
            } else {
               result = true;
            }
         }
      }

      expect(result).to.equal(true);
   }
);

Then(
   'Language {string} row should be the only row that is highlighted',
   async (value: string) => {
      const elem = await gridPage.getGridCellElement('text', value);
      const row: ElementFinder = await gridPage.getGridRowOfCell(elem);
      const isHighlighted = await gridPage.gridRowIsHighlighted(row);

      expect(isHighlighted).to.equal(true);
   }
);

Then(
   'following data is enabled for language {string}',
   async (name: string, table: any) => {
      let control: ElementFinder;
      const values = table.hashes();
      const elem = await gridPage.getGridCellElement('input', name);
      const row = await gridPage.getGridRowOfCell(elem);

      for (const value of values) {
         switch (value.Label) {
            case 'Display Name': {
               control = await row.element(
                  by.css(
                     '.mat-column-displayName div span span mat-form-field div div div input'
                  )
               );
               break;
            }
            case 'Default': {
               control = await row.element(
                  by.css('.mat-column-isDefault div span span mat-slide-toggle')
               );
               break;
            }
            case 'Translation Approved': {
               control = await row.element(
                  by.css(
                     '.mat-column-translationApproved div span span mat-slide-toggle'
                  )
               );
               break;
            }
         }
      }
      const enabled = await control.isEnabled();
      expect(enabled).to.equal(true);
   }
);

Then(
   '{string} button is displayed for language {string}',
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
   '{string} is not displayed in {string} dropdown',
   async (option: string, dropDownLabel: string) => {
      const elem = await gridPage.getMatOptionByTextValue(option);
      const exists = await elem.isPresent();

      expect(exists).to.equal(false);
   }
);

Then('{string} tooltip should be displayed', async (title: string) => {
   const cssSearch = '[title="' + title + '"]';
   const tooltip = await gridPage.getElementTooltipByCss(cssSearch);

   expect(title).to.equal(tooltip);
});

Then(
   '{string} row is the only row that has {string} set to {string} in the {string} grid',
   async (
      rowName: string,
      columnName: string,
      cellValue: boolean,
      gridName: string
   ) => {
      const labelId = await languagePage.getElementIdByLabel(columnName);
      const toggle = await gridPage.getRowToggleButtonByColumn(
         rowName,
         labelId
      );
      const value = await toggle.getAttribute('aria-checked');

      expect(cellValue).to.equal(value);

      const count = await gridPage.getColumnToggleCountByIdAndValue(
         labelId,
         cellValue
      );

      expect(count).to.equal(1);
   }
);

Then(
   '{string} should be displayed for {string}',
   async (message: string, label: string) => {
      const elem = await gridPage.getLabelElement(label);
      const icon = await gridPage.getMatIconByLabel(elem, 'info');
      const iconParent = await icon.element(by.xpath('..'));
      const text = await iconParent.getAttribute('title');

      expect(text).to.equal(message);
   }
);

Then('{string} row is highlighted', async (value: string) => {
   const elem = await gridPage.getGridCellElement('text', value);
   const row: ElementFinder = await gridPage.getGridRowOfCell(elem);
   const isHighlighted = await gridPage.gridRowIsHighlighted(row);

   expect(isHighlighted).to.equal(true);
});
