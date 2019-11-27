import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';
import { MatAutocomplete, MatChipInputEvent, MatAutocompleteSelectedEvent } from '@angular/material';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import * as R from 'ramda';
import { UserProjectService } from '../service/user-project.service';
import { lmtWysiwygHtmlEditorConfig } from '../../../config/lmtWysiwygHtmlEditorConfig';
import { Project, Skill, Profile } from '../model/project';
import { SkillService } from '../service/skill.service';
import { ProfileService } from '../service/profile.service';

@Component({
  selector:     'app-user-project',
  templateUrl:  './user-project.component.html',
  styleUrls:    ['./user-project.component.scss']
})
export class UserProjectComponent implements OnInit {

  private _userProjectForm: FormGroup;
  private _maxStartDate:    Date;
  private _minEndDate:      Date;

  separatorKeysCodes: number[] = [ENTER, COMMA];
  
  
  selectedSkills: string[] = [];
  selectedRoles: string[] = [];
  roles: string[];

  @ViewChild('skillInput', { static: false }) skillInput: ElementRef<HTMLInputElement>;
  @ViewChild('autocompletionSkill', { static: false }) matAutocomplete: MatAutocomplete;

  @ViewChild('roleInput', { static: false }) roleInput: ElementRef<HTMLInputElement>;
  @ViewChild('autocompletionRole', { static: false }) autocompletionRole: MatAutocomplete;

  @Output() saveProject: EventEmitter<Project> = new EventEmitter<Project>();

  configTextEditor: AngularEditorConfig = lmtWysiwygHtmlEditorConfig;
  
  private _referentialSkills$:    Observable<Skill[]>;
  private _filteredSkills$:       Observable<Skill[]>;
  private _referentialProfiles$:  Observable<Profile[]>;
  private _filteredProfile$:      Observable<Profile[]>;
  
  constructor(  readonly formBuilder:         FormBuilder,
                readonly skillService:        SkillService,
                readonly profileService:      ProfileService,
                readonly userProjectService:  UserProjectService ) {

    this._referentialSkills$    = this.skillService.getSkills();
    this._referentialProfiles$  = this.profileService.getProfiles();
  }

  ngOnInit() {
    this.setupFilter              ();
    this.createUserProjectForm    ();
    this.setupProjectDateInterval ();
  }

  private setupFilter(): void {
    // TODO when subscribe, must unsubscribe 
    this._userProjectForm.get( 'skills' ).valueChanges.subscribe( writtenSkill => {
      // this._filteredSkills$ = CollectionUtils.filter( this._referentialSkills$, 'name', writtenSkill ); 
    });
    
    this._userProjectForm.get( 'profiles' ).valueChanges.subscribe( writtenProfile => {
      // this._filteredProfile$ = CollectionUtils.filter( this._referentialProfiles$, 'name', writtenProfile ); 
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

  

  addSkill(event: MatChipInputEvent): void {
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;
      if ((value || '').trim()) {
        if (!this.selectedSkills.includes(value.trim())) {
          this.selectedSkills.push(value.trim());
        }
        this.userProjectForm.patchValue({
          skills: this.selectedSkills
        });
      }
      if (input) {
        input.value = '';
      }
      //this.skillCtrl.setValue(null);
    }
  }

  addRole(event: MatChipInputEvent): void {
    if (!this.autocompletionRole.isOpen) {
      const input = event.input;
      const value = event.value;
      if ((value || '').trim()) {
        if (!this.selectedRoles.includes(value.trim())) {
          this.selectedRoles.push(value.trim());
        }
        this.userProjectForm.patchValue({
          roles: this.selectedRoles
        });
      }
      if (input) {
        input.value = '';
      }
      //this.roleCtrl.setValue(null);
    }
  }

  removeSkill(skill: string): void {
    this.selectedSkills = R.filter(currentSkill => currentSkill !== skill, this.selectedSkills);
    this.userProjectForm.patchValue({
      skills: this.selectedSkills
    });
  }

  removeRole(role: string): void {
    this.selectedRoles = R.filter(currentRole => currentRole !== role, this.selectedRoles);
    this.userProjectForm.patchValue({
      roles: this.selectedRoles
    });
  }



  selectedSkillFromAoutocomplete(event: MatAutocompleteSelectedEvent): void {
    if (!this.selectedSkills.includes(event.option.viewValue)) {
      this.selectedSkills.push(event.option.viewValue);
    }
    this.skillInput.nativeElement.value = '';
    //this.skillCtrl.setValue(null);
    this.userProjectForm.patchValue({
      skills: this.selectedSkills
    });
  }

  selectedRoleFromAoutocomplete(event: MatAutocompleteSelectedEvent): void {
    if (!this.selectedRoles.includes(event.option.viewValue)) {
      this.selectedRoles.push(event.option.viewValue);
    }
    this.roleInput.nativeElement.value = '';
    //this.roleCtrl.setValue(null);
    this.userProjectForm.patchValue({
      roles: this.selectedRoles
    });
  }

  

  public saveProject0(): void {
    if ( !this._userProjectForm.valid ) {
      console.error( 'form user project is not valid, can not save it' );
      return;
    }
    //  this.saveProject.emit(this.userProjectForm.value);
    // TODO will implement interceptor to catch request and response ....
    this.userProjectService.saveProject( this._userProjectForm.value );
  }

  /****************** G E T T E R S **********************/
  get userProjectForm () { return this._userProjectForm;  }
  get maxStartDate    () { return this._maxStartDate;     }
  get minEndDate      () { return this._minEndDate;       }
}
