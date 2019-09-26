import {BaseModel} from 'src/app/yprime-artifacts/models/base.model';
import {FileItem} from 'src/app/yprime-artifacts/models/file-item.model';

export interface Image extends BaseModel<string> {
   imageContent: FileItem;
   language: string;
   displayName: string;
}
