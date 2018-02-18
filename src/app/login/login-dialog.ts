import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'login-dialog',
  templateUrl: 'login-dialog.html',
})
export class LoginDialog {
  
  constructor(
    public dialogRef: MatDialogRef<LoginDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  closeDialog(event:any):void {
      let result={isLoggedIn:true,typeOfLogin:event};
    this.dialogRef.close(result);
  }
}


