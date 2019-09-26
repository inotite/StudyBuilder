import {Given, When, Then} from 'cucumber';
import {NavigationBar} from './../src/navigationbar.po';
import {DashCaseHelper} from '../src/e2e-helper/dash-case-helper';
import {StringHelper} from '../src/e2e-helper/string-helper';

const chai = require('chai');
const expect = chai.expect;
const nav = new NavigationBar();
const stringHelper = new StringHelper();

Given('I am working in a {string} study', async (type: string) => {
   await nav.navigateTo();

   await nav.selectOption(type, '#homeDropdown select');
});

When('I go to a page where the Navigation Bar is present', async () => {
   await nav.navigateTo();
});

When('I navigate to the {string} page', async (url: string) => {
   await nav.clickIconLink(url);
});

When('I select the {string} category', async (category: string) => {
   const dashCase = new DashCaseHelper();
   await nav.clickMenuHeader(dashCase.transform(category));
});

// Scenario: Navigation bar is visible on the <Page> page
Then('I am able to view the navigation bar', async () => {
   const result = await nav.checkNavigationBarExists();

   expect(result).to.equal(true);
});

// Scenario: Navigation bar is visible and displays the correct buttons
Then('I am able to view the {string} icon', async (icon: string) => {
   const iconList = stringHelper.splitAndTrim(icon, ',');

   const iconClasses = await nav.getIconClasses();
   const iconClassList = stringHelper.splitAndTrimDeep(iconClasses);

   // Use .include here because we have a subet of icon classes
   expect(iconClassList).to.include.members(iconList);
});

Then('I am able to view the {string} button', async (button: string) => {
   const buttonList = stringHelper.splitAndTrim(button, ',');

   const buttonTexts = await nav.getTopButtonTexts();
   const buttonTextList = stringHelper.splitAndTrim(buttonTexts);

   expect(buttonTextList).to.have.members(buttonList);
});

Then('I am able to view the YPrime logo', async () => {
   const exists = await nav.checkYPrimeLogoExists();

   expect(exists).to.equal(true);
});

// Dropdown options display correctly when navigation bar options are displayed for the study type
Then('I am able to view {string} in the navigation bar', async (option: string) => {
   const optionList = stringHelper.splitAndTrim(option, ',');

   const buttonTexts = await nav.getVisibleSubButtonTexts();
   const buttonTextList = stringHelper.splitAndTrim(buttonTexts);

   expect(buttonTextList).to.have.ordered.members(optionList);
});

Then('I am not able to see {string} in the navigation bar', async (option: string) => {
   const optionList = stringHelper.splitAndTrim(option, ',');

   const buttonTexts = await nav.getAllSubButtonTexts();
   const buttonTextList = stringHelper.splitAndTrim(buttonTexts);

   expect(buttonTextList).to.not.have.members(optionList);
});

// This scenario will test that Clicking on the "<Menu Option>" option in the Navigation Bar
// user is taken to the "<Page>" page for Unified Study
When('I click on a {string} option from dropdown', async (option: string) => {
   const pipe = new DashCaseHelper();
   await nav.clickMenuLink(pipe.transform(option));
});

Then('I am re-directed to the {string} page', async (page: string) => {
   const isOnCorrectPage = await nav.onCorrectPage(page);

   expect(isOnCorrectPage).to.equal(true);
});

Then('Footer text Copyright YYYY Powered by YPrime, Inc. is displayed', async () => {
   const year = (new Date).getFullYear().toString();
   const text = await nav.getFooterTexts();

   expect(text.replace('\n', ' ')).to.equal(`Copyright ${year} Powered by YPrime, Inc.`);
});
