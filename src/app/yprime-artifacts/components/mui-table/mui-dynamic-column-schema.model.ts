import { BaseModel } from '../../models/base.model';

export interface MuiDynamicColumnSchema extends BaseModel<string | number> {
   columnSchema: Array<string>;
}
