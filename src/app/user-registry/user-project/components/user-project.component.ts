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
  filteredSkills: Observable<string[]>;
  selectedSkills: string[] = [];
  dataSkills: string[];
  roles: string[];
  minStartDate: Date;
  maxStartDate = new Date();
  minEndDate: Date;
  maxEndDate = new Date();

  @ViewChild('skillInput', { static: false }) skillInput: ElementRef<HTMLInputElement>;
  @ViewChild('autocompletionSkill', { static: false }) matAutocomplete: MatAutocomplete;

  @Output() saveProject: EventEmitter<Project> = new EventEmitter<Project>();

  configTextEditor: AngularEditorConfig = lmtWysiwygHtmlEditorConfig;
  constructor(
    readonly formBuilder: FormBuilder,
    readonly activatedRoute: ActivatedRoute,
    readonly userProjectService: UserProjectService) {
    this.filteredSkills = this.skillCtrl.valueChanges.pipe(
      startWith(null),
      map((skill: string | null) => skill ? this._filterDataskill(skill) : this.dataSkills.slice()));
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
      role: ['', [Validators.required]],
      skills: ['', [Validators.required]],
    });
  }

  getSkillsAndRoles(): void {
    this.activatedRoute.data.subscribe(res => {
      [this.roles, this.dataSkills] = res.data;
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

  removeSkill(skill: string): void {
    this.selectedSkills = R.filter(currentSkill => currentSkill !== skill, this.selectedSkills);
    this.userProjectForm.patchValue({
      skills: this.selectedSkills
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

  private _filterDataskill(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.dataSkills.filter(skill => value && skill.toLowerCase().indexOf(filterValue) > -1);
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
