import { MuiTableColumnSource } from './mui-table-column-source.model';
import { MuiTableControlType } from './mui-table-controlType.model';
import { MuiTableColumnValidator } from './mui-table-column-validator.model';
import { MuiTableColumn } from './mui-table-column.model';

export interface MuiDynamicTableColumn extends MuiTableColumn {
   isColumnReferenceSchema: boolean;
}
