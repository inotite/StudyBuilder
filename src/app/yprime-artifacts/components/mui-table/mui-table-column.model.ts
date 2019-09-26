import {MuiTableColumnSource} from './mui-table-column-source.model';
import {MuiTableControlType} from './mui-table-controlType.model';
import {MuiTableColumnValidator} from './mui-table-column-validator.model';

export interface MuiTableColumn {
   id: string;
   columnDisplayName: string;
   isKey: boolean;
   isVisible: boolean;
   pipeForDisplay?: string;
   canBeAdded: boolean;
   canBeEdited: boolean;
   maxLength: number;
   isRequired: boolean;
   width: number;
   helpText: string;
   helpTextColumnRef?: string;
   acknowledgementText?: string;
   uniqueConstraintnMessage?: string;
   MuiTableControlType: MuiTableControlType;
   columnDataSource: MuiTableColumnSource;
   validations?: MuiTableColumnValidator[];
}
