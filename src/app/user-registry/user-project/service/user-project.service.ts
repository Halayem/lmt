import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from '../model/project';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserProjectService {
  
  constructor( readonly http: HttpClient ) { }

  public saveProject( project: Project ): Observable<any> {
    return this.http.post( `${environment.baseUrl}/projects`, project );
  }
}
