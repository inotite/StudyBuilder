import { NgModule } from '@angular/core';
import { PanelDirective } from './directives/panel.directive';
import { OnOffPipe } from './pipes/on-off.pipe';
import { DashCasePipe } from './pipes/dash-case.pipe';
import { FormatBytesPipe } from './pipes/format-bytes';
import { PipeHelper } from './pipes/pipe-helper';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { CommonModule } from '@angular/common';
import { ListComponent } from './components/list/list.component';
import { RouterModule } from '@angular/router';
import { SaveCancelActionBarComponent } from './components/save-cancel-action-bar/save-cancel-action-bar.component';
import { DragDropListComponent } from './components/drag-drop-list/drag-drop-list.component';
import { MaterialUIModule } from './material-ui/material-ui.module';
import { QuillRichTextComponent } from './components/quill-rich-text/quill-rich-text.component';
import { MuiInlineTableComponent } from './components/mui-table/mui-inline-table/mui-inline-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MuiConfirmationDialogComponent } from './components/mui-confirmation-dialog/mui-confirmation-dialog.component';
import { InlineTableConsumerBaseComponent } from './components/mui-table/inline-table-consumer-base/inline-table-consumer-base.component';
import { ExpandableListComponent } from './components/expandable-list/expandable-list.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { MuiDynamicColsTableComponent } from './components/mui-table/mui-dynamic-cols-table/mui-dynamic-cols-table.component';
import { ChoiceModalComponent } from './components/modals/choice/choice-modal.component';
import { FormFieldTextInputComponent } from './components/form-field/text-input/text-input.component';
import { FormFieldNumberInputComponent } from './components/form-field/number-input/number-input.component';
import { FormFieldDropdownSelectComponent } from './components/form-field/dropdown-select/dropdown-select.component';
import { FormFieldToggleButtonComponent } from './components/form-field/toggle-button/toggle-button.component';
import { FormFieldComponent } from './components/form-field/form-field.component';

@NgModule({
   imports: [
      CommonModule,
      RouterModule,
      FormsModule,
      ReactiveFormsModule,
      MaterialUIModule
   ],
   exports: [
      PanelDirective,
      OnOffPipe,
      DashCasePipe,
      FormatBytesPipe,
      PipeHelper,
      DropdownComponent,
      ListComponent,
      SaveCancelActionBarComponent,
      QuillRichTextComponent,
      MuiDynamicColsTableComponent,
      MuiInlineTableComponent,
      InlineTableConsumerBaseComponent,
      ExpandableListComponent,
      FileUploadComponent,
      ChoiceModalComponent,
      FormFieldTextInputComponent,
      FormFieldNumberInputComponent,
      FormFieldDropdownSelectComponent,
      FormFieldToggleButtonComponent,
      FormFieldComponent
   ],
   entryComponents: [
      MuiConfirmationDialogComponent,
      FormFieldTextInputComponent,
      FormFieldNumberInputComponent,
      FormFieldDropdownSelectComponent,
      FormFieldToggleButtonComponent,
   ],
   declarations: [
      PanelDirective,
      OnOffPipe,
      DashCasePipe,
      FormatBytesPipe,
      PipeHelper,
      DropdownComponent,
      ListComponent,
      SaveCancelActionBarComponent,
      DragDropListComponent,
      QuillRichTextComponent,
      MuiDynamicColsTableComponent,
      MuiInlineTableComponent,
      MuiConfirmationDialogComponent,
      InlineTableConsumerBaseComponent,
      ExpandableListComponent,
      FileUploadComponent,
      ChoiceModalComponent,
      FormFieldTextInputComponent,
      FormFieldNumberInputComponent,
      FormFieldDropdownSelectComponent,
      FormFieldToggleButtonComponent,
      FormFieldComponent
   ]
})
export class YPrimeArtifactsModule {}
