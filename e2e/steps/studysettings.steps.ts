import {Given, When, Then} from 'cucumber';
import { ElementFinder, browser, protractor, by } from 'protractor';
import { StudySettingsPage } from '../src/studysettingspage.po';
import { DashCaseHelper } from '../src/e2e-helper/dash-case-helper';
import { FieldType } from 'e2e/src/common/controls.po';

const chai = require('chai');
const expect = chai.expect;
const studySettingsPage = new StudySettingsPage();
const dashCase = new DashCaseHelper();

Given('I select {string} Study Type', async (type: string) => {
    await studySettingsPage.navigateTo().then(async data => {
       return await studySettingsPage.selectOption(type, '#homeDropdown select');
    });
});

When('I click on {string} link under {string} CategoryType on the left pane', async (action: string, item: string) => {
   await studySettingsPage.clickNavActionByItem(dashCase.transform(action), dashCase.transform(item));
});

When('I click on {string} button', async(button: string) => {
   await studySettingsPage.clickButtonById(dashCase.transform(button));
});

Given('I enter the {string} with {string}', async(fieldLabel: string, value: string) => {
   const field = await studySettingsPage.getMatchingField(fieldLabel);
   const elem = await studySettingsPage.getMatchingFieldInputWithoutType(field);
   await studySettingsPage.setFieldInputValue(elem, value);
});

When('I remove focus from {string}', async(field: string) => {
   await studySettingsPage.removeFieldInputFocus();
});

When('I click in the {string} dropdown', async(fieldLabel: string) => {
   await studySettingsPage.clickDropdownByLabel(fieldLabel);
});

Then('middle pane should display', async(dataTable: any) => {
    const data = dataTable.hashes();

    for (const value of data) {

        const field = await studySettingsPage.getMatchingField(value.label || value.Label);

        const elem = await studySettingsPage.getMatchingFieldInput(field, value.Fieldtype);
        const exists = await elem.isPresent();
        const isEnabled = await elem.isEnabled();

        const helpIcon = await studySettingsPage.getHelpIcon(field);
        const isHelpIcon = await helpIcon.isPresent();

        expect(exists).to.equal(true);
        expect(isEnabled.toString().toUpperCase()).to.equal(
           value.Enabled.toUpperCase()
        );
        expect(isHelpIcon.toString().toUpperCase()).to.equal(
           value['Help Icon'].toUpperCase()
        );

        if (value.Placeholder && value.Placeholder !== '') {
           const placeholder = await studySettingsPage.getPlaceholder(value.Fieldtype, elem);
           expect(placeholder.toUpperCase()).to.equal(
              value.Placeholder.toUpperCase()
           );
        }

        if (value.Defaultvalue && value.Defaultvalue !== '') {
           const defaultValue = await studySettingsPage.getDefaultValue(elem);
           expect(defaultValue.toUpperCase()).to.equal(
              value.Defaultvalue.toUpperCase()
           );
        }
    }
});



Then('{string} text is displayed on the right pane', async (text: any) => {
    const elem = await studySettingsPage.getElementByCssContainingText('p', text);

    const isVisible = await elem.isPresent();
    expect(isVisible).to.equal(true);
});

Then('{string} text is displayed in the middle pane', async (text: any) => {
   const elem = await studySettingsPage.getElementByCssContainingText('span', text);

   const isVisible = await elem.isPresent();
   expect(isVisible).to.equal(true);
});

Then('asterick symbol is displayed near {string} text', async (text: any) => {
   const elem = await studySettingsPage.getElementByClassName('asterik');

   const isVisible = await elem.isDisplayed();
   expect(isVisible).to.equal(true);
});

Then('Study Settings "SAVE CHANGES" button is displayed', async () => {
   const isPresent = await studySettingsPage.checkSaveButtonExists();
   expect(isPresent).to.equal(true);
});

Then('Study Settings "CANCEL" button is displayed', async () => {
   const isPresent = await studySettingsPage.checkCancelButtonExists();
   expect(isPresent).to.equal(true);
});

Then('{string} message is displayed near {string}', async (message: string, fieldLabel: string) => {
   const field = await studySettingsPage.getMatchingField(fieldLabel);
   const messageField = await studySettingsPage.getFieldMessage(field);
   const errorMsg = await messageField.getText();
   expect(errorMsg.toUpperCase()).to.equal(
      message.toUpperCase()
   );
});

Then('the {string} should display {string}', async (fieldLabel: string, value: string) => {
   const field = await studySettingsPage.getMatchingField(fieldLabel);
   const elem = await studySettingsPage.getMatchingFieldInputWithoutType(field);
   const valueStr = await elem.getAttribute('value');
   expect(valueStr.toUpperCase()).to.equal(
      value.toUpperCase()
   );
});

Then('no error message is displayed near {string}', async (fieldLabel: string) => {
   const field = await studySettingsPage.getMatchingField(fieldLabel);
   const messageField = await studySettingsPage.getFieldMessage(field);
   const exists = await messageField.isPresent();
   expect(exists).to.equal(false);
});

Then('{string} is displayed in the dropdown', async (fieldLabel: string, dataTable: any) => {
   const options = await studySettingsPage.getAllElementsByCss('mat-option:not(.mat-option-disabled)');
   const data = dataTable.hashes();
   expect(data.length).to.equal(options.length);

   for (let index = 0; index < data.length; index++) {
      const optionText = await options[index].getText();
      expect(optionText.toUpperCase()).to.equal(
         data[index].Value.toUpperCase()
      );
   }
});

// Then('{string} snackbar {string} is displayed', async (message: string, className: string) => {

// });

// Then('{string} are highlighted', async (field: string, dataTable: any) => {
//    const data = dataTable.hashes();
//    for (const row of data) {
//       const elem = await studySettingsPage.getFieldHighlightByLabel(row[field]);
//    }
// });