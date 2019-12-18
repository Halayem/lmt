import { Component, Input } from '@angular/core';
import { Project } from 'src/app/user-registry/user-project/model/project';

@Component({
  selector:     'app-user-experiance-list',
  templateUrl:  './user-experiance-list.component.html',
  styleUrls:   ['./user-experiance-list.component.scss']
})
export class UserExperianceListComponent {

  @Input() projects: Project[];
  constructor() { }
}
