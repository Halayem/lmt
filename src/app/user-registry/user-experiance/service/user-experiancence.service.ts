import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Entreprise } from '../model/entreprise';
import { map } from 'rxjs/operators';
import { Project } from '../model/project';
import { Observable } from 'rxjs';


const BASE_URL = 'assets/data';
@Injectable({
  providedIn: 'root'
})
export class UserExperiancenceService {
  constructor(readonly http: HttpClient) { }

  saveProject(project: Project): Observable<any> {
    return this.http.post(`${BASE_URL}/project`, project);
  }
}
