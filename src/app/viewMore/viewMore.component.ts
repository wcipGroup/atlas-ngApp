import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Plant} from '../_models';
import { DataService} from '../_services';
import {Chart} from 'chart.js';
import {first} from 'rxjs/operators';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  templateUrl: './viewMore.component.html',
  styleUrls: ['./viewMore.component.scss']
})
export class ViewMoreComponent implements OnInit {
  dateValues = [];
  humidity = [];
  temperature = [];
  illuminance = [];
  soilMoisture = [];
  plant: Plant;
  selectedPeriod = 'day';
  constructor(
    private router: Router,
    private dataService: DataService,
    private cdr: ChangeDetectorRef
  ) {}
  ngOnInit() {
    this.plant = JSON.parse(localStorage.getItem('plant'));
    this.getMeasures();
    // this.renderCharts();
    this.cdr.detectChanges();
  }
  getMeasures() {
    console.log('get measures');
    this.dataService.getAll()
    .pipe(first())
        .subscribe(
          data => {
            // console.log(data);
            data['data'].map(value => {
              this.dateValues.push(value.Timestamp.slice(11, ));
              this.humidity.push(value.humidity);
              this.temperature.push(value.temperature);
              this.illuminance.push(value.illuminance);
              this.soilMoisture.push(value.soilMoisture);
            });
            //soil moisture
            console.log('start rendering');
            new Chart(document.getElementById('soil-moisture') as HTMLCanvasElement, {
              type: 'line',
              data: {
                labels: this.dateValues,
                datasets: [
                  {
                    label: 'Soil Moisture',
                    borderColor: ['red'],
                    data: this.soilMoisture,
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
                      maxTicksLimit: 20
                    }
                  }]
                }
              }
            });
          //illuminance
            new Chart(document.getElementById('illuminance') as HTMLCanvasElement, {
              type: 'line',
              data: {
                labels: this.dateValues,
                datasets: [
                  {
                    label: 'Illuminance',
                    borderColor: ['green'],
                    data: this.illuminance,
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
                      maxTicksLimit: 20
                    }
                  }]
                }
              }
            });
          //  temperature
            new Chart(document.getElementById('temperature') as HTMLCanvasElement, {
              type: 'line',
              data: {
                labels: this.dateValues,
                datasets: [
                  {
                    label: 'Temperature',
                    borderColor: ['blue'],
                    data: this.temperature,
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
                      maxTicksLimit: 20
                    }
                  }]
                }
              }
            });
          //  humidity
            new Chart(document.getElementById('humidity') as HTMLCanvasElement, {
              type: 'line',
              data: {
                labels: this.dateValues,
                datasets: [
                  {
                    label: 'Humidity',
                    borderColor: ['purple'],
                    data: this.humidity,
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
                      maxTicksLimit: 20
                    }
                  }]
                }
              }
            });
          },
          error => {
            console.log(error);
          });
  }
  onBack() {
    this.router.navigate(['/home']);
  }
  onDay() {
    this.selectedPeriod = 'day';
  }
  onWeek() {
    this.selectedPeriod = 'week';
  }
  onMonth() {
    this.selectedPeriod = 'month';
  }

}
