import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import {Profile} from '../models/Profile'

@Injectable({
  providedIn: 'root'
})

export class MocksBasicInformationsService {
  informations: Array<object> = [
    { nom: 'Conor', 
      prenom: 'McGregor', 
      datearriver: 12/0/2018,
      profile: 'Ingenieur',
      mail: 'mail@m.com',
      numtelephone: '0682654'
    },
    { nom: 'Ons', 
      prenom: 'McGregor', 
      datearriver: 12/0/2018,
      profile: 'Ingenieur',
      mail: 'mail@m.com',
      numtelephone: '0682654'
    },
    { nom: 'Anis', 
      prenom: 'McGregor', 
      datearriver: 12/0/2018,
      profile: 'Ingenieur',
      mail: 'mail@m.com',
      numtelephone: '0682654'
    },
  ];

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

  getInforamtions() {
    return of(this.informations);
  }

  getProfile(){
    return of(this.profile);
  }
}
