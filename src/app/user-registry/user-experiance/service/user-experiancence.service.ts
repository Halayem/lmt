import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mission } from '../model/mission';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Entreprise } from '../model/entreprise';

@Injectable({
  providedIn: 'root'
})
export class UserExperiancenceService {

  constructor(private http: HttpClient) { }

  saveMission(mission: Mission): Observable<any> {
    const url = `${environment.baseUrl}/mission`;
    return this.http.post(url, mission);
  }

  getAllEntreprise(): Observable<Entreprise[]> {
    const url = `assets/json/entreprises.json`;
    return this.http.get<Entreprise[]>(url);
  }

  getAllTechnos(): Observable<string[]> {
    const url = `assets/json/technos.json`;
    return this.http.get<string[]>(url);
  }

  getAllRole(): Observable<string[]> {
    const url = `assets/json/roles.json`;
    return this.http.get<string[]>(url);
  }
}
