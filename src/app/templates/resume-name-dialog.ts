import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
@Component({
    selector: 'resume-title-dialog',
    templateUrl: 'resume-name-dialog.html',
  })
  export class ResumeTitleDialog {
  
    constructor(
      public dialogRef: MatDialogRef<ResumeTitleDialog>,
      @Inject(MAT_DIALOG_DATA) public data: any) { }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
}