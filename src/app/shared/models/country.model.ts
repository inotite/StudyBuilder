import {BaseModel} from 'src/app/yprime-artifacts/models/base.model';
import {ActionPanelModel} from './actionPanel.model';
import {Language} from './language.model';

export interface Country extends BaseModel<string> {
   shortName: string;
   name: string;
   notes: string;
   region: number;
   use24HourTime: boolean;
   useMetric: boolean;
   recordPatientInitials: boolean;
   useSubjectCode: boolean;
   recordPatientGender: boolean;
   recordPatientDob: boolean;
   patientDobFormat: number;
   actionPanelModel: ActionPanelModel;
   language: Array<Language>;
}
