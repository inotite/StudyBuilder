import {Given, When, Then} from 'cucumber';
import {HomePage} from '../src/homepage.po';
import {StringHelper} from '../src/e2e-helper/string-helper';

const chai = require('chai');
const expect = chai.expect;
const home = new HomePage();
const stringHelper = new StringHelper();

// Scenario: Selecting a Study Type
Given('a web browser is on {string}', async (url: string) => {
   url = url.toLowerCase() === 'home' ? '' : url;
   await home.navigateTo(url);
});

When('I have not selected a Study Type', async () => {
   await home.selectOptionByIndex(0, '#homeDropdown select');
});

When('I click {string} on the Study Type dropdown menu', async (value: string) => {
   await home.selectOption(value, '#homeDropdown select');
});

When('I click on a {string} Icon', async (icon: string) => {
   await home.clickIconLink(icon);
});

// Scenario Outline: Homepage With <type> selected
Then('I do not see any icons on the page', async () => {
   const iconsArePresent = await home.iconsArePresent();
   expect(iconsArePresent).to.be.false;
});

Then('the icons are in the right section in the correct order.', async (dataTable: any) => {
   const data = dataTable.hashes();

   data.forEach(async (row: any) => {
      const iconText = await home.iconNamesForSection(row.Category);

      expect(iconText).to.have.ordered.members(row['icon names']);
   });
});

// Scenario: icons codes are displayed correctly for the icon names for an Unified study
Then('the icons are displayed on the page with the correct class.', async (dataTable: any) => {
   const data = dataTable.hashes();

   data.forEach(async (row: any) => {
      const iconText = await home.iconNameByCssClass(row['icon codes']);

      expect(iconText).to.equal(row['icon names']);
   });
});

// Scenario Outline: Homepage Hiding Icons With <type> selected
Then('{string} icon names are not displayed on the page', async (iconNames: string) => {
   const hiddenIcons = stringHelper.splitAndTrim(iconNames, ',');
   const visibleIcons = await home.getIconNameList();
   expect(visibleIcons).to.not.contain(hiddenIcons);
});

Then('{string} icon codes are not displayed on the page', async (iconCodes: string) => {
   const hiddenIcons = stringHelper.splitAndTrim(iconCodes, ',');
   const visibleIcons: any = await home.getIconCodeList();
   const allIconString = visibleIcons.join(',');
   hiddenIcons.forEach(iconCode => {
      expect(allIconString).to.not.contain(iconCode);
   });
});

// Scenario Outline: Selecting a Study Type
Then('{string} is selected', async (optionText: string) => {
   const selectedOption = await home.getSelectedOption('#homeDropdown select');
   expect(selectedOption).to.contain(optionText);
});

Then('I am able to select a response', () => {});

// Scenario: Navigation bar not visible when user is on StudyBuilder Homepage
Then('Navigation bar is not visible to a user', async () => {
   const exists = await home.checkNavigationBarExists();

   expect(exists).to.equal(false);
});

// Scenario Outline: Navigating to Study Settings
Then('{string} link names are displayed on the page', async (linkTextTest: string) => {
   const linkTextTestArray = stringHelper.splitAndTrim(linkTextTest, ',');
   const visibleLinkText = await home.getLinkDisplayText();
   linkTextTestArray.forEach((linkText: string) => {
      expect(visibleLinkText).to.contain(linkText);
   });
});

// Scenario: Navigating away from homepage when "Unified" is selected
Then('I am re-directed to the {string}', async (pageHeader: string) => {
   const isCorrectPage = await home.onCorrectPage(pageHeader);

   expect(isCorrectPage).to.equal(true);
});

Then('The footer component should load', async () => {
   const present = await home.isFooterPresent();
   expect(present).to.be.true;
});
