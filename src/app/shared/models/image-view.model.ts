import { BaseModel } from 'src/app/yprime-artifacts/models/base.model';

export interface ImageView extends BaseModel<string> {
   source: string;
   imageName: string;
}
