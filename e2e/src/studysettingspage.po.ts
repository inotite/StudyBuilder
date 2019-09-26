import {AppPage, Button} from './app.po';
import {element, by, ElementFinder, browser} from 'protractor';
import { FieldType } from './common/controls.po';

export class StudySettingsPage extends AppPage {
    async clickNavActionByItem(action: string, item: string): Promise<void> {
        return await element(by.css(`.list-group-flush.${item}`))
        .element(by.css(`button.${action}`)).click();
    }

    async checkSaveStudySettingsButtonExists(): Promise<boolean> {
       return await element(by.id('saveStudySettings')).isPresent();
    }

    async checkCancelStudySettingsButtonExists(): Promise<boolean> {
       return await element(by.id('cancelStudySettings')).isPresent();
    }

    async getMatchingField(label: string): Promise<ElementFinder> {
        const labelId = await element(
            by.cssContainingText('label', label)
        ).getAttribute('for');
        return await element(by.id(labelId));
    }

    async getMatchingFieldInput(
        field: ElementFinder,
        fieldType: string
    ): Promise<ElementFinder> {
        let returnValue: ElementFinder;

        switch (fieldType) {
           case FieldType.Dropdown: {
              returnValue = await field.element(by.tagName('mat-select'));
              break;
           }
           case FieldType.Togglebutton: {
               returnValue = await field.element(by.tagName('mat-slide-toggle'));
              break;
           }
           case FieldType.Inputtextbox: {
               returnValue = await field.element(by.css('input[type="text"]'));
              break;
           }
           case FieldType.Numberinput: {
              returnValue = await field.element(by.css('input[type="number"]'));
              break;
           }
        }
        return returnValue;
    }

    async getMatchingFieldInputWithoutType(field: ElementFinder): Promise<ElementFinder> {
        return await field.element(by.css('input[type="number"], input[type="text"], mat-slide-toggle, mat-select'));
    }

    async getHelpIcon(field: ElementFinder): Promise<ElementFinder> {
        return await field.element(by.css('.help-icon'));
    }

    async getPlaceholder(fieldType: string, field: ElementFinder): Promise<string> {
        let returnValue: string;
        switch (fieldType) {
            case FieldType.Inputtextbox:
            case FieldType.Numberinput:
                returnValue = await field.getAttribute('placeholder');
                break;
            case FieldType.Dropdown:
                returnValue = await element(by.css('mat-option[disabled] span')).getText();
                break;
        }
        return returnValue;
    }

    async getDefaultValue(field: ElementFinder): Promise<string> {
        return await field.getAttribute('default-value');
    }

    async checkSaveButtonExists(): Promise<boolean> {
       return await element(by.buttonText('Save Changes')).isPresent();
    }

    async checkCancelButtonExists(): Promise<boolean> {
       return await element(by.buttonText('Cancel')).isPresent();
    }

    async setFieldInputValue(field: ElementFinder, value: string): Promise<void> {
        return await field.clear().then(() => {
            return field.sendKeys(value);
        });
    }

    async removeFieldInputFocus(): Promise<void> {
        return await element(by.tagName('body')).click();
    }

    async getFieldMessage(field: ElementFinder): Promise<ElementFinder> {
        return await field.element(by.css('.alert.alert-invalid div'));
    }

    async clickDropdownByLabel(fieldLabel: string): Promise<void> {
        const field = await this.getMatchingField(fieldLabel);
        const elem = await this.getMatchingFieldInput(field, FieldType.Dropdown);
        await elem.click();
    }

    // async getFieldHighlightByLabel(fieldLabel: string): Promise<ElementFinder> {
    //     const field = await this.getMatchingField(fieldLabel);
    // }
}
