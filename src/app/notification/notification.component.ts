import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

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
    nPerPage = 2;
    nOfPages = 0
    constructor(private http:HttpClient){}
    ngOnInit(): void {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
        this.fetchNotifications(true, true, this.lastFetchedId)
    }
    fetchNotifications(firstPage, next, startId){
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
        })
    }
    fetchPrepare(nextFlag){
        if (!nextFlag){ //so if i choose previous
            if (this.currentPage == 1){return} //i should put an error indicator for that reason.
            this.currentPage = this.currentPage - 1
            this.fetchNotifications(false, false, this.firstFetchedId)
        }else{ //if i choose next
            if (this.currentPage == this.nOfPages){return} //i should put an error indicator for that reason.
            this.currentPage = this.currentPage + 1
            this.fetchNotifications(false, true, this.lastFetchedId)
        }
    }

}