import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';



@Component({
    selector: 'add-gateway-dialog',
    templateUrl: 'add-gateway.component.html',
})
export class NewGatewayDialog {
    public data
    constructor(
        public dialogRef: MatDialogRef<NewGatewayDialog>) {
        this.data = {"gwName": "", "gwId": ""}
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

}
