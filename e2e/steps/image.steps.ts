import { Given, When, Then } from 'cucumber';
import { ElementFinder, browser, protractor, by, element } from 'protractor';
import { ImagePage } from '../src/image.po';
import { MuiTableColumn } from '../../src/app/yprime-artifacts/components/mui-table/mui-table-column.model';
import { MuiTableControlType } from '../../src/app/yprime-artifacts/components/mui-table/mui-table-controlType.model';
import { GridPage } from '../src/common/grid.po';

const chai = require('chai');
const path = require('path');
const expect = chai.expect;
const imagePage = new ImagePage();
const gridPage = new GridPage();
const fileRelativePath = '../files/';

Given('{string} grid contains the following data', function(string, dataTable) {
   // Write code here that turns the phrase above into concrete actions
   return true;
});

When(
   'I click {string} icon near the {string} field',
   async (label: string, column: string) => {
      await imagePage.clickIconLink(label);
   }
);

When('I hover over {string} row in the Image grid', async (value: string) => {
   // Write code here that turns the phrase above into concrete actions
   const elem = await gridPage.getGridCellElement('text', value);
   const row: ElementFinder = await gridPage.getGridRowOfCell(elem);
   await gridPage.moveMouseToElem(row);
});

Then(
   '{string} image should be opened in a new tab',
   async (imageName: string) => {
      // Write code here that turns the phrase above into concrete actions
      await imagePage.SwitchToNewlyOpenedTab();
      const exists = await imagePage.checkElementExistsByCSS(
         'h2',
         imageName.toUpperCase()
      );
      expect(exists).to.equal(true);
   }
);

Then(
   'I upload {string} in {string} field',
   async (fileName: string, label: string) => {
      const fileToUpload = `${fileRelativePath}${fileName}`;
      const absolutePath = path.resolve(__dirname, fileToUpload);

      await element(by.css('input[type="file"]')).sendKeys(absolutePath);
   }
);

Then('Image grid contains following data', async table => {
   const columns: Array<MuiTableColumn> = [
      <MuiTableColumn>{
         id: 'name',
         isVisible: true,
         isRequired: true,
         width: 255,
         MuiTableControlType: MuiTableControlType.Text,
         maxLength: 60,
         helpText: 'This will be displayed to user when selecting a image',
         canBeAdded: true,
         canBeEdited: true,
         columnDisplayName: 'Display Name'
      },
      <MuiTableColumn>{
         id: 'size',
         isVisible: true,
         canBeAdded: true,
         canBeEdited: false,
         MuiTableControlType: MuiTableControlType.Label,
         columnDisplayName: 'File Size',
         pipeForDisplay: 'formatBytes'
      },
      <MuiTableColumn>{
         id: 'languageName',
         isVisible: true,
         canBeAdded: true,
         canBeEdited: true,
         isRequired: false,
         width: 255,
         helpText: 'This is the list of Languages added to the study.',
         MuiTableControlType: MuiTableControlType.SingleDropdown,
         columnDisplayName: 'Language'
      }
   ];

   const isDisplayed = await gridPage.gridDataIsDisplayed(
      columns,
      table,
      'name'
   );
   expect(isDisplayed).to.equal(true);
});

Then('Upload Image field is highlighted', async () => {
   const labelElem = await imagePage.getLabelElement('Upload Image');
   const labelForProp = await labelElem.getAttribute('for');
   const controlElem = await imagePage.getElementById(labelForProp);
   const fileUpload = await controlElem.element(
      by.className('file-upload-error')
   );
   const invalid = await fileUpload.isPresent();
   expect(invalid).to.equal(true);
});

Then('Upload Image field is not highlighted', async () => {
   const labelElem = await imagePage.getLabelElement('Upload Image');
   const labelForProp = await labelElem.getAttribute('for');
   const controlElem = await imagePage.getElementById(labelForProp);
   const fileUpload = await controlElem.element(
      by.className('file-upload-error')
   );
   const invalid = await fileUpload.isPresent();
   expect(invalid).to.equal(false);
});

Then('Image {string} row is highlighted', async (value: string) => {
   const elem = await gridPage.getGridCellElement('text', value);
   const row: ElementFinder = await gridPage.getGridRowOfCell(elem);
   const isHighlighted = await gridPage.gridRowIsHighlighted(row);

   expect(isHighlighted).to.equal(true);
});
Then(
   '{string} icon is displayed near {string} field',
   async (iconName: string, labelName: string) => {
      const imgIcon = await imagePage.getLabelIcon(labelName, iconName);
      const isPresent = await imgIcon.isPresent();
      const isDisplayed = await imgIcon.isDisplayed();
      expect(isPresent).to.equal(true);
      expect(isDisplayed).to.equal(true);
   }
);
