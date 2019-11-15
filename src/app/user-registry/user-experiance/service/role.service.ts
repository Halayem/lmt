import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const BASE_URL = 'assets/data';
@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(readonly http: HttpClient) { }

  getRoles(): Observable<string[]> {
    return this.http.get<string[]>(`${BASE_URL}/roles.json`);
  }
}
