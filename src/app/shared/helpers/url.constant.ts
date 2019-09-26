import { environment } from '../../../environments/environment';

const root = environment.settings.apiRoot.endsWith('/')
   ? environment.settings.apiRoot
   : environment.settings.apiRoot + '/';

export const homePageIconUrl = root + 'HomePageIcon';
export const staticDataUrl = root + 'StaticData';
export const studyCustomUrl = root + 'StudyCustom';
export const submitActionUrl = root + 'SubmitAction';
export const businessRuleUrl = root + 'BusinessRule';
export const emailContentUrl = root + 'EmailContent';
export const saveStudyCustomUrl = studyCustomUrl + '/Save/';
export const questionnaireTypeUrl = root + 'QuestionnaireType';
export const questionnaireUrl = root + 'Questionnaire';
export const questionnaireTypesMappingUrl =
   questionnaireTypeUrl + 'QuestionnaireTypeMapping';
export const questionnaireTakerTypeUrl = root + 'QuestionnaireTakerType';
export const questionnaireDeviceTypeUrl = root + 'QuestionnaireDeviceType';
export const careGiversUrl = root + 'CaregiverType';
export const languageUrl = root + 'Language';
export const imageUrl = root + 'Image';
export const countryUrl = root + 'Country';
export const subjectAttributeUrl = root + 'SubjectAttribute';
export const studySettingsUrl = root + 'StudySetting';
