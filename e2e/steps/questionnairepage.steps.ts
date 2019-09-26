import { Given, When, Then } from 'cucumber';
import { QuestionnairePage } from '../src/questionnairepage.po';
import { by, element, browser, protractor, ElementFinder } from 'protractor';

const chai = require('chai');
const expect = chai.expect;
const questionnairePage = new QuestionnairePage();

// With Callbacks
Given('user has selected {string} Study type', async (type: string) => {
   return await this.navigateTo().then(async data => {
      return await this.selectOption(type);
   });
});

Given(
   'I click {string} button in the left pane',
   async (buttonText: string) => {
      await questionnairePage.checkAddQuestionnaireButtonExists();
      await questionnairePage.clickAddQuestionnaireButton();
   }
);

Given('I enter following data', async table => {
   const rows = table.rows();

   for (const row of rows) {
      const value: string = row[1];
      const elem = await questionnairePage.getMatchingInput(row[0], row[2]);
      await elem.click();
      await elem.sendKeys(value);
   }
});

Given('a web browser is on the {string} page', async (url: string) => {
   await this.navigateTo(url);
});

Given(
   '{string} questionnaire is in the left pane',
   async (QuestionnaireDisplayText: string) => {
      const result = await questionnairePage.getQuestionnaireDisplayText(
         QuestionnaireDisplayText
      );
      expect(result).to.equal(QuestionnaireDisplayText);
   }
);

When('I navigate to {string} page', async (url: string) => {
   await questionnairePage.navigateTo(url);
});

When('I click on Questionnaire icon', async () => {
   await questionnairePage.clickIconLink('Questionnaires');
});

When(
   'I select {string} from {string} dropdown',
   async (option: string, dropDownLabel: string) => {
      await questionnairePage.selectFromMatDropDown(dropDownLabel, option);
   }
);

When(
   'I select {string} for {string}',
   async (choice: string, parentControlLabel: string) => {
      const isSelected = await questionnairePage.isRadioButtonSelected(
         parentControlLabel,
         choice,
         'Dropdown'
      );
      expect(isSelected).to.equal(true);
   }
);

When('I click {string} button', async (text: string) => {
   await questionnairePage.clickButtonByText(text);
});

When('I click {string} button in the middle pane', async (text: string) => {
   await questionnairePage.clickButtonByText(text);
});

When('I click on the {string} Togglebutton', async (label: string) => {
   const elem = await questionnairePage.getMatchingInput(label, 'Togglebutton');
   await elem.click();
});

When('I enter {string} for {string}', async (value: string, label: string) => {
   const elem = await questionnairePage.getMatchingInput(label, 'Numberinput');
   elem.click();
   elem.sendKeys(value);
});

When(
   'I enter {string} for {string} text',
   async (value: string, label: string) => {
      const elem = await questionnairePage.getMatchingInput(
         label,
         'Inputtextbox'
      );

      await elem.click();
      await elem.clear().sendKeys(value);

      const elemVal = await elem.getAttribute('value');

      expect(elemVal).to.equal(value);
   }
);

Then(
   '{string} is displayed in {string} dropdown',
   async (options: string, dropDownLabel: string) => {
      const dropDownOptionsExist = await questionnairePage.getMatDropDownOptionsExist(
         dropDownLabel,
         options
      );

      expect(dropDownOptionsExist).to.equal(true);
   }
);

Then(
   '{string} is available in {string} dropdown',
   async (options: string, dropDownLabel: string) => {
      const dropDownOptionsExist = await questionnairePage.getMatDropDownOptionsExist(
         dropDownLabel,
         options
      );

      expect(dropDownOptionsExist).to.equal(true);
   }
);

Then('{string} Title is displayed', async (title: string) => {
   const exists = await questionnairePage.checkTitleIsDisplayed(title);
   expect(exists).to.equal(true);
});

Then(
   '{string} is not displayed from {string} dropdown',
   async (option: string, label: string) => {
      const dropDownOptionsExist = await questionnairePage.getMatDropDownOptionsExist(
         label,
         option
      );

      expect(dropDownOptionsExist).to.equal(false);
   }
);

Then(
   '{string} button is displayed on the left pane',
   async (buttonText: string) => {
      const exists = await questionnairePage.checkAddQuestionnaireButtonExists();
      expect(exists).to.equal(true);
   }
);

Then('middle pane is blank', async () => {
   const childCount = await questionnairePage.getChildElementCountByCss(
      '#questionnaire-form-wrapper router-outlet'
   );
   expect(childCount).to.equal(0);
});

Then('middle pane displays', async (dataTable: any) => {
   const data = dataTable.hashes();

   data.forEach(async (row: any) => {
      const elem = await questionnairePage.getMatchingInput(
         row.Label,
         row.Fieldtype
      );
      const exists = await elem.isPresent();
      const isEnabled = await elem.isEnabled();
      let defaultValue = await questionnairePage.DefaultValue(
         row.Fieldtype,
         elem
      );
      if (defaultValue == null) {
         defaultValue = '';
      }
      expect(exists).to.equal(true);
      expect(isEnabled.toString().toUpperCase()).to.equal(
         row.Enabled.toUpperCase()
      );
      expect(defaultValue.toUpperCase()).to.equal(
         row.Defaultvalue.toUpperCase()
      );
   });
});

Then(
   '{string} displays {string}',
   async (listTitle: string, listDefaultDisplay: string) => {
      const list = await questionnairePage.checkDragDropListIsDisplayed(
         '.submit-action-header-text',
         listTitle
      );

      expect(list).to.equal(true);

      const defaultDisplay = await questionnairePage.checkDragDropListDisplaysDefaultText(
         '.submit-action-list-selected',
         listDefaultDisplay
      );

      expect(defaultDisplay).to.equal(true);
   }
);

Then(
   'Icon {string} is displayed near "What is the questionnaire display name"',
   async () => {
      const exists = await questionnairePage.checkRichTextEditoryIconExists();
   }
);

Then(
   'Emails should display in the {string} dropdown',
   async (label: string, datatable: any) => {
      const rows = datatable.hashes();

      const dropdown = await questionnairePage.getElementById(
         'emailContentList'
      );
      await dropdown.click();

      rows.forEach(async (row: any) => {
         const elem = await questionnairePage.getMatOptionByTextValue(
            row.Emails
         );
         const isPresent = await elem.isPresent();
         expect(isPresent).to.equal(true);
      });
   }
);

Then('left pane is disabled', async () => {
   const disabled = await questionnairePage.checkLeftPanelDisabled();
   expect(disabled).to.equal('true');
});

Then('left pane is enabled', async () => {
   const disabled = await questionnairePage.checkLeftPanelDisabled();
   expect(disabled).to.equal(null);
});

Then('right pane is blank', async () => {
   const count = await questionnairePage.getChildElementCount('right-panel');
   expect(count).to.equal(0);
});

Then('"SAVE CHANGES" button is displayed', async () => {
   const isPresent = await questionnairePage.checkSaveQuestionnaireButtonExists();
   expect(isPresent).to.equal(true);
});

Then('"CANCEL" button is displayed', async () => {
   const isPresent = await questionnairePage.checkCancelQuestionnaireButtonExists();
   expect(isPresent).to.equal(true);
});

Then(
   'Label {string} is displayed for {string}',
   async (childLabel: string, parentLabel: string) => {
      const isPresent = await (await questionnairePage.checkChildLabelExists(
         parentLabel,
         childLabel
      )).isPresent();
      expect(isPresent).to.equal(true);
   }
);

Then(
   'Label "Days" is disabled for "Allow user to edit completed questionnaire responses"',
   async () => {
      const isEnabled = await questionnairePage.checkCompletedQuestionnaireResponsesDaysEnabled();
      expect(isEnabled).to.equal(false);
   }
);

Then(
   '{string} is disabled for {string}',
   async (choice: string, label: string) => {
      const isEnabled = await questionnairePage.checkCompletedQuestionnaireResponsesDaysEnabled();
      expect(isEnabled).to.equal(false);
   }
);

Then('{string} displays', async (actions: string, table) => {
   const rows = table.rows();

   for (const row of rows) {
      const isPresent = await questionnairePage.checkElementExistsByCSS(
         'div.submit-action-item-box',
         row[0]
      );
      expect(isPresent).to.equal(true);
   }
});

Then(
   'the business rule value options are displayed',
   async (datatable: any) => {
      const rows = datatable.hashes();
      rows.forEach(async row => {
         const elem = await questionnairePage.getBusinessRuleValueOption(
            row.Label,
            row.RadioButtonLabel
         );
         const input = await elem.element(by.css('input'));
         const isEnabled = await input.isEnabled();
         const classes = await elem.getAttribute('class');
         const isSelected = classes.indexOf('mat-radio-checked') > -1;

         expect(isEnabled.toString().toUpperCase()).to.equal(
            row.Enabled.toUpperCase()
         );
         expect(isSelected.toString().toUpperCase()).to.equal(
            row.IsSelected.toUpperCase()
         );
      });
   }
);

Then(
   '{string} is selected for {string}',
   async (choice: string, parentControlLabel: string) => {
      const radioGroupChoice = await questionnairePage.getChildRadioGroupChoice(
         parentControlLabel,
         choice,
         'Dropdown'
      );
      await radioGroupChoice.click();
      const classes = await radioGroupChoice.getAttribute('class');
      expect(classes.includes('mat-radio-checked')).to.equal(true);
   }
);

Then('"Translation icon" is displayed', async () => {
   const isPresent = await questionnairePage.checkTranslationIconExists();
   expect(isPresent).to.equal(true);
});

Then('{string} text is displayed', async (text: string) => {
   const elem = await questionnairePage.getElementByCssContainingText(
      'span',
      text
   );

   const isVisible = await elem.isDisplayed();
   expect(isVisible).to.equal(true);
});

Then('{string} is not displayed', async (text: string) => {
   const elem = await element(by.className('save-cancel-buttons'));
   const isVisible = await elem.isDisplayed();
   expect(isVisible).to.equal(false);
});

Then(
   '{string} is not displayed for {string}',
   async (value: string, label: string) => {
      const elem = await questionnairePage.getMatchingInput(
         label,
         'Numberinput'
      );

      expect(await elem.getAttribute('value')).not.to.equal(value);
   }
);

Then('following data is not displayed', async (datatable: any) => {
   const rows = datatable.hashes();

   rows.forEach(async row => {
      const elem = await questionnairePage.getMatchingInput(
         row.Label,
         row.FieldType
      );
      expect(await elem.getAttribute('value')).not.to.equal(row.Value);
   });
});

Then('{string} field is highlighted', async (text: string) => {
   const labelElem = await questionnairePage.getLabelElement(text);
   const labelForProp = await labelElem.getAttribute('for');
   const controlElem = await questionnairePage.getElementById(labelForProp);
   const invalid = await questionnairePage.hasClass(controlElem, 'ng-invalid');
   expect(invalid).to.equal(true);
});

Then('{string} field is not highlighted', async (text: string) => {
   const labelElem = await questionnairePage.getLabelElement(text);
   const labelForProp = await labelElem.getAttribute('for');
   const controlElem = await questionnairePage.getElementById(labelForProp);
   const valid = await controlElem.getAttribute('aria-invalid');
   expect(valid).to.equal('false');
});

Then('following is displayed', async table => {
   const rows = table.rows();

   for (const row of rows) {
      const elem = await questionnairePage.getMatchingInput(row[0], row[2]);
      let value = await elem.getAttribute('value');
      value = value === '' ? null : value;
      const expectedValue = row[1] === '' ? null : row[1];
      expect(value).to.equal(expectedValue);
   }
});

Then('the following is displayed on the form', async (datatable: any) => {
   const rows = datatable.hashes();

   rows.forEach(async (row: any) => {
      const parentControlLabel = row.Label;
      const choice = row.RadioButtonLabel;

      const radioGroupChoice = await questionnairePage.getChildRadioGroupChoice(
         parentControlLabel,
         choice,
         'Dropdown'
      );

      expect(await radioGroupChoice.getAttribute('disabled')).to.equal(null);

      expect(await radioGroupChoice.isSelected()).to.equal(false);
   });
});

Then('{string} Numberinput is enabled', async (label: string) => {
   const elem = await questionnairePage.getMatchingInput(label, 'Numberinput');
   const disabled = await elem.getAttribute('disabled');

   expect(disabled).to.equal(null);
});

Then(
   '{string} is displayed for {string}',
   async (text: string, label: string) => {
      const labelId = await element(
         by.cssContainingText('label', label)
      ).getAttribute('for');
      const elem = await element(by.id(labelId));
      const controlValue =
         (await elem.getTagName()) === 'input'
            ? await elem.getAttribute('value')
            : await elem.getText();

      expect(controlValue).to.equal(text);
   }
);

Then('{string} Toggle is disabled', async (label: string) => {
   const elem = await questionnairePage.getMatchingInput(label, 'Togglebutton');
   const disabled = (await elem.getAttribute('disabled')) as string;
   expect(disabled).to.equal(null);
});

Then('{string} Togglebutton is disabled', async (label: string) => {
   const elem = await questionnairePage.getMatchingInput(label, 'Togglebutton');
   const disabled = (await elem.getAttribute('disabled')) as string;
   expect(disabled).to.equal(null);
});

Then(
   '{string} Togglebutton is {string}',
   async (label: string, bool: string) => {
      const checked = await questionnairePage.getToggleCheckedStatus(
         label,
         bool
      );

      expect(checked.toUpperCase).to.equal(bool.toUpperCase);
   }
);

Then(
   'Questionnaire page should be displayed with {string} on the left pane',
   async (noQuestionnaireText: string) => {
      const noQuestionnaireDisplayText = await questionnairePage.getNoQuestionnaireDisplayText();
      expect(noQuestionnaireText).to.equal(noQuestionnaireDisplayText);
   }
);

Then(
   '"Add Questionnaire" button should be displayed on the left pane',
   async () => {
      const exists = await questionnairePage.checkAddQuestionnaireButtonExists();
      expect(exists).to.equal(true);
   }
);
