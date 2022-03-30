import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';



@Component({
    selector: 'change-tx-power-dialog',
    templateUrl: 'change-tx-power.component.html',
})
export class ChangeTxPowerDialog {
    public data
    powerLevels = [0,1,2]
    constructor(
        public dialogRef: MatDialogRef<ChangeTxPowerDialog>) {
        this.data = {"txPower": Number()}
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    powerToH(power){
        switch (power){
            default: return "Χαμηλή ισχύς"
            case 1: return "Μεσαία ισχύς"
            case 2: return "Υψηλή ισχύς"
        }
    }

}
