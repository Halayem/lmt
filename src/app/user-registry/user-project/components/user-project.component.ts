import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';
import { MatAutocomplete, MatChipInputEvent, MatAutocompleteSelectedEvent } from '@angular/material';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ActivatedRoute } from '@angular/router';
import { startWith, map } from 'rxjs/operators';
import * as R from 'ramda';

import { UserProjectService } from '../service/user-project.service';
import { lmtWysiwygHtmlEditorConfig } from '../../../config/lmtWysiwygHtmlEditorConfig';
import { Project } from '../model/project';


@Component({
  selector: 'app-user-project',
  templateUrl: './user-project.component.html',
  styleUrls: ['./user-project.component.scss']
})
export class UserProjectComponent implements OnInit {

  private userProjectForm: FormGroup;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  skillCtrl = new FormControl();
  roleCtrl = new FormControl();
  filteredSkills: Observable<string[]>;
  filteredRoles: Observable<string[]>;
  selectedSkills: string[] = [];
  selectedRoles: string[] = [];
  dataSkills: string[];
  dataRoles: string[];
  roles: string[];
  minStartDate: Date;
  maxStartDate = new Date();
  minEndDate: Date;
  maxEndDate = new Date();

  @ViewChild('skillInput', { static: false }) skillInput: ElementRef<HTMLInputElement>;
  @ViewChild('autocompletionSkill', { static: false }) matAutocomplete: MatAutocomplete;

  @ViewChild('roleInput', { static: false }) roleInput: ElementRef<HTMLInputElement>;
  @ViewChild('autocompletionRole', { static: false }) autocompletionRole: MatAutocomplete;

  @Output() saveProject: EventEmitter<Project> = new EventEmitter<Project>();

  configTextEditor: AngularEditorConfig = lmtWysiwygHtmlEditorConfig;
  constructor(
    readonly formBuilder: FormBuilder,
    readonly activatedRoute: ActivatedRoute,
    readonly userProjectService: UserProjectService) {
    this.filteredSkills = this.skillCtrl.valueChanges.pipe(
      startWith(null),
      map((skill: string | null) => skill ? this._filterData(skill, 'skill') : this.dataSkills.slice()));

    this.filteredRoles = this.roleCtrl.valueChanges.pipe(
      startWith(null),
      map((role: string | null) => role ? this._filterData(role, 'role') : this.dataRoles.slice()));
  }

  ngOnInit() {
    this.createUserProjectForm();
    this.getSkillsAndRoles();
    this.updateMinEndDate();
    this.updateMaxStartDate();
  }

  updateMinEndDate() {
    this.userProjectForm
      .get('startDate')
      .valueChanges.subscribe(
        val => {
          val ? this.minEndDate = val : this.minEndDate = null;
        }
      );
  }

  updateMaxStartDate() {
    this.userProjectForm
      .get('endDate')
      .valueChanges.subscribe(
        val => {
          val ? this.maxStartDate = val : this.maxStartDate = new Date();
        }
      );
  }


  createUserProjectForm() {
    this.userProjectForm = this.formBuilder.group({
      subject: ['', [Validators.required]],
      description: ['', [Validators.required]],
      enterpriseName: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', []],
      roles: ['', [Validators.required]],
      skills: ['', [Validators.required]],
    });
  }

  getSkillsAndRoles(): void {
    this.activatedRoute.data.subscribe(res => {
      [this.dataRoles, this.dataSkills] = res.data;
    });
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
      this.skillCtrl.setValue(null);
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
      this.roleCtrl.setValue(null);
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
    this.skillCtrl.setValue(null);
    this.userProjectForm.patchValue({
      skills: this.selectedSkills
    });
  }

  selectedRoleFromAoutocomplete(event: MatAutocompleteSelectedEvent): void {
    if (!this.selectedRoles.includes(event.option.viewValue)) {
      this.selectedRoles.push(event.option.viewValue);
    }
    this.roleInput.nativeElement.value = '';
    this.roleCtrl.setValue(null);
    this.userProjectForm.patchValue({
      roles: this.selectedRoles
    });
  }

  private _filterData(value: string, type: string): string[] {
    const filterValue = value.toLowerCase();

    return type === 'role' ?
      this.dataRoles.filter(skill => value && skill.toLowerCase().indexOf(filterValue) > -1) :
      this.dataSkills.filter(skill => value && skill.toLowerCase().indexOf(filterValue) > -1);
  }

  saveUserProject(): void {
    if (this.userProjectForm.valid) {
      this.saveProject.emit(this.userProjectForm.value);
      this.userProjectService.saveProject(this.userProjectForm.value).subscribe(
        res => console.log(res),
        err => console.log(err)
      );
    }
  }
}
