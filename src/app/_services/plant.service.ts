import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Plant } from '../_models';

@Injectable({ providedIn: 'root' })
export class PlantService {
  constructor(private http: HttpClient) { }

  getAll() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    return this.http.get<Plant[]>(`${environment.apiUrl}/plant/` + user.userId);
  }
  create(userId: number, typeId: number, moistureLimit: number, photoLimit: number, name: string) {
    return this.http.post<any>(`${environment.apiUrl}/plant`, {
      userId,
      typeId,
      moistureLimit,
      photoLimit,
      name
    });
  }
  delete() {
    let plantId: string;
    plantId = JSON.parse(localStorage.getItem('plant')).plantId;
    return this.http.delete<any>(`${environment.apiUrl}/plant/` + plantId);
  }
  turnOnLight() {
    let plantId: string;
    plantId = JSON.parse(localStorage.getItem('plant')).plantId;
    return this.http.post<any>(`${environment.apiUrl}/action/lights`, {
      plantId
    });
  }
  turnOnPump() {
    let plantId: string;
    plantId = JSON.parse(localStorage.getItem('plant')).plantId;
    return this.http.post<any>(`${environment.apiUrl}/action/pump`, {
      plantId
    });
  }
}
