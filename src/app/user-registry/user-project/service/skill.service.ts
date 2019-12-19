import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Skill } from '../model/project';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  constructor( readonly http: HttpClient ) { }

  getSkills(): Observable<Skill[]> {
    return this.http.get<Skill[]>( `${environment.baseUrl}/skills` );
  }
}
