import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';



@Component({
    selector: 'change-interval-dialog',
    templateUrl: 'change-interval.component.html',
  })
 export class ChangeIntervalDialog {
    public data
    constructor(
      public dialogRef: MatDialogRef<ChangeIntervalDialog>) {
          this.data = {"interval": Number()}
      }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
  }