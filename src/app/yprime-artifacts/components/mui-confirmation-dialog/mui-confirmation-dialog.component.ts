import { Component, HostListener, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MuiConfirmationDialog } from './mui-confirmation-dialog.model';

@Component({
  selector: 'app-mui-confirmation-dialog',
  templateUrl: './mui-confirmation-dialog.component.html',
  styleUrls: ['./mui-confirmation-dialog.component.scss']
})
export class MuiConfirmationDialogComponent {
  settings: MuiConfirmationDialog;
  displayTitle = false;

  constructor(private dialogRef: MatDialogRef<MuiConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: MuiConfirmationDialog) {
    this.settings = data;
  }

  @HostListener('window:keyup.esc') onKeyUp() {
    this.dialogRef.close();
  }
}
