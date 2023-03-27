import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Chart} from 'chart.js';

@Component({
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit{
    currentUser: any;
    devices = [];
    device = undefined
    device_data = [];
    
    date_values = [];
    temperature_values = [];
    ph_values = [];
    do_vaues = [];
    conductivity_values = [];
    wcfi_values = [];

    constructor(private http: HttpClient){}
    ngOnInit(): void {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
        this.fetchDevices()
    }
    fetchDevices(){
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('currentUser'))["access_token"]
        });
        this.http.get<any>(`${environment.apiUrl}user-data/devices-by-owner/${this.currentUser.identity}`, {headers})
        .subscribe(data => {
            this.devices = data["devices"]
        })
    }
    devSelected(){
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('currentUser'))["access_token"]
        });
        this.http.get<any>(`${environment.apiUrl}user-data/data/${this.device.devAddr}`, {headers})
        .subscribe(data => {
            this.device_data = data["data"]
            this.createCharts()
        })
    }
    createCharts(){
        this.date_values = [];
        this.temperature_values = [];
        this.ph_values = [];
        this.do_vaues = [];
        this.conductivity_values = [];
        this.wcfi_values = [];
        this.device_data = this.device_data.slice(-40)
        this.device_data.map(data=>{
            this.date_values.push(data["date"])
            var sensor_value = data["SensorsValue"]
            this.temperature_values.push(sensor_value.find(sensor=>sensor.sensorId==1).value)
            this.ph_values.push(sensor_value.find(sensor=>sensor.sensorId==2).value)
            this.do_vaues.push(sensor_value.find(sensor=>sensor.sensorId==3).value)
            this.conductivity_values.push(sensor_value.find(sensor=>sensor.sensorId==4).value)
            this.wcfi_values.push(data["wcfi"])
        })
        new Chart(document.getElementById('temperature') as HTMLCanvasElement, {
            type: 'line',
            data: {
              labels: this.date_values,
              datasets: [
                {
                  label: 'Θερμοκρασία',
                  borderColor: ['red'],
                  data: this.temperature_values,
                  fill: false
                }
              ]
            },
            options: {
              responsive: true,
              legend: { display: false },
              title: {display: false},
              scales: {
                xAxes: [{
                    type: 'time', // Add this property to enable time scale
                    time: { // Add this object to configure time options
                      displayFormats: {
                        hour: 'DD/MM/YYYY, HH:mm' // Add your desired format
                      }
                    },
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 5
                  }
                }]
              }
            }
          });
        new Chart(document.getElementById('ph') as HTMLCanvasElement, {
            type: 'line',
            data: {
              labels: this.date_values,
              datasets: [
                {
                  label: 'pH',
                  borderColor: ['green'],
                  data: this.ph_values,
                  fill: false
                }
              ]
            },
            options: {
              responsive: true,
              legend: { display: false },
              title: {display: false},
              scales: {
                xAxes: [{
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 5
                  }
                }]
              }
            }
          });
        new Chart(document.getElementById('do') as HTMLCanvasElement, {
            type: 'line',
            data: {
              labels: this.date_values,
              datasets: [
                {
                  label: 'Διαλυμένο οξυγόνο',
                  borderColor: ['blue'],
                  data: this.do_vaues,
                  fill: false
                }
              ]
            },
            options: {
              responsive: true,
              legend: { display: false },
              title: {display: false},
              scales: {
                xAxes: [{
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 5
                  }
                }]
              }
            }
          });
        new Chart(document.getElementById('conductivity') as HTMLCanvasElement, {
            type: 'line',
            data: {
              labels: this.date_values,
              datasets: [
                {
                  label: 'Αγωγιμότητα',
                  borderColor: ['gray'],
                  data: this.conductivity_values,
                  fill: false
                }
              ]
            },
            options: {
              responsive: true,
              legend: { display: false },
              title: {display: false},
              scales: {
                xAxes: [{
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 5
                  }
                }]
              }
            }
          });
        new Chart(document.getElementById('wcfi') as HTMLCanvasElement, {
            type: 'line',
            data: {
                labels: this.date_values,
                datasets: [
                    {
                        label: 'Δείκτης ποιότητας',
                        borderColor: ['gray'],
                        data: this.wcfi_values,
                        fill: false
                    }
                ]
            },
            options: {
                responsive: true,
                legend: { display: false },
                title: {display: false},
                scales: {
                    xAxes: [{
                        ticks: {
                            autoSkip: true,
                            maxTicksLimit: 5
                        }
                    }]
                }
            }
        });
    }

}
