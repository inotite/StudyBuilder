import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserInfoComponent } from './userinfo/user-info.component';
import { CreateQuestionnaireComponent } from './create-questionnaire/create-questionnaire.component';
import { QuestionnaireFormComponent } from './create-questionnaire/questionnaire-form/questionnaire-form.component';
import { StudySettingsComponent } from './study-settings/study-settings.component';
import { AlarmsComponent } from './alarms/alarms.component';
import { ReportLayoutsComponent } from './report-layouts/report-layouts.component';
import { DCFWorkflowComponent } from './dcfworkflow/dcfworkflow.component';
import { WidgetsComponent } from './widgets/widgets.component';
import { TranslationsComponent } from './translations/translations.component';
import { EmailBuilderComponent } from './email-builder/email-builder.component';
import { ImagesComponent } from './images/images.component';
import { CalculationsComponent } from './calculations/calculations.component';
import { BusinessRulesComponent } from './business-rules/business-rules.component';
import { SubmitActionsComponent } from './submit-actions/submit-actions.component';
import { SRDComponent } from './srd/srd.component';
import { DataModelComponent } from './data-model/data-model.component';
import { ScreenReportsComponent } from './screen-reports/screen-reports.component';
import { LanguagesComponent } from './languages/languages.component';
import { CountriesComponent } from './countries/countries.component';
import { SubjectInformationComponent } from './subject-information/subject-information.component';
import { CaregiversComponent } from './caregivers/caregivers.component';
import { DrugTypesComponent } from './drug-types/drug-types.component';
import { DoseLevelsComponent } from './dose-levels/dose-levels.component';
import { TreatmentsComponent } from './treatments/treatments.component';
import { VisitQuestionnairesComponent } from './visit-questionnaires/visit-questionnaires.component';
import { VisitsComponent } from './visits/visits.component';
import { DispensationsComponent } from './dispensations/dispensations.component';
import { DrugReturnsComponent } from './drug-returns/drug-returns.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ImageViewComponent } from './image-view/image-view.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { AccessDeniedComponent } from './access-denied/access-denied.component';

const routes: Routes = [
   { path: 'home', redirectTo: '' },
   { path: '', component: HomeComponent, pathMatch: 'full', canActivate: [AuthGuard] },
   {
      path: 'Questionnaires',
      canActivate: [AuthGuard],
      component: CreateQuestionnaireComponent,
      children: [
         {
            path: 'questionnaire-form',
            component: QuestionnaireFormComponent
         }
      ]
   },
   { path: 'StudySettings', component: StudySettingsComponent, canActivate: [AuthGuard] },
   { path: 'Languages', component: LanguagesComponent, canActivate: [AuthGuard] },
   { path: 'Countries', component: CountriesComponent, canActivate: [AuthGuard] },
   { path: 'SubjectInformation', component: SubjectInformationComponent, canActivate: [AuthGuard] },
   { path: 'Caregivers', component: CaregiversComponent, canActivate: [AuthGuard] },
   { path: 'DrugTypes', component: DrugTypesComponent, canActivate: [AuthGuard] },
   { path: 'DoseLevels', component: DoseLevelsComponent, canActivate: [AuthGuard] },
   { path: 'Treatments', component: TreatmentsComponent, canActivate: [AuthGuard] },
   { path: 'VisitQuestionnaires', component: VisitQuestionnairesComponent, canActivate: [AuthGuard] },
   { path: 'Visits', component: VisitsComponent, canActivate: [AuthGuard] },
   { path: 'Dispensations', component: DispensationsComponent, canActivate: [AuthGuard] },
   { path: 'DrugReturns', component: DrugReturnsComponent, canActivate: [AuthGuard] },
   { path: 'ScreenReports', component: ScreenReportsComponent, canActivate: [AuthGuard] },
   { path: 'DataModel', component: DataModelComponent, canActivate: [AuthGuard] },
   { path: 'SRD', component: SRDComponent, canActivate: [AuthGuard] },
   { path: 'BusinessRules', component: BusinessRulesComponent, canActivate: [AuthGuard] },
   { path: 'Calculations', component: CalculationsComponent, canActivate: [AuthGuard] },
   { path: 'Alarms', component: AlarmsComponent, canActivate: [AuthGuard] },
   { path: 'Images', component: ImagesComponent, canActivate: [AuthGuard] },
   { path: 'Images/:id', component: ImageViewComponent, canActivate: [AuthGuard] },
   { path: 'SubmitActions', component: SubmitActionsComponent, canActivate: [AuthGuard] },
   { path: 'EmailBuilder', component: EmailBuilderComponent, canActivate: [AuthGuard] },
   { path: 'Translations', component: TranslationsComponent, canActivate: [AuthGuard] },
   { path: 'Widgets', component: WidgetsComponent, canActivate: [AuthGuard] },
   { path: 'DCFWorkflow', component: DCFWorkflowComponent, canActivate: [AuthGuard] },
   { path: 'ReportLayouts', component: ReportLayoutsComponent, canActivate: [AuthGuard] },
   { path: 'userinfo', component: UserInfoComponent, canActivate: [AuthGuard] },
   { path: 'access-denied', component: AccessDeniedComponent },
   { path: '**', component: PageNotFoundComponent }
];

@NgModule({
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule]
})
export class AppRoutingModule {}
