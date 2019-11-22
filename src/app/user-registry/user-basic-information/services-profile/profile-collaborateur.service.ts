import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs/';
import { Profile } from '../models/informations-collaborateur';

@Injectable({
  providedIn: 'root'
})

export class ProfileCollaborateur {
  
  constructor(readonly http: HttpClient) { }

  public getProfileCollaborateur(): Observable<Profile[]> {
    return this.http.get<Profile[]>("./assets/data/profile.json");
  }
}
