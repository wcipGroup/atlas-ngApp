import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';



@Component({
    selector: 'add-application-dialog',
    templateUrl: 'add-application.component.html',
  })
 export class NewApplicationDialog {
    public data
    constructor(
      public dialogRef: MatDialogRef<NewApplicationDialog>) {
          this.data = {"appName": "", "appId": "", "appKey": ""}
      }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
  }