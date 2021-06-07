import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {NewApplicationDialog} from './add-application/add-application.component'
import {NewDeviceDialog} from './add-device/add-device.component'

@Component({
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
    currentUser: any;
    applications = [];
    application = undefined
    devices = [];
    showDevices = false;
    displayedColumns: string[] = ['devName', 'devAddr', 'lastSeen'];
    constructor(private http: HttpClient, public dialog: MatDialog){}
    ngOnInit(): void {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
        this.fetchApplications()
        
    }


    fetchApplications(){
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('currentUser'))["access_token"]
        });
        this.http.get<any>(`${environment.apiUrl}user-data/applications/${this.currentUser.identity}`, {headers})
        .subscribe(data => {
            this.applications = data["applications"]
        })
    }

    addApplication(){
        const dialogRef = this.dialog.open(NewApplicationDialog, {
            width: '250px'
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result != undefined){
                const headers = new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('currentUser'))["access_token"]
                });
                this.http.post<any>(`${environment.apiUrl}user-data/applications/${this.currentUser.identity}`, result, {headers})
                .subscribe(
                    data => {
                        alert('Η εφαρμογή προστέθηκε επιτυχώς')
                    },
                    error => {
                        alert('Υπήρξε κάποιο πρόβλημα. Παρακαλώ δοκιμάστε πάλι σε λίγα λεπτά');
                    }
                );
            }
        });
    }
    addDevice(){
        const dialogRef = this.dialog.open(NewDeviceDialog, {
            width: '250px'
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result != undefined){
                const headers = new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('currentUser'))["access_token"]
                });
                this.http.post<any>(`${environment.apiUrl}user-data/devices/${this.application.appId}`, result, {headers})
                .subscribe(
                    data => {
                        alert('Η συσκευή προστέθηκε επιτυχώς')
                    },
                    error => {
                        alert('Υπήρξε κάποιο πρόβλημα. Παρακαλώ δοκιμάστε πάλι σε λίγα λεπτά');
                    }
                );
            }
        })
    }
    appSelected(app){
        console.log(app)
        this.application = app
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('currentUser'))["access_token"]
        });
        this.http.get<any>(`${environment.apiUrl}user-data/devices/${app['appId']}`, {headers})
        .subscribe(
            data => {
                console.log(data)
                this.devices = data["devices"];
                this.showDevices = true;
            }, error =>{
                console.log(error)
        })
    }
}
