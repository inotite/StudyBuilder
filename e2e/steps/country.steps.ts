import {Given, When, Then} from 'cucumber';
import {ElementFinder, browser, element, protractor, by} from 'protractor';
import {GridPage} from '../src/common/grid.po';
import {MuiTableColumn} from '../../src/app/yprime-artifacts/components/mui-table/mui-table-column.model';
import {MuiTableControlType} from '../../src/app/yprime-artifacts/components/mui-table/mui-table-controlType.model';

const chai = require('chai');
const expect = chai.expect;
const gridPage = new GridPage();

Given('Country grid displays following data', async table => {
   const columns: Array<MuiTableColumn> = [
      <MuiTableColumn>{
         id: 'name',
         isVisible: true,
         canBeAdded: true,
         canBeEdited: false,
         isRequired: true,
         columnDisplayName: 'Country',
         width: 120,
         MuiTableControlType: MuiTableControlType.SingleDropdown
      },
      <MuiTableColumn>{
         id: 'shortName',
         isVisible: true,
         canBeAdded: true,
         canBeEdited: false,
         MuiTableControlType: MuiTableControlType.Label,
         columnDisplayName: 'Country Code'
      },
      <MuiTableColumn>{
         id: 'use24HourTime',
         isVisible: true,
         isRequired: false,
         width: 125,
         MuiTableControlType: MuiTableControlType.Slider,
         maxLength: 60,
         canBeAdded: true,
         canBeEdited: true,
         columnDisplayName: '12-hour time'
      },
      <MuiTableColumn>{
         id: 'useMetric',
         isVisible: true,
         canBeAdded: true,
         canBeEdited: true,
         width: 125,
         MuiTableControlType: MuiTableControlType.Slider,
         columnDisplayName: 'Metric Units'
      },
      <MuiTableColumn>{
         id: 'languages',
         isVisible: true,
         canBeAdded: true,
         canBeEdited: false,
         isRequired: true,
         width: 120,
         helpText: 'The list of languages that can be associated to a country',
         MuiTableControlType: MuiTableControlType.MultiChoiceDropdown,
         columnDisplayName: 'Language(s)'
      }
   ];

   const isDisplayed = await gridPage.gridDataIsDisplayed(columns, table, 'name');
   expect(isDisplayed).to.equal(true);
});

Given('I select {string} from {string} multi-select dropdown for row {string}', async (options: string, dropDownLabel: string, rowName) => {
   await gridPage.multiselectRowDropdown(options, dropDownLabel, rowName);
});

When('I hover over the country {string} row in the grid', async (value: string) => {
   const elem = await gridPage.getGridCellElement('text', value);
   const row: ElementFinder = await gridPage.getGridRowOfCell(elem);
   await gridPage.moveMouseToElem(row);
});

Then('Information icon is displayed for {string} label in grid', async (label: string) => {
   const labelElem: ElementFinder = await gridPage.getElementByCssContainingText('.mat-sort-header-button', label);
   const infoIcon = await labelElem.element(by.className('info-cell'));
   const isDisplayed = await infoIcon.isDisplayed();

   expect(isDisplayed).to.equal(true);
});

Then('country {string} row is highlighted', async (value: string) => {
   const elem = await gridPage.getGridCellElement('text', value);
   const row: ElementFinder = await gridPage.getGridRowOfCell(elem);
   const isHighlighted = await gridPage.gridRowIsHighlighted(row);

   expect(isHighlighted).to.equal(true);
});

Then('I select {string} from {string} multi-select dropdown', async (option: string, dropDownLabel: string) => {
   await gridPage.selectFromMatDropDown(dropDownLabel, option);
   await gridPage.clickPageTitle();
});

Then('I click on the {string} Togglebutton for country', async (label: string) => {
   try {
      const elem = await gridPage.getMatchingInput(label, 'Togglebutton');
      await elem.click();
   } catch (e) {
      const elem = await gridPage.getMatchingInput(label, 'Togglebutton');
      await elem.click();
   }
});

Then('I click {string} button for country {string}', async (buttonName: string, value: string) => {
   const elem = await gridPage.getGridCellElement('text', value);
   const row: ElementFinder = await gridPage.getGridRowOfCell(elem);

   await gridPage.clickActionButton(row, buttonName);
});

Then('country {string} is displayed in {string} dropdown', async (option: string, dropDownLabel: string) => {
   const dropdown: ElementFinder = await gridPage.getMatDropdownByLabel(dropDownLabel);
   await dropdown.click();
   const elem = await gridPage.getMatOptionByTextValue(option);
   const exists = await elem.isPresent();

   expect(exists).to.equal(true);
});

Then('I deselect following languages for country {string}', async (value: string, table: any) => {
   const rows = table.rows();

   for (const row of rows) {
      await gridPage.multiselectRowDropdown(row[0], 'Language(s)', value);
   }

   await gridPage.clickPageTitle(); // close the dropdown
});

Then('{string} field is highlighted for country {string}', async (field: string, value: string) => {
   const elem = await gridPage.getGridCellElement('multi-select', '');
   const invalid = await gridPage.hasClass(elem, 'ng-invalid');
   expect(invalid).to.equal(true);
});
