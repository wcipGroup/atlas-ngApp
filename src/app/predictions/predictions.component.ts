import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Chart} from 'chart.js';
import moment from 'moment';

@Component({
    templateUrl: './predictions.component.html',
    styleUrls: ['./predictions.component.scss']
})
export class PredictionsComponent implements OnInit{
    currentUser: any;
    devices = [];
    device = undefined
    device_data = [];

    date_values = [];
    temperature_values = [];
    ph_values = [];
    do_vaues = [];
    conductivity_values = [];

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
        this.http.get<any>(`${environment.apiUrl}user-data/predictions/${this.device.devAddr}`, {headers})
        .subscribe(data => {
            this.device_data = data["data"]
            this.createCharts()
        })
    }
    interface TickOptions {
      precision?: number;
    }
    createCharts(){
        this.date_values = [];
        this.temperature_values = [];
        this.ph_values = [];
        this.do_vaues = [];
        this.conductivity_values = [];
        //this.device_data = this.device_data.slice(6)
        this.device_data.map(data=>{
            let date = moment(data["date"]).format('DD/MM/YYYY, HH:mm:ss');
            this.date_values.push(date);
            var sensor_value = data["SensorsValue"]
            this.temperature_values.push(sensor_value.find(sensor=>sensor.sensorId==1).value)
            this.ph_values.push(sensor_value.find(sensor=>sensor.sensorId==2).value)
            this.do_vaues.push(sensor_value.find(sensor=>sensor.sensorId==3).value)
            this.conductivity_values.push(sensor_value.find(sensor=>sensor.sensorId==4).value)
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
                    }],
                     yAxes: [{
                        ticks: {
                            precision: 2
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
    }

}
