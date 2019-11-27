import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Profile } from '../model/project';

const BASE_URL = 'assets/data';
@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor( readonly http: HttpClient ) { }

  public getProfiles(): Observable<Profile[]> {
    return this.http.get<Profile[]>( `${BASE_URL}/roles.json` );
  }
}
