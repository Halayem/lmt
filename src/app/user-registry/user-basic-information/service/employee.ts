import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Employee } from '../models/employee';
import { ResourceInformation } from 'src/app/shared/model/response';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor( readonly http: HttpClient ) { }

  public postEmployeePersonalInformation( employee: Employee ): Observable<ResourceInformation> {
    return this.http.post<ResourceInformation>( `${environment.baseUrl}/employees`, employee );
  }
}
