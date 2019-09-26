import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { YPrimeArtifactsModule } from './yprime-artifacts/yprime-artifacts.module';
import { MaterialUIModule } from './yprime-artifacts/material-ui/material-ui.module';

import { ArrowComponent } from './shared/components/arrow/arrow.component';
import { HomeComponent } from './home/home.component';
import { UserInfoComponent } from './userinfo/user-info.component';
import { HomeHeaderComponent } from './home/home-header/home-header.component';
import { BackgroundImageDirective } from './shared/directives/background-image.directive';
import { HomeArrowWrapperComponent } from './home/home-arrow-wrapper/home-arrow-wrapper.component';
import { HomeIconComponent } from './home/home-icon/home-icon.component';
import { HomeHorizontalRowSectionComponent } from './home/home-horizontal-row-section/home-horizontal-row-section.component';
import { HomeVerticalRowComponent } from './home/home-vertical-row/home-vertical-row.component';
import { HomeHorizontalRowComponent } from './home/home-horizontal-row/home-horizontal-row.component';
import { HomeBodyComponent } from './home/home-body/home-body.component';
import { MenubarComponent } from './menubar/menubar-component';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { CreateQuestionnaireComponent } from './create-questionnaire/create-questionnaire.component';
import { QuestionnaireLeftPanelComponent } from './create-questionnaire/questionnaire-left-panel/questionnaire-left-panel.component';
import { QuestionnaireListComponent } from './create-questionnaire/questionnaire-list/questionnaire-list.component';
import { QuestionnaireMiddlePanelComponent } from './create-questionnaire/questionnaire-middle-panel/questionnaire-middle-panel.component';
import { QuestionnaireRightPanelComponent } from './create-questionnaire/questionnaire-right-panel/questionnaire-right-panel.component';
import { RedirectToURLComponent } from './redirect-to-url/redirect-to-url.component';
import { AddQuestionnaireComponent } from './create-questionnaire/add-questionnaire/add-questionnaire.component';
import { QuestionnaireFormComponent } from './create-questionnaire/questionnaire-form/questionnaire-form.component';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UnifiedQuestionnaireComponent } from './create-questionnaire/unified-questionnaire/unified-questionnaire.component';
import { EcoaQuestionnaireComponent } from './create-questionnaire/ecoa-questionnaire/ecoa-questionnaire.component';
import { IrtQuestionnaireComponent } from './create-questionnaire/irt-questionnaire/irt-questionnaire.component';
import { QuestionnaireNameComponent } from './create-questionnaire/questionnaire-name/questionnaire-name.component';
import { QuestionnaireTypeComponent } from './create-questionnaire/questionnaire-type/questionnaire-type.component';
import { SubmitActionComponent } from './create-questionnaire/submit-action/submit-action.component';
import { TrueFalseRadioGroupComponent } from './shared/components/true-false-radio-group/true-false-radio-group.component';
import { QuestionnaireButtonsComponent } from './create-questionnaire/questionnaire-buttons/questionnaire-buttons.component';
import { StudySettingsComponent } from './study-settings/study-settings.component';
import { StudySettingsLeftPanelComponent } from './study-settings/left-panel/study-settings-left-panel.component';
import { StudySettingsMiddlePanelComponent } from './study-settings/middle-panel/study-settings-middle-panel.component';
import { StudySettingsRightPanelComponent } from './study-settings/right-panel/study-settings-right-panel.component';
import { AlarmsComponent } from './alarms/alarms.component';
import { BusinessRulesComponent } from './business-rules/business-rules.component';
import { CalculationsComponent } from './calculations/calculations.component';
import { DCFWorkflowComponent } from './dcfworkflow/dcfworkflow.component';
import { EmailBuilderComponent } from './email-builder/email-builder.component';
import { ReportLayoutsComponent } from './report-layouts/report-layouts.component';
import { ImagesComponent } from './images/images.component';
import { TranslationsComponent } from './translations/translations.component';
import { WidgetsComponent } from './widgets/widgets.component';
import { SubmitActionsComponent } from './submit-actions/submit-actions.component';
import { SRDComponent } from './srd/srd.component';
import { ScreenReportsComponent } from './screen-reports/screen-reports.component';
import { DataModelComponent } from './data-model/data-model.component';
import { PanelTitleComponent } from './shared/components/panel-title/panel-title.component';
import { LanguagesComponent } from './languages/languages.component';
import { CountriesComponent } from './countries/countries.component';
import { SubjectInformationComponent } from './subject-information/subject-information.component';
import { CaregiversComponent } from './caregivers/caregivers.component';
import { DrugTypesComponent } from './drug-types/drug-types.component';
import { DoseLevelsComponent } from './dose-levels/dose-levels.component';
import { TreatmentsComponent } from './treatments/treatments.component';
import { VisitsComponent } from './visits/visits.component';
import { VisitQuestionnairesComponent } from './visit-questionnaires/visit-questionnaires.component';
import { DispensationsComponent } from './dispensations/dispensations.component';
import { DrugReturnsComponent } from './drug-returns/drug-returns.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ImageViewComponent } from './image-view/image-view.component';
import { ChoiceModalComponent } from './yprime-artifacts/components/modals/choice/choice-modal.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FooterComponent } from './footer/footer.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { HelperTextComponent } from './shared/components/helper-text/helper-text.component';

@NgModule({
   declarations: [
      AppComponent,
      HomeComponent,
      UserInfoComponent,
      HomeHeaderComponent,
      BackgroundImageDirective,
      MenubarComponent,
      ComingSoonComponent,
      HomeIconComponent,
      HomeHorizontalRowSectionComponent,
      HomeVerticalRowComponent,
      HomeHorizontalRowComponent,
      HomeBodyComponent,
      ComingSoonComponent,
      CreateQuestionnaireComponent,
      QuestionnaireLeftPanelComponent,
      QuestionnaireListComponent,
      QuestionnaireMiddlePanelComponent,
      QuestionnaireRightPanelComponent,
      RedirectToURLComponent,
      AddQuestionnaireComponent,
      HomeArrowWrapperComponent,
      ArrowComponent,
      QuestionnaireFormComponent,
      EcoaQuestionnaireComponent,
      IrtQuestionnaireComponent,
      UnifiedQuestionnaireComponent,
      QuestionnaireNameComponent,
      QuestionnaireTypeComponent,
      SubmitActionComponent,
      TrueFalseRadioGroupComponent,
      QuestionnaireButtonsComponent,
      StudySettingsComponent,
      StudySettingsLeftPanelComponent,
      StudySettingsMiddlePanelComponent,
      StudySettingsRightPanelComponent,
      AlarmsComponent,
      BusinessRulesComponent,
      CalculationsComponent,
      DCFWorkflowComponent,
      EmailBuilderComponent,
      ReportLayoutsComponent,
      ImagesComponent,
      ImageViewComponent,
      TranslationsComponent,
      WidgetsComponent,
      SubmitActionsComponent,
      SRDComponent,
      ScreenReportsComponent,
      DataModelComponent,
      LanguagesComponent,
      CountriesComponent,
      SubjectInformationComponent,
      CaregiversComponent,
      DrugTypesComponent,
      DoseLevelsComponent,
      TreatmentsComponent,
      VisitsComponent,
      VisitQuestionnairesComponent,
      DispensationsComponent,
      DrugReturnsComponent,
      PanelTitleComponent,
      PageNotFoundComponent,
      FooterComponent,
      AccessDeniedComponent,
      HelperTextComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      NgbModule,
      HttpClientModule,
      BrowserAnimationsModule,
      FormsModule,
      ReactiveFormsModule,
      MaterialUIModule,
      YPrimeArtifactsModule
   ],
   providers: [
      { provide: LocationStrategy, useClass: PathLocationStrategy },
      { provide: LOCALE_ID, useValue: 'en' },
      { provide: HttpClientModule, useClass: HttpClientModule },
      { provide: MatDialogRef, useValue: {} },
      { provide: MAT_DIALOG_DATA, useValue: [] },
      Title
   ],
   entryComponents: [
      ComingSoonComponent,
      QuestionnaireLeftPanelComponent,
      QuestionnaireMiddlePanelComponent,
      QuestionnaireRightPanelComponent,
      ChoiceModalComponent
   ],
   bootstrap: [AppComponent, MenubarComponent]
})
export class AppModule {}
