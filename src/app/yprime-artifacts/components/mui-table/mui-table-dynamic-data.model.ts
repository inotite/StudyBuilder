import { BaseModel } from '../../models/base.model';
import { Observable } from 'rxjs';

export interface DynamicTableData {
    index: number;
    data: Array<BaseModel<string|number>>;
    dynamicDataSource: Observable<Array<BaseModel<string|number>>>;
}

