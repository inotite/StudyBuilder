import {QuestionnaireTaker} from './questionnaire-taker.model';
import {QuestionnaireDeviceType} from './questionnaire-device-type.model';

export interface QuestionnaireTypeMapItem {
   questionnaireTaker: QuestionnaireTaker;
   deviceType: QuestionnaireDeviceType;
   isTraining: boolean;
}
