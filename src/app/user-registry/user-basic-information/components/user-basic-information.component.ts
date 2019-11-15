import { Component } from '@angular/core';
import { ProfileCollaborateur } from '../services-profile/profile-collaborateur.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Profile } from '../models/informations-collaborateur';


@Component({
  selector:    'app-user-basic-information',
  templateUrl: './user-basic-information.component.html',
  styleUrls:   ['./user-basic-information.component.scss']
})

export class UserBasicInformationComponent {

  profile: Array<Profile>;

   form = new FormGroup({
    nom: new FormControl('', [Validators.required, Validators.pattern(/[a-zA-Z àâæçéèêëîïôœùûüÿÀÂÆÇnÉÈÊËÎÏÔŒÙÛÜŸ-]/)]),
    prenom: new FormControl('', [Validators.required, Validators.pattern(/[a-zA-Z àâæçéèêëîïôœùûüÿÀÂÆÇnÉÈÊËÎÏÔŒÙÛÜŸ-]/)]),
    dateArrive: new FormControl('', Validators.required),
    telephone: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email, Validators.pattern(/[^@]+@[^\.]+\..+/)]),
    profile: new FormControl('', Validators.required)
    
  });  

  constructor( readonly  serviceCordonnees: ProfileCollaborateur ) { 
    this.serviceCordonnees.getProfileCollaborateur().subscribe(data => {
      console.log("Les profiles des Collaborateurs: ",data);
      this.profile = data;
    });
  }

  ajouterCollaborateur(){
    console.log("Cordonnees Collaborateur : ",this.form.value);
   }

}
