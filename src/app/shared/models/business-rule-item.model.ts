import { BaseModel } from 'src/app/yprime-artifacts/models/base.model';

export interface BusinessRuleItem extends BaseModel<string> {
   name: string;
   description: string;
   inclusive: boolean;
}
