import { Given, When, Then } from 'cucumber';
import { ElementFinder, browser, protractor, by, element } from 'protractor';
import { MuiDynamicColumnSchema } from '../../src/app/yprime-artifacts/components/mui-table/mui-dynamic-column-schema.model';
import { MuiDynamicTableColumn } from '../../src/app/yprime-artifacts/components/mui-table/mui-dynamic-table-column.model';
import { MuiTableControlType } from '../../src/app/yprime-artifacts/components/mui-table/mui-table-controlType.model';
import { GridPage } from '../src/common/grid.po';

const chai = require('chai');
const path = require('path');
const expect = chai.expect;
const gridPage = new GridPage();

Then('Subject Information grid displays following data', async table => {
   const columns: Array<MuiDynamicTableColumn> = [
      <MuiDynamicTableColumn>{
         id: 'name',
         isVisible: true,
         canBeAdded: false,
         canBeEdited: true,
         isRequired: true,
         columnDisplayName: 'Name',
         MuiTableControlType: MuiTableControlType.Text
      },
      <MuiDynamicTableColumn>{
         id: 'sequence',
         isVisible: true,
         canBeAdded: false,
         canBeEdited: false,
         isRequired: true,
         columnDisplayName: 'Sequence',
         MuiTableControlType: MuiTableControlType.Text
      },
      <MuiDynamicTableColumn>{
         id: 'choiceType',
         isVisible: true,
         canBeAdded: false,
         canBeEdited: false,
         isRequired: true,
         columnDisplayName: 'Choice Type',
         MuiTableControlType: MuiTableControlType.Text,
         isColumnReferenceSchema: true
      },
      <MuiDynamicTableColumn>{
         id: 'businessRule',
         isVisible: true,
         canBeAdded: false,
         canBeEdited: true,
         isRequired: true,
         columnDisplayName: 'Business Rule',
         MuiTableControlType: MuiTableControlType.SingleDropdown
      },
      <MuiDynamicTableColumn>{
         id: 'countries',
         isVisible: true,
         canBeAdded: true,
         canBeEdited: true,
         isRequired: true,
         width: 255,
         helpText: 'This is the list of Countries added to the study.',
         MuiTableControlType: MuiTableControlType.MultiChoiceDropdown,
         columnDisplayName: 'Countries'
      },
      <MuiDynamicTableColumn>{
         id: 'min',
         isVisible: true,
         canBeAdded: false,
         canBeEdited: true,
         isRequired: true,
         columnDisplayName: 'Min',
         MuiTableControlType: MuiTableControlType.Text
      },
      <MuiDynamicTableColumn>{
         id: 'max',
         isVisible: true,
         canBeAdded: false,
         canBeEdited: true,
         isRequired: true,
         columnDisplayName: 'Max',
         MuiTableControlType: MuiTableControlType.Text
      },
      <MuiDynamicTableColumn>{
         id: 'disableNumeric',
         isVisible: true,
         canBeAdded: false,
         canBeEdited: true,
         isRequired: true,
         columnDisplayName: 'Disable Numeric',
         MuiTableControlType: MuiTableControlType.Slider
      },
      <MuiDynamicTableColumn>{
         id: 'choices',
         isVisible: true,
         canBeAdded: false,
         canBeEdited: true,
         isRequired: true,
         columnDisplayName: 'Choices',
         MuiTableControlType: MuiTableControlType.ModalChoice
      },
      <MuiDynamicTableColumn>{
         id: 'dateFormat',
         isVisible: true,
         canBeAdded: false,
         canBeEdited: true,
         isRequired: true,
         columnDisplayName: 'Date Format',
         MuiTableControlType: MuiTableControlType.Text
      },
      <MuiDynamicTableColumn>{
         id: 'decimal',
         isVisible: true,
         canBeAdded: false,
         canBeEdited: true,
         isRequired: true,
         columnDisplayName: 'Decimal',
         MuiTableControlType: MuiTableControlType.Text
      },
      <MuiDynamicTableColumn>{
         id: 'suffix',
         isVisible: true,
         canBeAdded: false,
         canBeEdited: true,
         isRequired: true,
         columnDisplayName: 'Suffix',
         MuiTableControlType: MuiTableControlType.Text
      },
      <MuiDynamicTableColumn>{
         id: 'actionPanel',
         isVisible: true,
         columnDisplayName: '',
         MuiTableControlType: MuiTableControlType.DataDrivenActionPanel
      }
   ];

   const isDisplayed = await gridPage.gridDataIsDisplayed(
      columns,
      table,
      'name'
   );
   expect(isDisplayed).to.equal(true);
});
