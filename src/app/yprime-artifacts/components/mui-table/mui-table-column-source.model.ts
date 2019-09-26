import {Observable} from 'rxjs';
import {BaseModel} from '../../models/base.model';

export interface MuiTableColumnSource {
   idKeyName: string;
   textKeyName: string;
   columnId: string;
   staticDataSource?: Observable<Array<BaseModel<string | number>>>;
   syncOnAction: boolean;
   syncSourceIndex: number;
}
