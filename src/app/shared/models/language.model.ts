import { BaseModel } from 'src/app/yprime-artifacts/models/base.model';
import { ActionPanelModel } from './actionPanel.model';

export interface Language extends BaseModel<string> {
    languageId: number;
    cultureName: string;
    name: string;
    displayName: string;
    isDefault: boolean;
    isActive: Boolean;
    translationApproved: boolean;
    isRightToLeft: boolean;
    countries: Array<string>;
    actionPanelModel: ActionPanelModel;
}
