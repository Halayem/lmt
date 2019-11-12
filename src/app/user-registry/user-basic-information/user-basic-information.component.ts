import { Component, OnInit } from '@angular/core';
import { MocksBasicInformationsService } from './services/mocks-basic-informations.service';

@Component({
  selector:    'app-user-basic-information',
  templateUrl: './user-basic-information.component.html',
  styleUrls:   ['./user-basic-information.component.scss']
})

export class UserBasicInformationComponent implements OnInit {

  profile: Array<object>;
  model = {};

  constructor( readonly  informations: MocksBasicInformationsService ) { }

  ngOnInit() {
    this.informations.getProfile().subscribe(res => {
      this.profile = res;
    });
  }

//   submitForm(event: Event) {
//     event.preventDefault();
//     console.log("formulaire");
//     console.log("Nom: ",this.model['nom']);
//     // really you would be using an event emitter
// }
}
