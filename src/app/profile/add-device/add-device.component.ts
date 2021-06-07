import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';



@Component({
    selector: 'add-device-dialog',
    templateUrl: 'add-device.component.html',
  })
 export class NewDeviceDialog {
    public data
    constructor(
      public dialogRef: MatDialogRef<NewDeviceDialog>) {
          this.data = {"devAddr": "", "devName": ""}
      }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
  }