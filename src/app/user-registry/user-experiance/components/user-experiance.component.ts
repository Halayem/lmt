import { Component } from '@angular/core';
import { Project } from '../../user-project/model/project';
import { UserProjectService } from '../../user-project/service/user-project.service';

@Component({
  selector:     'app-user-experiance',
  templateUrl:  './user-experiance.component.html',
  styleUrls:   ['./user-experiance.component.scss']
})
export class UserExperianceComponent {

  private _projects: Project[];
  private _projectEditionMode: boolean;
  constructor( readonly userProjectService: UserProjectService ) { 
    this._projectEditionMode = false;
  }

  /**
   * Event sent by a child and intercepted: a new project was added
   * Refresh the employee projects
   */
  public onNewProjectAdded(): void {
    console.warn( 'employee id is hard coded' );
    this.userProjectService.getPtojectsByEmployeeId( 1 ).subscribe( data => this._projects = data );
    // user should click on add project button to enable edition mode
    this._projectEditionMode = false;
  }
  
  public addProjectHandler(): void {
    this._projectEditionMode = true;
  }

  get projects()            { return this._projects;            }
  get projectEditionMode()  { return this._projectEditionMode;  }

}
