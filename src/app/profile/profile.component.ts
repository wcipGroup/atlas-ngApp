import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {NewApplicationDialog} from './add-application/add-application.component'
import {NewDeviceDialog} from './add-device/add-device.component'
import {NewGatewayDialog} from './add-gateway/add-gateway.component'
import {ChangeIntervalDialog} from './change-interval/change-interval.component'

@Component({
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
    currentUser: any;
    applications = [];
    profile
    application = undefined
    devices = [];
    gateways = [];
    showDevices = false;
    displayedColumns: string[] = ['devName', 'devAddr', 'lastSeen', 'interval'];
    gatewayTableColumns: string[] = ['gwName', 'gwId', 'lastSeen']
    newPass
    autoActions
    autoActionsTimePeriod
    constructor(private http: HttpClient, public dialog: MatDialog){}
    ngOnInit(): void {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
        this.newPass = ""
        this.autoActions = false
        this.autoActionsTimePeriod = false
        this.fetchApplications()
        this.fetchProfile()
    }

    fetchProfile(){
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('currentUser'))["access_token"]
        });
        this.http.get<any>(`${environment.apiUrl}user-data/profile/${this.currentUser.identity}`, {headers})
        .subscribe(
            data => {
                console.log("profile found: ", data)
                this.autoActions = data["profile"]["autoActions"]
                this.autoActionsTimePeriod = data["profile"]["autoActionsTimePeriod"]
            },error => {
                console.log("profile not found")
                this.autoActions = false
                this.autoActionsTimePeriod = false
            })
    }

    fetchApplications(){
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('currentUser'))["access_token"]
        });
        this.http.get<any>(`${environment.apiUrl}user-data/applications`, {headers})
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
                this.http.post<any>(`${environment.apiUrl}user-data/applications`, result, {headers})
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
    changeInterval(devAddr){
        const dialogRef = this.dialog.open(ChangeIntervalDialog, {
            width: '250px'
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result != undefined){
                console.log(`new interval for ${devAddr}: ${result.interval}`)
                const headers = new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('currentUser'))["access_token"]
                });
                this.http.post<any>(`${environment.apiUrl}user-data/${devAddr}/interval`, result, {headers})
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
                        this.appSelected(this.application)
                    },
                    error => {
                        alert('Υπήρξε κάποιο πρόβλημα. Παρακαλώ δοκιμάστε πάλι σε λίγα λεπτά');
                    }
                );
            }
        })
    }
    addGateway(){
        const dialogRef = this.dialog.open(NewGatewayDialog, {
            width: '250px'
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result != undefined){
                const headers = new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('currentUser'))["access_token"]
                });
                this.http.post<any>(`${environment.apiUrl}gateways/${this.application.appId}`, result, {headers})
                    .subscribe(
                        data => {
                            alert('Ο κόμβος προστέθηκε επιτυχώς')
                            this.appSelected(this.application)
                        },
                        error => {
                            alert('Υπήρξε κάποιο πρόβλημα. Παρακαλώ δοκιμάστε πάλι σε λίγα λεπτά');
                        }
                    );
            }
        })
    }
    appSelected(app){
        this.application = app
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('currentUser'))["access_token"]
        });
        this.http.get<any>(`${environment.apiUrl}user-data/devices/${app['appId']}`, {headers})
        .subscribe(
            data => {
                this.devices = data["devices"];
                this.showDevices = true;
            }, error =>{
                console.log(error)
        })
        this.http.get<any>(`${environment.apiUrl}gateways/${app['appId']}`, {headers})
            .subscribe(
                data => {
                    this.gateways = data["gateways"];
                }, error =>{
                    console.log(error)
                })
    }

    setAutoActions(){
        console.log("ενέργειες: ", this.autoActions)
        console.log("περιοδος ενεργειών: ", this.autoActionsTimePeriod)
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('currentUser'))["access_token"]
        });
        this.http.post<any>(`${environment.apiUrl}user-data/profile/${this.currentUser.identity}`, 
        {"autoActions": this.autoActions, "autoActionsTimePeriod": this.autoActionsTimePeriod}, {headers})
            .subscribe(
                data => {
                    console.log("data: ", data)
                    alert('Η καταχώρηση της επιλογής πραγματοποιήθηκε επιτυχώς')
                },
                error => {
                    console.log("error: ", error)
                    alert('Υπήρξε κάποιο πρόβλημα. Παρακαλώ δοκιμάστε πάλι σε λίγα λεπτά');
                }
            );
    }

    setNewPass(){
        if(confirm("Είστε σίγουροι για την αλλαγή κωδικού?")){
            console.log("new pass: ", this.newPass)
            
            const headers = new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('currentUser'))["access_token"]
            });
            this.http.post<any>(`${environment.apiUrl}users/newPass/${this.currentUser.identity}`, {"password": this.newPass}, {headers})
                .subscribe(
                    data => {
                        console.log("data: ", data)
                        alert('Η αλλαγή κωδικού πραγματοποιήθηκε επιτυχώς')
                    },
                    error => {
                        console.log("error: ", error)
                        alert('Υπήρξε κάποιο πρόβλημα. Παρακαλώ δοκιμάστε πάλι σε λίγα λεπτά');
                    }
                );
        }
        this.newPass = ""
    }
}
