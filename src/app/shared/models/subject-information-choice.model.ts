import { BaseModel } from 'src/app/yprime-artifacts/models/base.model';

export interface SubjectInformationChoice extends BaseModel<string> {
   translationKey: string;
   displayOrder: number;
}
