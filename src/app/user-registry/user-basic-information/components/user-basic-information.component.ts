import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector:    'app-user-basic-information',
  templateUrl: './user-basic-information.component.html',
  styleUrls:   ['./user-basic-information.component.scss']
})


export class UserBasicInformationComponent implements OnInit {

  private _userBasicInformationForm: FormGroup;

  constructor( readonly router: Router ) { }

  ngOnInit() {
    this.buildForm();
  }

  public storeForm() {
    console.log( "user-basic-information: ", this.userBasicInformationForm.value );
    // this.router.navigate(['/user-experiences']);
  }

  private buildForm(): void {
    this._userBasicInformationForm = new FormGroup({
      firstname:        new FormControl('', [ Validators.required, Validators.minLength( 3 ) ] ),
      lastname:         new FormControl('', [ Validators.required, Validators.minLength( 3 ) ] ),
      mailProfesional:  new FormControl('', [ Validators.required, Validators.email ] ),
      phoneNumber:      new FormControl('', [ Validators.required ] )
    });  
  }

  get userBasicInformationForm() {
    return this._userBasicInformationForm;
  }
}
