import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
/*
@Component({
  selector: 'section-edit-dialog',
  templateUrl: 'section.dialog.html',
})
*/
export class SectionEditDialog {
    choosenData:any;
  constructor(
    public dialogRef: MatDialogRef<SectionEditDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onFontColorSelect(event:any){
      this.choosenData=event;
  }
}


/**  Copyright 2017 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */