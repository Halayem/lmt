import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import {Profile} from '../models/informations-collaborateur';

@Injectable({
  providedIn: 'root'
})

export class ProfileCollaborateur {

  profile : Array<Profile> =[
    {
      titre: "Développeur Front-End"
    },
    {
      titre: "Développeur Back-End"
    },
    {
      titre: "Développeur Full-Stack"
    },
    {
      titre: "Développeur Big Data"
    },
    {
      titre: "Devops"
    },
    {
      titre: "Chef de Projets"
    }

  ]

  constructor() { }

  getProfile(){
    return of(this.profile);
  }
}
