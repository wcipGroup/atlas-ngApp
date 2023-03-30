import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import { NotificationBodyDialog } from './notification-body'
@Component({
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit{
    lastFetchedId = 0;
    firstFetchedId = 0;
    currentPage = 1;
    currentUser: any;
    nTotalDocuments = 0;
    notifications = [];
    displayedColumns = ['msgHeader', 'time']
    nPerPage = 5;
    nOfPages = 0
    disableNext = false;
    disablePrevious = true;
    tableLoading = false;
    constructor(private http:HttpClient, public dialog: MatDialog){
        this.disableNext = false;
        this.disablePrevious = true;
    }
    ngOnInit(): void {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
        this.fetchNotifications(true, true, this.lastFetchedId)
    }
    fetchNotifications(firstPage, next, startId){
        this.tableLoading = true;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('currentUser'))["access_token"]
          });
        let params = new HttpParams();
        if (next){
            params = params.set('directionNext', "next")
        }
        if (!firstPage){
            params = params.set('startId', String(startId))
        }
        params = params.set('nPerPage', String(this.nPerPage))
        console.log(params)
        this.http.get<any>(`${environment.apiUrl}user-data/notifications/${this.currentUser.identity}`, {params, headers})
        .subscribe(data => {
            console.log(data);
            this.notifications = data["data"]
            this.firstFetchedId = this.notifications[0]["time"]
            this.lastFetchedId = this.notifications[this.notifications.length -1]["time"]
            this.nTotalDocuments = data["count"]
            this.nOfPages = Math.ceil(this.nTotalDocuments/this.nPerPage)
            this.tableLoading = false;
        }, error => {this.tableLoading = false})
    }
    fetchPrepare(nextFlag){
        if (!nextFlag){ //so if i choose previous
            if (this.currentPage == 1){return} //i should put an error indicator for that reason.
            this.disableNext = false;
            this.currentPage = this.currentPage - 1
            if (this.currentPage == 1){this.disablePrevious = true;}
            this.fetchNotifications(false, false, this.firstFetchedId)
        }else{ //if i choose next
            if (this.currentPage == this.nOfPages){return} //i should put an error indicator for that reason.
            this.disablePrevious = false;
            this.currentPage = this.currentPage + 1
            if(this.currentPage == this.nOfPages){this.disableNext = true;}
            this.fetchNotifications(false, true, this.lastFetchedId)
        }
    }
    openDialog(dialogContent) {
        this.dialog.open(NotificationBodyDialog, {
            data: {
              msgBody: dialogContent
            }
          });
    }
}
