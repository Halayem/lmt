import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from '../model/project';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class UserProjectService {
  
  constructor( readonly http: HttpClient ) { }

  public saveProject( employeeId: number, project: Project ): Observable<any> {
    return this.http.post( `${environment.baseUrl}/employees/${employeeId}/projects`, project );
  }

  public getPtojectsByEmployeeId( employeeId: number): Observable<Project[]> {
    return this.http.get<Project[]>( `${environment.baseUrl}/employees/${employeeId}/projects` );
  }
}
