import { BaseModel } from 'src/app/yprime-artifacts/models/base.model';

export interface CareGiver extends BaseModel<string> {
   name: string;
   actionPanel: boolean;
}
