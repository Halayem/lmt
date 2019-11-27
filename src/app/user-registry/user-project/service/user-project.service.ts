import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from '../model/project';
import { Observable } from 'rxjs';


const BASE_URL = 'assets/data';
@Injectable({
  providedIn: 'root'
})
export class UserProjectService {
  
  constructor( readonly http: HttpClient ) { }

  public saveProject( project: Project ): Observable<any> {
    return this.http.post( `${BASE_URL}/project`, project );
  }
}
