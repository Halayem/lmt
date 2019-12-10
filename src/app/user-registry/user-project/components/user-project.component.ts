import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { UserProjectService } from '../service/user-project.service';
import { lmtWysiwygHtmlEditorConfig } from '../../../config/lmtWysiwygHtmlEditorConfig';
import { Project, Skill, Profile } from '../model/project';
import { SkillService } from '../service/skill.service';
import { ProfileService } from '../service/profile.service';
import { LmtAutocompleteParameter, ResearchFilter } from './../../../shared/components/lmt-autocomplete/model/lmt-autocomplete-param';
@Component({
  selector:     'app-user-project',
  templateUrl:  './user-project.component.html',
  styleUrls:    ['./user-project.component.scss']
})
export class UserProjectComponent implements OnInit {

  private _referentialSkills$:    Observable<Skill[]>;
  private _referentialProfiles$:  Observable<Profile[]>;
  private _userProjectForm:       FormGroup;
  private _maxStartDate:          Date = new Date();
  private _minEndDate:            Date;
  lmtAutocompleteParamForProfile: LmtAutocompleteParameter; 
  lmtAutocompleteParamForSkill:   LmtAutocompleteParameter;


  binding: FormControl;
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
        researchFilter: ResearchFilter.NORMALIZED
      };
    });

    this._referentialSkills$.subscribe(skills => {
      console.log ( 'parent: skills: ', skills );
      this.lmtAutocompleteParamForSkill = {
        datasource:             skills,
        attributeNameToDisplay: 'name',
        attributeNameForFilter: 'name',
        attributeNameKey:       'id',
        researchFilter: ResearchFilter.NATURAL
      };
    });
  }

  private createUserProjectForm(): void {
    this._userProjectForm = this.formBuilder.group({
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
    this._userProjectForm.get( 'startDate' ).valueChanges.subscribe(
        selectedStartDate => {
          this._minEndDate = selectedStartDate ? selectedStartDate : null; 
        }
    );
  }

  private updateMaxStartDateWhenEndDateChanged(): void {
    this._userProjectForm.get( 'endDate' ).valueChanges.subscribe(
        selectedEndDate => {
          this._maxStartDate = selectedEndDate ? selectedEndDate : new Date();
        }
    );
  }



  public saveUserProject(): void {
    if ( !this._userProjectForm.valid ) {
      console.error( 'form user project is not valid, can not save it' );
      return;
    }
    //  this.saveProject.emit(this._userProjectForm.value);
    // TODO will implement interceptor to catch request and response ....
    this.userProjectService.saveProject( this._userProjectForm.value );
  }

  /****************** G E T T E R S **********************/
  get userProjectForm () { return this._userProjectForm;  }
  get maxStartDate    () { return this._maxStartDate;     }
  get minEndDate      () { return this._minEndDate;       }
}

