import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {deviceStatus} from './status'
import {FormControl, Validators} from '@angular/forms';


@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit{
  currentUser: any;
  devices = [];
  allStatus: deviceStatus[] = []
  displayedColumns = ['devName', 'devAddr', 'temperature', 'ph', 'do', 'conductivity', 'date']
  actionTime: 20;
  actionTimeField = new FormControl('', [Validators.required]);
  constructor(private http:HttpClient){}
  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
    this.actionTime = 20
    this.fetchDevices()
  }

  fetchDevices(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('currentUser'))["access_token"]
    });
    this.http.get<any>(`${environment.apiUrl}user-data/devices-by-owner/${this.currentUser.identity}`, {headers})
    .subscribe( data => {
      this.devices = data["devices"]
      this.devices.map(device=>{
        var dst = <deviceStatus>{};
        this.http.get<any>(`${environment.apiUrl}user-data/status/${device.devAddr}`, {headers}).subscribe(data => {
          const status = data["status"][0]
          if(status){
            dst.date = status["date"]
            dst.temperature = status["SensorsValue"].find(sensor=>sensor.sensorId==1).value
            dst.ph = status["SensorsValue"].find(sensor=>sensor.sensorId==2).value.toFixed(2)
            dst.do = status["SensorsValue"].find(sensor=>sensor.sensorId==3).value
            dst.conductivity = status["SensorsValue"].find(sensor=>sensor.sensorId==4).value
          }
        })
        dst.devName = device["devName"]
        dst.devAddr = device["devAddr"]
        this.allStatus.push(dst)
      })
      console.log("statuses: ", this.allStatus)
    })
  }
  onActionBtn(actuator, time){
    if(this.actionTimeField.hasError("required")){return}
    if (confirm("Ενεργοποίηση ενέργειας για " + time + " δευτερόλεπτα?")){
      this.http.post<any>(`${environment.apiUrl}user-action/${this.currentUser.identity}`, {actuator, time})
      .subscribe(data => console.log(data), error => console.log(error))
    }
    
  }
  onBaseTank(){
    console.log("base")
  }
  onOxygenPump(){
    console.log("oxygen")
  }
  onColdPump(){
    console.log("coldWater")
  }
  onHotPump(){
    console.log("hotWater")
  }
  onFeeder(){
    console.log("feeder")
  }
  onAlarm(){
    console.log("alarm")
  }
}