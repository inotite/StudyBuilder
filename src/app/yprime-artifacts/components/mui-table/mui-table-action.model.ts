import {MuiColumnActionType} from './mui-table-actionType.model';

export interface MuiTableAction {
   id: string;
   data: any;
   actionType: MuiColumnActionType;
   isMultiPartForm: boolean;
}
