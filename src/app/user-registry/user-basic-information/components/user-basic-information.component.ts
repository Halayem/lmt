import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../service/employee';

@Component({
  selector:    'app-user-basic-information',
  templateUrl: './user-basic-information.component.html',
  styleUrls:   ['./user-basic-information.component.scss']
})


export class UserBasicInformationComponent implements OnInit {

  private _userBasicInformationForm: FormGroup;

  constructor( readonly router:           Router,
               readonly employeeService:  EmployeeService) {}

  ngOnInit() {
    this.buildForm();
  }

  public saveUserBasicInformationForm() {
    this.employeeService.postEmployeePersonalInformation( this.userBasicInformationForm.value )
                        .subscribe                      ( response => console.log ( 'server response: ', response ) );
  }

  private buildForm(): void {
    this._userBasicInformationForm = new FormGroup({
      firstname:    new FormControl('', [ Validators.required, Validators.minLength( 3 ) ] ),
      lastname:     new FormControl('', [ Validators.required, Validators.minLength( 3 ) ] ),
      mail:         new FormControl('', [ Validators.required, Validators.email ] ),
      phonenumber:  new FormControl('', [ Validators.required ] )
    });  
  }

  get userBasicInformationForm() {
    return this._userBasicInformationForm;
  }
  
}
