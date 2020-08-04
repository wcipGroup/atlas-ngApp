import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Data} from "../_models";
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';
import {map} from "rxjs/operators";

@Component({
    templateUrl: './rating.component.html',
    styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit{
    selectedSource: "";
    openData = {};
    showReview = false;
    icon = "";
    temp = 0;
    pressure = 0;
    humidity = 0;
    feels_like = 0;
    rate = 3;
    sources = [
        {id: 1, name: 'openweathermap'},
        {id: 2, name: 'weatherapi'},
        {id: 3, name: 'weatherstack'}
    ];
    constructor(private http: HttpClient, config: NgbRatingConfig,
                private router: Router) {config.max = 5;}
    ngOnInit(){
    }
    getData(){
        confirm("Είσαστε σίγουροι ότι θέλετε να συνεχίσετε ?");
        let params = new HttpParams();
        params.append("source", this.selectedSource["name"])
        this.http.get<Data[]>(`${environment.apiUrl}openData`,
            {params: {
                "source": this.selectedSource["name"]
                }}
            ).subscribe(
                data => {
                    console.log(data);
                    this.openData = data;
                    this.showReview = true;
                    if (this.selectedSource["name"] == "openweathermap"){
                        this.saveOpenWeatherMap(data);
                    }
                    if (this.selectedSource["name"] == "weatherapi"){
                        this.saveWeatherAPI(data);
                    }
                    if (this.selectedSource["name"] == "weatherstack"){
                        this.saveWeatherStack(data);
                    }
                },
                error => {
                    console.log("error", error);
                }
            )
    }
    sendRates(){
        console.log(this.rate);
        const body = {}
        body["rate"] = this.rate;
        body["data"] = this.openData;
        body["source"] = this.selectedSource["name"];
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('currentUser'))["access_token"]
        });
        this.http.post<any>(
            `${environment.apiUrl}openData/rating`,
            body, {headers})
            .subscribe(
                data => {
                    alert('Η αξιολόγηση σας κατατέθηκε επιτυχώς')
                    this.router.navigate(['/'])
                },
                error => {
                    alert('Υπήρξε κάποιο πρόβλημα. Παρακαλώ δοκιμάστε πάλι σε λίγα λεπτά');
                    this.router.navigate(['/'])
                }
            );
    }
    saveOpenWeatherMap(data){
        this.icon = `http://openweathermap.org/img/wn/${data["weather"][0]["icon"]}@2x.png`;
        this.temp = data["main"]["temp"]/10;
        this.pressure = data["main"]["pressure"];
        this.humidity = data["main"]["humidity"];
        this.feels_like = data["main"]["feels_like"];
        console.log(this.icon);
    }
    saveWeatherAPI(data){
        this.icon = "http:" + data["current"]["condition"]["icon"];
        this.temp = data["current"]["temp_c"];
        this.pressure = data["current"]["pressure_mb"];
        this.humidity = data["current"]["humidity"];
        this.feels_like = data["current"]["feelslike_c"];
        console.log(this.icon);
    }
    saveWeatherStack(data){
        this.icon = data["current"]["weather_icons"][0];
        this.temp = data["current"]["temperature"];
        this.pressure = data["current"]["pressure"];
        this.humidity = data["current"]["humidity"];
        this.feels_like = data["current"]["feelslike"];
        console.log(this.icon);
    }
}