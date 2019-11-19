import { Component } from '@angular/core';
import { ProfileCollaborateur } from '../services-profile/profile-collaborateur.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Profile } from '../models/informations-collaborateur';
import { Router } from '@angular/router';

@Component({
  selector:    'app-user-basic-information',
  templateUrl: './user-basic-information.component.html',
  styleUrls:   ['./user-basic-information.component.scss']
})

export class UserBasicInformationComponent {

  minDate: Date;
  maxDate: Date;

  profile: Array<Profile>;

   form = new FormGroup({
    lastName: new FormControl('', [Validators.required, Validators.pattern(/[a-zA-Z àâæçéèêëîïôœùûüÿÀÂÆÇnÉÈÊËÎÏÔŒÙÛÜŸ-]/)]),
    name: new FormControl('', [Validators.required, Validators.pattern(/[a-zA-Z àâæçéèêëîïôœùûüÿÀÂÆÇnÉÈÊËÎÏÔŒÙÛÜŸ-]/)]),
    dateArrival: new FormControl('', Validators.required),
    mailProfesional: new FormControl('', [Validators.required, Validators.email, Validators.pattern(/[^@]+@[^\.]+\..+/)]),
    phoneNumber: new FormControl('', Validators.required),
    profile: new FormControl('', Validators.required)
    
  });  

  constructor( readonly  serviceCordonnees: ProfileCollaborateur, readonly router: Router ) { 
    this.serviceCordonnees.getProfileCollaborateur().subscribe(data => {
      console.log("Les profiles des Collaborateurs: ",data);
      this.profile = data;
    });
    this.minDate = new Date(2017, 1, 1);
    this.maxDate = new Date();
  }

  ajouterCollaborateur(){
    console.log("Cordonnees Collaborateur : ",this.form.value);
    this.router.navigate(['/user-experiences']);
    
   }

}
