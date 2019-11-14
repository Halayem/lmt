import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mission } from '../model/mission';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Entreprise } from '../model/entreprise';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserExperiancenceService {

  constructor(private http: HttpClient) { }

  saveMission(mission: Mission): Observable<any> {
    const url = `${environment.baseUrl}/mission`;
    return this.http.post(url, mission);
  }

  getAllEntreprise(search: string): Observable<Entreprise[]> {
    const url = `assets/json/entreprises.json`;
    return this.http.get<Entreprise[]>(url).pipe(
      map(entreprises => entreprises.filter((ent) => search && ent.name.toLowerCase().indexOf(search.toLowerCase().trim()) > -1))
    );
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
