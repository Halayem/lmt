import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Observable, forkJoin } from 'rxjs';
import { MatAutocomplete, MatChipInputEvent, MatAutocompleteSelectedEvent } from '@angular/material';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import * as R from 'ramda';
import { UserProjectService } from '../service/user-project.service';
import { lmtWysiwygHtmlEditorConfig } from '../../../config/lmtWysiwygHtmlEditorConfig';
import { Project, Skill, Profile } from '../model/project';
import { SkillService } from '../service/skill.service';
import { ProfileService } from '../service/profile.service';
import { Role } from '../model/role';
import { LmtAutocompleteParameter } from './../../../shared/components/lmt-autocomplete/model/lmt-autocomplete-param';
@Component({
  selector:     'app-user-project',
  templateUrl:  './user-project.component.html',
  styleUrls:    ['./user-project.component.scss']
})
export class UserProjectComponent implements OnInit {

  private _referentialSkills$:    Observable<Skill[]>;
  private _referentialProfiles$:  Observable<Profile[]>;
  userProjectForm:                FormGroup;
  minStartDate:                   Date;
  maxStartDate:                   Date;
  maxEndDate:                     Date;
  minEndDate:                     Date;
  lmtAutocompleteParamForProfile: LmtAutocompleteParameter;
  lmtAutocompleteParamForSkill:   LmtAutocompleteParameter;



  @Output() saveProject: EventEmitter<Project> = new EventEmitter<Project>();

  configTextEditor: AngularEditorConfig = lmtWysiwygHtmlEditorConfig;

  constructor(  readonly formBuilder:         FormBuilder,
                readonly skillService:        SkillService,
                readonly profileService:      ProfileService,
                readonly userProjectService:  UserProjectService ) {

    this._referentialSkills$    = this.skillService.getSkills();
    this._referentialProfiles$  = this.profileService.getProfiles();
  }

  ngOnInit() {
    this.createUserProjectForm    ();
    this.setupProjectDateInterval ();
    this._referentialProfiles$.subscribe(profiles => {
      this.lmtAutocompleteParamForProfile = {
        datasource:             profiles,
        attributeNameToDisplay: 'name',
        attributeNameForFilter: 'name',
        attributeNameKey:       'id',
      };
    });

    this._referentialSkills$.subscribe(skills => {
      console.log ( 'parent: skills: ', skills );
      this.lmtAutocompleteParamForSkill = {
        datasource:             skills,
        attributeNameToDisplay: 'name',
        attributeNameForFilter: 'name',
        attributeNameKey:       'id',
      };
    });
  }

  private createUserProjectForm(): void {
    this.userProjectForm = this.formBuilder.group({
      subject:        [ '', [ Validators.required ] ],
      description:    [ '', [ Validators.required ] ],
      enterpriseName: [ '', [ Validators.required ] ],
      startDate:      [ '', [ Validators.required ] ],
      endDate:        [ ''  ],
      roles:          [ '', [ Validators.required ] ],
      skills:         [ '', [ Validators.required ] ],
    });
  }


  private setupProjectDateInterval(): void {
    this.updateMinEndDateWhenStartDateChanged();
    this.updateMaxStartDateWhenEndDateChanged();
  }

  private updateMinEndDateWhenStartDateChanged(): void {
    this.userProjectForm.get( 'startDate' ).valueChanges.subscribe(
        selectedStartDate => {
          this.minEndDate = selectedStartDate ? selectedStartDate : null; 
        }
    );
  }

  private updateMaxStartDateWhenEndDateChanged(): void {
    this.userProjectForm.get( 'endDate' ).valueChanges.subscribe(
        selectedEndDate => {
          this.maxStartDate = selectedEndDate ? selectedEndDate : new Date();
        }
    );
  }



  public saveProject0(): void {
    if ( !this.userProjectForm.valid ) {
      console.error( 'form user project is not valid, can not save it' );
      return;
    }
    //  this.saveProject.emit(this.userProjectForm.value);
    // TODO will implement interceptor to catch request and response ....
    this.userProjectService.saveProject( this.userProjectForm.value );
  }

  /****************** G E T T E R S **********************/
  // get userProjectForm () { console.log('here', Date.now()); return this._userProjectForm;  }
  // get maxStartDate    () { return this._maxStartDate;     }
  // get minEndDate      () { return this._minEndDate;       }
}
