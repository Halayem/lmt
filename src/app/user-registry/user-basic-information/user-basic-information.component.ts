import { Component, OnInit } from '@angular/core';
import { ProfileCollaborateur } from './services-profile/profile-collaborateur.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector:    'app-user-basic-information',
  templateUrl: './user-basic-information.component.html',
  styleUrls:   ['./user-basic-information.component.scss']
})

export class UserBasicInformationComponent implements OnInit {
  form = new FormGroup({
    nom: new FormControl('', Validators.required),
    prenom: new FormControl('', Validators.required),
    dateArrive: new FormControl('', Validators.required),
    telephone: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email])    
  });
  

  profile: Array<object>;

  constructor( readonly  cordonnées: ProfileCollaborateur ) { 
    this.cordonnées.getProfile().subscribe(res => {
      this.profile = res;
    });
  }
  ngOnInit() {
  }

  ajouterCollaborateur(){
    console.log(this.form.value);
   }

   annulerForm(){
    this.form.reset();
   }
}
