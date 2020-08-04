import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Data} from '../_models';

@Injectable({ providedIn: 'root' })
export class DataService {
  constructor(private http: HttpClient) { }

  getAll() {
    let plantId: string;
    plantId = JSON.parse(localStorage.getItem('plant')).plantId;
    return this.http.get<Data[]>(`${environment.apiUrl}/data/` + plantId)
      .pipe();
  }
}
