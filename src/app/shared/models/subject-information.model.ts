import { BaseModel } from 'src/app/yprime-artifacts/models/base.model';
import { ActionPanelModel } from './actionPanel.model';
import { MuiOptionChoice } from 'src/app/yprime-artifacts/components/mui-table/mui-option-choice.model';

export interface SubjectInformation extends BaseModel<string> {
   name: string;
   disableNumeric: boolean;
   sequence: number;
   min: number;
   max: number;
   businessRule: string;
   countries: Array<string>;
   choiceType: string;
   choices: Array<MuiOptionChoice>;
   dateFormat: string;
   decimal: number;
   suffix: string;
   actionPanelModel: ActionPanelModel;
}
