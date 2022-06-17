import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {deviceStatus, gwStatus} from './status'
import {FormControl, Validators} from '@angular/forms';
import { GwActionDialog } from "./gw-action/gw-action.component";
import {MatDialog} from "@angular/material/dialog";


@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit {
  currentUser: any;
  devices = [];
  gateways = [];
  selectedApplication = undefined;
  applications = [];
  showProperties = false;
  allStatus: deviceStatus[] = []
  gatewayStatus: gwStatus[] = []
  displayedColumns = ['devName', 'devAddr', 'temperature', 'ph', 'do', 'conductivity', 'wcfi', 'date']
  gwDisplayedColumns = ['gwName', 'gwId', 'action', 'lastSeen']
  actionTime: 20;
  actionTimeField = new FormControl('', [Validators.required]);

  constructor(private http: HttpClient, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
    this.actionTime = 20
    this.fetchApplications()
  }

  fetchApplications() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('currentUser'))["access_token"]
    });
    this.http.get<any>(`${environment.apiUrl}user-data/applications`, {headers})
        .subscribe(data => {
          this.applications = data["applications"]
        })
  }

  appSelected(app) {
    this.selectedApplication = app
    this.showProperties = true;
    this.allStatus = []
    this.gatewayStatus = []
    this.fetchDevices(app.appId)
    this.fetchGateways(app.appId)
  }

  fetchDevices(appId) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('currentUser'))["access_token"]
    });
    this.http.get<any>(`${environment.apiUrl}user-data/devices/${appId}`, {headers})
        .subscribe(data => {
          this.devices = data["devices"]
          this.devices.map(device => {
            var dst = <deviceStatus>{};
            this.http.get<any>(`${environment.apiUrl}user-data/status/${device.devAddr}`, {headers}).subscribe(data => {
              const status = data["status"][0]
              if (status) {
                dst.temperature = status["SensorsValue"].find(sensor => sensor.sensorId == 1).value
                dst.ph = status["SensorsValue"].find(sensor => sensor.sensorId == 2).value.toFixed(2)
                dst.do = status["SensorsValue"].find(sensor => sensor.sensorId == 3).value
                dst.wcfi = status["wcfi"]
                dst.conductivity = status["SensorsValue"].find(sensor => sensor.sensorId == 4).value
              }
            })
            dst.date = device["lastSeen"]
            dst.devName = device["devName"]
            dst.devAddr = device["devAddr"]
            this.allStatus.push(dst)
          })
        })
  }

  fetchGateways(appId) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('currentUser'))["access_token"]
    });
    this.http.get<any>(`${environment.apiUrl}gateways/${appId}`, {headers})
        .subscribe(data => {
          this.gateways = data["gateways"]
          this.gateways.map(gateway => {
            var dst = <gwStatus>{};
            dst.gwId = gateway["gwId"]
            dst.gwName = gateway["gwName"]
            dst.lastSeen = gateway["lastSeen"]
            this.gatewayStatus.push(dst)
          })
        })
  }

  gwAction(gwId) {
    const dialogRef = this.dialog.open(GwActionDialog, {
      width: '250px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        console.log("id: ", gwId, "with results: ", result)
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('currentUser'))["access_token"]
        });
        this.http.post<any>(`${environment.apiUrl}user-action/${gwId}`,
            {"action": result.action, "actionTime": result.actionTime}, {headers})
            .subscribe(data => console.log(data), error => console.log(error))
      }
    })
  }

}
