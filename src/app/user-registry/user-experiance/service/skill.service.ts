import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASE_URL = 'assets/data';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  constructor(readonly http: HttpClient) { }

  getSkills(): Observable<string[]> {
    return this.http.get<string[]>(`${BASE_URL}/skills.json`);
  }
}
