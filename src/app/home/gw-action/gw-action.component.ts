import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
    selector: 'gw-action-dialog',
    templateUrl: 'gw-action.component.html',
})
export class GwActionDialog {
    gwActions=['feeder', 'alarm', 'oxygen', 'coldWater', 'hotWater', 'acid', 'base']
    public data
    constructor(
        public dialogRef: MatDialogRef<GwActionDialog>) {
            this.data = {"action": "feeder", "actionTime": "30"}
        }
    onNoClick(): void {
        this.dialogRef.close();
    }
}
