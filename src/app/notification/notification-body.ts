import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
    selector: 'notification-body-dialog',
    templateUrl: 'notification-body.html',
  })
  export class NotificationBodyDialog {
    constructor(@Inject(MAT_DIALOG_DATA) public data: any){}
    ngOnInit(): void {
        console.log(this.data)
    }
  }