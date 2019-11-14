import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs/';
import { Profile } from '../models/informations-collaborateur';

@Injectable({
  providedIn: 'root'
})

export class ProfileCollaborateur {


  constructor(private http: HttpClient) { }

  public getProfileCollaborateur(): Observable<Profile[]> {
    return this.http.get<Profile[]>("./assets/profile.json");
  }

}
