import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormField } from '../yprime-artifacts/models/form-field.model';
import { FormFieldType } from '../yprime-artifacts/models/form-field-type.model';
import { FormFieldValidatorType } from '../yprime-artifacts/models/form-field-validator-type.model';
import { StudySettingsService } from '../shared/services/study-settings.service';

@Component({
  selector: 'app-study-settings',
  templateUrl: './study-settings.component.html',
  styleUrls: ['./study-settings.component.scss']
})
export class StudySettingsComponent implements OnInit {

  defaultCategoryLink = 'StudyWideGeneral';
  studySettings: FormField[] = [];

  // full representation of dynamic field metadata to be pulled from api
  private studyWideGeneralFields: FormField[] = [
    {
      properties: {
        section: 'StudyWide',
        group: 'General',
        key: 'sponsorName',
        label: 'Sponsor Name',
        type: FormFieldType.Text,
        valueIncrement: null,
        order: 0,
        descriptor: '',
        description: 'Sponser Name Field',
        defaultValue: null,
        placeHolderText : null,
        toggleText: null,
        selectOptions: null
      },
      validators: [
        { type: FormFieldValidatorType.Required, value: null, error: null },
        { type: FormFieldValidatorType.MaxLength, value: 60, error: 'Exceeds Max Length' }
      ],
      value: '',
      isDirty: false
    },
    {
      properties: {
        section: 'StudyWide',
        group: 'General',
        key: 'studyName',
        label: 'Study Name',
        type: FormFieldType.Text,
        valueIncrement: null,
        order: 0,
        descriptor: '',
        description: 'Study Name Field',
        defaultValue: null,
        placeHolderText : null,
        toggleText: null,
        selectOptions: null
      },
      validators: [
        { type: FormFieldValidatorType.Required, value: null, error: null },
        { type: FormFieldValidatorType.MaxLength, value: 60, error: 'Exceeds Max Length' }
      ],
      value: '',
      isDirty: false
    },
    {
      properties: {
        section: 'StudyWide',
        group: 'General',
        key: 'protocolNumber',
        label: 'Protocol Number',
        type: FormFieldType.Text,
        valueIncrement: null,
        order: 0,
        descriptor: '',
        description: 'Protocal Number Field',
        defaultValue: null,
        placeHolderText : 'Max 60 Characters',
        toggleText: null,
        selectOptions: null
      },
      validators: [
        { type: FormFieldValidatorType.MaxLength, value: 50, error: 'Exceeds Max Length' }
      ],
      value: '',
      isDirty: false
    },
    {
      properties: {
        section: 'StudyWide',
        group: 'General',
        key: 'studyID',
        label: 'Study ID',
        type: FormFieldType.Text,
        valueIncrement: null,
        order: 0,
        descriptor: '',
        description: 'Study ID Field',
        defaultValue: null,
        placeHolderText : null,
        toggleText: null,
        selectOptions: null
      },
      validators: [
        { type: FormFieldValidatorType.Required, value: null, error: null },
        { type: FormFieldValidatorType.MaxLength, value: 31, error: 'Exceeds Max Length' }
      ],
      value: '',
      isDirty: false
    },
    {
      properties: {
        section: 'StudyWide',
        group: 'General',
        key: 'siteNumberLength',
        label: 'Site Number Length',
        type: FormFieldType.Number,
        valueIncrement: null,
        order: 0,
        descriptor: '',
        description: 'Site Number Length Field',
        defaultValue: 4,
        placeHolderText : null,
        toggleText: null,
        selectOptions: null
      },
      validators: [
        { type: FormFieldValidatorType.Required, value: null, error: null },
        {type: FormFieldValidatorType.Min, value: 0, error: 'Value must be between 0 - 20'},
        {type: FormFieldValidatorType.Max, value: 20, error: 'Value must be between 0 - 20'},
      ],
      value: '',
      isDirty: false
    },
    {
      properties: {
        section: 'StudyWide',
        group: 'General',
        key: 'dataExportDelimiter',
        label: 'Data Export Delimiter',
        type: FormFieldType.Dropdown,
        valueIncrement: null,
        order: 0,
        descriptor: '',
        description: 'Data Export Delimiter Field',
        defaultValue: ',',
        placeHolderText : null,
        toggleText: null,
        selectOptions: [
          { value: ',', label: 'comma (,)' },
          { value: '|', label: 'pipe (|)' },
          { value: ';', label: 'semicolon (;)' }
        ]
      },
      validators: [
        { type: FormFieldValidatorType.Required, value: null, error: null },
      ],
      value: '',
      isDirty: false
    },
    {
      properties: {
        section: 'StudyWide',
        group: 'General',
        key: 'screeningCapGlobal',
        label: 'Screening Cap (Global)',
        type: FormFieldType.Number,
        valueIncrement: null,
        order: 0,
        descriptor: '',
        description: 'Screening Cap Global Field',
        defaultValue: null,
        placeHolderText : null,
        toggleText: null,
        selectOptions: null,
      },
      validators: [
        { type: FormFieldValidatorType.Required, value: null, error: null },
      ],
      value: '',
      isDirty: false
    },
    {
      properties: {
        section: 'StudyWide',
        group: 'General',
        key: 'randomizationCapGlobal',
        label: 'Randomization Cap (Global)',
        type: FormFieldType.Number,
        valueIncrement: null,
        order: 0,
        descriptor: '',
        description: 'Randomization Cap Field',
        defaultValue: null,
        placeHolderText : null,
        toggleText: null,
        selectOptions: null
      },
      validators: [
        { type: FormFieldValidatorType.Required, value: null, error: null },
      ],
      value: '',
      isDirty: false
    },
    {
      properties: {
        section: 'StudyWide',
        group: 'General',
        key: 'attachPDFConfirmationtoeMail',
        label: 'Attach PDF Confirmation to eMail',
        type: FormFieldType.Toggle,
        valueIncrement: null,
        order: 0,
        descriptor: '',
        description: 'Attach PDF Confirmation to eMail Field',
        defaultValue: null,
        placeHolderText : null,
        toggleText: { trueText: 'Yes', falseText: 'No' },
        selectOptions: null
      },
      validators: [
        { type: FormFieldValidatorType.Required, value: null, error: null },
      ],
      value: '',
      isDirty: false
    },
    {
      properties: {
        section: 'StudyWide',
        group: 'General',
        key: 'yPrimeLogoURL',
        label: 'YPrime Logo URL',
        type: FormFieldType.Text,
        valueIncrement: null,
        order: 0,
        descriptor: '',
        description: 'YPrime Logo URL Field',
        defaultValue: null,
        placeHolderText : null,
        toggleText: null,
        selectOptions: null
      },
      validators: [
        { type: FormFieldValidatorType.Required, value: null, error: null },
        { type: FormFieldValidatorType.MaxLength, value: 301, error: 'Exceeds Max Length' }
      ],
      value: '',
      isDirty: false
    },
    {
      properties: {
        section: 'StudyWide',
        group: 'General',
        key: 'zenDeskDCFURL',
        label: 'ZenDesk DCF URL',
        type: FormFieldType.Text,
        valueIncrement: null,
        order: 0,
        descriptor: '',
        description: 'ZenDesk DCF URL Field',
        defaultValue: null,
        placeHolderText : null,
        toggleText: null,
        selectOptions: null
      },
      validators: [
        { type: FormFieldValidatorType.Required, value: null, error: null },
      ],
      value: '',
      isDirty: false
    },
    {
      properties: {
        section: 'StudyWide',
        group: 'General',
        key: 'zenDeskDCFUserID',
        label: 'ZenDesk DCF User ID',
        type: FormFieldType.Text,
        valueIncrement: null,
        order: 0,
        descriptor: '',
        description: 'ZenDesk DCF User ID Field',
        defaultValue: null,
        placeHolderText : null,
        toggleText: null,
        selectOptions: null
      },
      validators: [
        { type: FormFieldValidatorType.Required, value: null, error: null },
      ],
      value: '',
      isDirty: false
    },
    {
      properties: {
        section: 'StudyWide',
        group: 'General',
        key: 'zenDeskDCFUserToken',
        label: 'ZenDesk DCF User Token',
        type: FormFieldType.Text,
        valueIncrement: null,
        order: 0,
        descriptor: '',
        description: 'ZenDesk DCF User Token Field',
        defaultValue: null,
        placeHolderText : null,
        toggleText: null,
        selectOptions: null
      },
      validators: [
        { type: FormFieldValidatorType.Required, value: null, error: null },
      ],
      value: '',
      isDirty: false
    },
    {
      properties: {
        section: 'StudyWide',
        group: 'General',
        key: 'zenDeskDCFGroupID',
        label: 'ZenDesk DCF Group ID',
        type: FormFieldType.Text,
        valueIncrement: null,
        order: 0,
        descriptor: '',
        description: 'ZenDesk DCF Group ID Field',
        defaultValue: null,
        placeHolderText : null,
        toggleText: null,
        selectOptions: null
      },
      validators: [
        { type: FormFieldValidatorType.Required, value: null, error: null },
      ],
      value: '',
      isDirty: false
    },
    {
      properties: {
        section: 'StudyWide',
        group: 'General',
        key: 'zenDeskDCFCustomFields',
        label: 'ZenDesk DCF Custom Fields',
        type: FormFieldType.Text,
        valueIncrement: null,
        order: 0,
        descriptor: '',
        description: 'ZenDesk DCF Custom Fields Field',
        defaultValue: null,
        placeHolderText : null,
        toggleText: null,
        selectOptions: null
      },
      validators: [
        { type: FormFieldValidatorType.Required, value: null, error: null },
      ],
      value: '',
      isDirty: false
    },
  ];
  private studyWideSubjectIDFields: FormField[] = [
    {
      properties: {
        section: 'StudyWide',
        group: 'SubjectID',
        key: 'studyWideSubjectID',
        label: 'Study Wide Subject ID',
        type: FormFieldType.Toggle,
        valueIncrement: null,
        order: 0,
        descriptor: '',
        description: 'Study Wide Subject ID Field',
        defaultValue: null,
        placeHolderText : null,
        toggleText: null,
        selectOptions: null,
      },
      validators: [],
      value: '',
      isDirty: false
    },
    {
      properties: {
        section: 'StudyWide',
        group: 'SubjectID',
        key: 'Subject ID Prefix',
        label: 'Subject ID Prefix',
        type: FormFieldType.Text,
        valueIncrement: null,
        order: 0,
        descriptor: '',
        description: 'When creating a new subject/patient number this value will be placed at the beginning of the number.',
        defaultValue: null,
        placeHolderText : 'Max 10 Characters',
        toggleText: null,
        selectOptions: null
      },
      validators: [
        {type: FormFieldValidatorType.MaxLength, value: 10, error: 'Exceeds Max Length'},
      ],
      value: '',
      isDirty: false
    },
    {
      properties: {
        section: 'StudyWide',
        group: 'SubjectID',
        key: 'prefixSiteIDSeperator',
        label: 'Prefix/Site ID Seperator',
        type: FormFieldType.Text,
        valueIncrement: null,
        order: 0,
        descriptor: '',
        description: 'Prefix/Site ID Seperator Field',
        defaultValue: null,
        placeHolderText : null,
        toggleText: null,
        selectOptions: null
      },
      validators: [
        { type: FormFieldValidatorType.MaxLength, value: 1, error: 'Exceeds Max Length' }
      ],
      value: '',
      isDirty: false
    },
    {
      properties: {
        section: 'StudyWide',
        group: 'SubjectID',
        key: 'includeSiteID',
        label: 'Include Site ID',
        type: FormFieldType.Toggle,
        valueIncrement: null,
        order: 0,
        descriptor: '',
        description: 'Include Site ID Field',
        defaultValue: null,
        placeHolderText : null,
        toggleText: null,
        selectOptions: null
      },
      validators: [],
      value: '',
      isDirty: false
    },
    {
      properties: {
        section: 'StudyWide',
        group: 'SubjectID',
        key: 'siteIDSubjectIDSeperator',
        label: 'Site ID/Subject ID Seperator',
        type: FormFieldType.Text,
        valueIncrement: null,
        order: 0,
        descriptor: '',
        description: 'Site ID/Subject ID Seperator Field',
        defaultValue: null,
        placeHolderText : null,
        toggleText: null,
        selectOptions: null
      },
      validators: [
        { type: FormFieldValidatorType.MaxLength, value: 1, error: 'Exceeds Max Length' }
      ],
      value: '',
      isDirty: false
    },
    {
      properties: {
        section: 'StudyWide',
        group: 'SubjectID',
        key: 'subjectIDLength',
        label: 'Subject ID Length',
        type: FormFieldType.Number,
        valueIncrement: null,
        order: 0,
        descriptor: '',
        description: 'Subject ID Length Field',
        defaultValue: 4,
        placeHolderText : null,
        toggleText: null,
        selectOptions: null
      },
      validators: [
        {type: FormFieldValidatorType.Min, value: 0, error: 'Value must be between 0 - 20'},
        {type: FormFieldValidatorType.Max, value: 20, error: 'Value must be between 0 - 20'},
      ],
      value: '',
      isDirty: false
    },
  ];
  private ecoaGeneralFields: FormField[] = [
    {
      properties: {
        section: 'eCOA',
        group: 'General',
        key: 'maximumIncorrectPINAttempts',
        label: 'Maximum Incorrect PIN Attempts',
        type: FormFieldType.Number,
        valueIncrement: null,
        order: 0,
        descriptor: '',
        description: 'Maximum Incorrect PIN Attempts Field',
        defaultValue: 10,
        placeHolderText : null,
        toggleText: null,
        selectOptions: null
      },
      validators: [
        {type: FormFieldValidatorType.Min, value: 0, error: 'Value must be between 0 - 100'},
        {type: FormFieldValidatorType.Max, value: 100, error: 'Value must be between 0 - 100'},
      ],
      value: '',
      isDirty: false
    },
    {
      properties: {
        section: 'eCOA',
        group: 'General',
        key: 'bYODEnabled',
        label: 'BYOD Enabled',
        type: FormFieldType.Toggle,
        valueIncrement: null,
        order: 0,
        descriptor: '',
        description: 'BYOD Enabled Field',
        defaultValue: null,
        placeHolderText : null,
        toggleText: null,
        selectOptions: null
      },
      validators: [],
      value: '',
      isDirty: false
    },
    {
      properties: {
        section: 'eCOA',
        group: 'General',
        key: 'enableCaregiverFunctions',
        label: 'Enable Caregiver Functions',
        type: FormFieldType.Number,
        valueIncrement: null,
        order: 0,
        descriptor: '',
        description: 'Enable Caregiver Functions Field',
        defaultValue: 10,
        placeHolderText : null,
        toggleText: null,
        selectOptions: null
      },
      validators: [],
      value: '',
      isDirty: false
    },
    {
      properties: {
        section: 'eCOA',
        group: 'General',
        key: 'allowCaregiverstoCompleteSubjectForms',
        label: 'Allow Caregivers to Complete Subject Forms',
        type: FormFieldType.Number,
        valueIncrement: null,
        order: 0,
        descriptor: '',
        description: 'Allow Caregivers to Complete Subject Forms Field',
        defaultValue: 10,
        placeHolderText : null,
        toggleText: null,
        selectOptions: null
      },
      validators: [],
      value: '',
      isDirty: false
    },
    {
      properties: {
        section: 'eCOA',
        group: 'General',
        key: 'subjectPinLength',
        label: 'Subject Pin Length',
        type: FormFieldType.Dropdown,
        valueIncrement: null,
        order: 0,
        descriptor: '',
        description: 'Subject Pin Length',
        defaultValue: null,
        placeHolderText : null,
        toggleText: null,
        selectOptions: [
          { label: '4', value: '4'},
          { label: '6', value: '6'}
        ],
      },
      validators: [],
      value: '',
      isDirty: false
    },
  ];
  private ecoaHandheldFields: FormField[] = [
    {
      properties: {
        section: 'eCOA',
        group: 'Handheld',
        key: 'userInactivityTimeout',
        label: 'User Inactivity Timeout',
        type: FormFieldType.Number,
        valueIncrement: null,
        order: 0,
        descriptor: '',
        description: 'User Inactivity Timeout Field',
        defaultValue: 10,
        placeHolderText : null,
        toggleText: null,
        selectOptions: null
      },
      validators: [
        {type: FormFieldValidatorType.Min, value: 0, error: 'Value must be between 0 - 60'},
        {type: FormFieldValidatorType.Max, value: 60, error: 'Value must be between 0 - 60'},
      ],
      value: '',
      isDirty: false
    },
    {
      properties: {
        section: 'eCOA',
        group: 'Handheld',
        key: 'scheduledDataSyncIntervalminutes',
        label: 'Scheduled Data Sync Interval (minutes)',
        type: FormFieldType.Number,
        valueIncrement: null,
        order: 0,
        descriptor: '',
        description: 'Scheduled Data Sync Interval (minutes) Field',
        defaultValue: null,
        placeHolderText : null,
        toggleText: null,
        selectOptions: null
      },
      validators: [
        {type: FormFieldValidatorType.Min, value: 60, error: 'Value must be between 60 - 10080'},
        {type: FormFieldValidatorType.Max, value: 10080, error: 'Value must be between 60 - 10080'},
      ],
      value: '',
      isDirty: false
    },
    {
      properties: {
        section: 'eCOA',
        group: 'Handheld',
        key: 'allowSubjectSetuponDevice',
        label: 'Allow Subject Setup on Device',
        type: FormFieldType.Toggle,
        valueIncrement: null,
        order: 0,
        descriptor: '',
        description: 'Allow Subject Setup on Device Field',
        defaultValue: null,
        placeHolderText : null,
        toggleText: null,
        selectOptions: null
      },
      validators: [],
      value: '',
      isDirty: false
    },
    {
      properties: {
        section: 'eCOA',
        group: 'Handheld',
        key: 'manageSubjectStatusDuringUnassignment',
        label: 'Manage Subject Status During Unassignment',
        type: FormFieldType.Toggle,
        valueIncrement: null,
        order: 0,
        descriptor: '',
        description: 'Manage Subject Status During Unassignment Field',
        defaultValue: null,
        placeHolderText : null,
        toggleText: null,
        selectOptions: null
      },
      validators: [],
      value: '',
      isDirty: false
    },
    {
      properties: {
        section: 'eCOA',
        group: 'Handheld',
        key: 'daisyChainRequiredQuestionnaires',
        label: 'Daisy Chain Required Questionnaires',
        type: FormFieldType.Toggle,
        valueIncrement: null,
        order: 0,
        descriptor: '',
        description: 'Daisy Chain Required Questionnaires Field',
        defaultValue: null,
        placeHolderText : null,
        toggleText: null,
        selectOptions: null
      },
      validators: [],
      value: '',
      isDirty: false
    },
    {
      properties: {
        section: 'eCOA',
        group: 'Handheld',
        key: 'handheldVisitActivation',
        label: 'Handheld Visit Activation',
        type: FormFieldType.Toggle,
        valueIncrement: null,
        order: 0,
        descriptor: '',
        description: 'Handheld Visit Activation Field',
        defaultValue: null,
        placeHolderText : null,
        toggleText: null,
        selectOptions: null
      },
      validators: [],
      value: '',
      isDirty: false
    },
    {
      properties: {
        section: 'eCOA',
        group: 'Handheld',
        key: 'webBackupKey',
        label: 'Web Backup Key',
        type: FormFieldType.Text,
        valueIncrement: null,
        order: 0,
        descriptor: '',
        description: 'Web Backup Key Field',
        defaultValue: '0',
        placeHolderText : null,
        toggleText: null,
        selectOptions: null
      },
      validators: [],
      value: '',
      isDirty: false
    },
    {
      properties: {
        section: 'eCOA',
        group: 'Handheld',
        key: 'webBackupExpirationDays',
        label: 'Web Backup Expiration (days)',
        type: FormFieldType.Number,
        valueIncrement: null,
        order: 0,
        descriptor: '',
        description: 'Web Backup Expiration (days) Field',
        defaultValue: 0,
        placeHolderText : null,
        toggleText: null,
        selectOptions: null
      },
      validators: [
        {type: FormFieldValidatorType.Min, value: 0, error: 'Value must be between 0 - 365'},
        {type: FormFieldValidatorType.Max, value: 365, error: 'Value must be between 0 - 365'},
      ],
      value: '',
      isDirty: false
    },
  ];
  private ecoaTabletFields: FormField[] = [
    {
      properties: {
        section: 'eCOA',
        group: 'Tablet',
        key: 'userInactivityTimeout',
        label: 'User Inactivity Timeout',
        type: FormFieldType.Number,
        valueIncrement: null,
        order: 0,
        descriptor: '',
        description: 'User Inactivity Timeout Field',
        defaultValue: 10,
        placeHolderText : null,
        toggleText: null,
        selectOptions: null
      },
      validators: [
        {type: FormFieldValidatorType.Min, value: 0, error: 'Value must be between 0 - 60'},
        {type: FormFieldValidatorType.Max, value: 60, error: 'Value must be between 0 - 60'},
      ],
      value: '',
      isDirty: false
    },
    {
      properties: {
        section: 'eCOA',
        group: 'Tablet',
        key: 'scheduledDataSyncIntervalminutes',
        label: 'Scheduled Data Sync Interval (minutes)',
        type: FormFieldType.Number,
        valueIncrement: null,
        order: 0,
        descriptor: '',
        description: 'Scheduled Data Sync Interval (minutes) Field',
        defaultValue: null,
        placeHolderText : null,
        toggleText: null,
        selectOptions: null
      },
      validators: [
        {type: FormFieldValidatorType.Min, value: 60, error: 'Value must be between 60 - 10080'},
        {type: FormFieldValidatorType.Max, value: 10080, error: 'Value must be between 60 - 10080'},
      ],
      value: '',
      isDirty: false
    },
    {
      properties: {
        section: 'eCOA',
        group: 'Tablet',
        key: 'criticalBatteryPercentage',
        label: 'Critical Battery Percentage',
        type: FormFieldType.Number,
        valueIncrement: null,
        order: 0,
        descriptor: '',
        description: 'Critical Battery Percentage Field',
        defaultValue: null,
        placeHolderText : null,
        toggleText: null,
        selectOptions: null
      },
      validators: [
        {type: FormFieldValidatorType.Min, value: 0, error: 'Value must be between 0 - 100'},
        {type: FormFieldValidatorType.Max, value: 100, error: 'Value must be between 0 - 100'},
      ],
      value: '',
      isDirty: false
    },
    {
      properties: {
        section: 'eCOA',
        group: 'Tablet',
        key: 'allowSubjectSetuponDevice',
        label: 'Allow Subject Setup on Device',
        type: FormFieldType.Toggle,
        valueIncrement: null,
        order: 0,
        descriptor: '',
        description: 'Allow Subject Setup on Device Field',
        defaultValue: null,
        placeHolderText : null,
        toggleText: null,
        selectOptions: null
      },
      validators: [],
      value: '',
      isDirty: false
    },
    {
      properties: {
        section: 'eCOA',
        group: 'Tablet',
        key: 'changeSubjectStatus',
        label: 'Change Subject Status',
        type: FormFieldType.Toggle,
        valueIncrement: null,
        order: 0,
        descriptor: '',
        description: 'Change Subject Status Field',
        defaultValue: null,
        placeHolderText : null,
        toggleText: null,
        selectOptions: null
      },
      validators: [],
      value: '',
      isDirty: false
    },
    {
      properties: {
        section: 'eCOA',
        group: 'Tablet',
        key: 'ignoreVisitSchedule',
        label: 'Ignore Visit Schedule',
        type: FormFieldType.Toggle,
        valueIncrement: null,
        order: 0,
        descriptor: '',
        description: 'Ignore Visit Schedule Field',
        defaultValue: null,
        placeHolderText : null,
        toggleText: null,
        selectOptions: null
      },
      validators: [],
      value: '',
      isDirty: false
    },
    {
      properties: {
        section: 'eCOA',
        group: 'Tablet',
        key: 'showQuestionnaireProgressBar',
        label: 'Show Questionnaire Progress Bar',
        type: FormFieldType.Toggle,
        valueIncrement: null,
        order: 0,
        descriptor: '',
        description: 'Show Questionnaire Progress Bar Field',
        defaultValue: null,
        placeHolderText : null,
        toggleText: null,
        selectOptions: null
      },
      validators: [],
      value: '',
      isDirty: false
    },
    {
      properties: {
        section: 'eCOA',
        group: 'Tablet',
        key: 'showVisitProgressBar',
        label: 'Show Visit Progress Bar',
        type: FormFieldType.Toggle,
        valueIncrement: null,
        order: 0,
        descriptor: '',
        description: 'Show Visit Progress Bar Field',
        defaultValue: null,
        placeHolderText : null,
        toggleText: null,
        selectOptions: null
      },
      validators: [],
      value: '',
      isDirty: false
    },
    {
      properties: {
        section: 'eCOA',
        group: 'Tablet',
        key: 'webBackupExpirationDays',
        label: 'Web Backup Expiration (days)',
        type: FormFieldType.Number,
        valueIncrement: null,
        order: 0,
        descriptor: '',
        description: 'Web Backup Expiration (days) Field',
        defaultValue: null,
        placeHolderText : null,
        toggleText: null,
        selectOptions: null
      },
      validators: [
        {type: FormFieldValidatorType.Min, value: 0, error: 'Value must be between 0 - 365'},
        {type: FormFieldValidatorType.Max, value: 365, error: 'Value must be between 0 - 365'},
      ],
      value: '',
      isDirty: false
    },
    {
      properties: {
        section: 'eCOA',
        group: 'Tablet',
        key: 'webBackupKey',
        label: 'Web Backup Key',
        type: FormFieldType.Text,
        valueIncrement: null,
        order: 0,
        descriptor: '',
        description: 'Web Backup Key Field',
        defaultValue: null,
        placeHolderText : null,
        toggleText: null,
        selectOptions: null
      },
      validators: [],
      value: '',
      isDirty: false
    },
  ];
  private commingSoonFields: FormField[] = [
    { properties: {
        type: FormFieldType.ComingSoon,
        section: null,
        group: null,
        key: null,
        order: 0,
        label: null,
        descriptor: null,
        description: null,
        valueIncrement: null,
        defaultValue: null,
        placeHolderText : null,
        toggleText: null,
        selectOptions: null
      },
      validators: null,
      value: 0,
      isDirty: false }
  ];

  private studySettingsFieldMatrix = [
    { categoryLink: 'StudyWideGeneral',   categoryFields: this.studyWideGeneralFields,    section: 'StudyWide', group: 'General' },
    { categoryLink: 'StudyWideSubjectID', categoryFields: this.studyWideSubjectIDFields,  section: 'StudyWide', group: 'SubjectID' },
    { categoryLink: 'EcoaGeneral',        categoryFields: this.ecoaGeneralFields,         section: 'Ecoa',      group: 'General' },
    { categoryLink: 'EcoaHandheld',       categoryFields: this.ecoaHandheldFields,        section: 'Ecoa',      group: 'Handheld' },
    { categoryLink: 'EcoaTablet',         categoryFields: this.ecoaTabletFields,          section: 'Ecoa',      group: 'Tablet' },
    { categoryLink: 'IrtGeneral',         categoryFields: this.commingSoonFields,         section: 'Irt',       group: 'General' },
    { categoryLink: 'IrtAlerts',          categoryFields: this.commingSoonFields,         section: 'Irt',       group: 'Alerts' }
  ];

  constructor(private title: Title, private studySettingsService: StudySettingsService) { }

  ngOnInit() {
    this.title.setTitle('Study Settings');
    this.onCategoryLinkSelected(this.defaultCategoryLink);
  }

  onCategoryLinkSelected(categoryLink: string) {

    // TODO: pull field metadata from api
    const activeFields = this.studySettingsFieldMatrix.filter(item => item.categoryLink === categoryLink );

    if (activeFields &&
        activeFields.length > 0) {
      this.studySettings = activeFields[0].categoryFields;
      this.studySettingsService
          .getStudySettingsCollection(activeFields[0].section, activeFields[0].group)
          .subscribe((studySettingsCollection) => {
            this.studySettings = studySettingsCollection;
          });
    }
  }
}
