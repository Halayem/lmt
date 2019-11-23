import { Component, OnInit } from '@angular/core';
import { Project } from '../../user-project/model/project';

@Component({
  selector: 'app-user-experiance',
  templateUrl: './user-experiance.component.html',
  styleUrls: ['./user-experiance.component.scss']
})
export class UserExperianceComponent implements OnInit {

  addproject = false;
  projects: Project[] = [];
  constructor() { }

  ngOnInit() {
  }

  addProjectHandler() {
    this.addproject = !this.addproject;
  }

  saveProject(event: Project) {
    this.projects = [...this.projects, event];
    this.addproject = !this.addproject;
  }

}
