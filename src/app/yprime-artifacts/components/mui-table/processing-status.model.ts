import { MuiColumnActionType } from './mui-table-actionType.model';
import { MuiTableStatus } from './mui-table-status.model';

export interface ProcessingStatus {
    status: MuiTableStatus;
    notificationActionType: MuiColumnActionType;
    notificationMessage: string;
}
