import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';
import { MatAutocomplete, MatChipInputEvent, MatAutocompleteSelectedEvent } from '@angular/material';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ActivatedRoute } from '@angular/router';
import { startWith, map } from 'rxjs/operators';
import * as R from 'ramda';

import { UserExperiancenceService } from '../service/user-experiancence.service';
import { lmtWysiwygHtmlEditorConfig } from '../../../config/lmtWysiwygHtmlEditorConfig';


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
  skillsSelected: string[] = [];
  dataSkills: string[];
  roles: string[];
  minStartDate: Date;
  maxStartDate = new Date();
  minEndDate: Date;
  maxEndDate = new Date();

  @ViewChild('skillInput', { static: false }) skillInput: ElementRef<HTMLInputElement>;
  @ViewChild('autocompletionSkill', { static: false }) matAutocomplete: MatAutocomplete;


  config: AngularEditorConfig = lmtWysiwygHtmlEditorConfig;
  constructor(
    readonly fb: FormBuilder,
    readonly actRoute: ActivatedRoute,
    readonly userExperiancenceService: UserExperiancenceService) {
    this.filteredSkills = this.skillCtrl.valueChanges.pipe(
      startWith(null),
      map((skill: string | null) => skill ? this._filter(skill) : this.dataSkills.slice()));
  }

  ngOnInit() {
    this.cretaeForm();
    this.getSkillsAndRoles();
    this.updateMinEndDate();
    this.updateMaxStartDate();
    this.config.placeholder = 'Description du projet';
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


  cretaeForm() {
    this.userProjectForm = this.fb.group({
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
    this.actRoute.data.subscribe(res => {
      [this.roles, this.dataSkills] = res.data;
    });
  }

  addSkill(event: MatChipInputEvent): void {
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;
      if ((value || '').trim()) {
        if (!this.skillsSelected.includes(value.trim())) {
          this.skillsSelected.push(value.trim());
        }
        this.userProjectForm.patchValue({
          skills: this.skillsSelected
        });
      }
      if (input) {
        input.value = '';
      }

      this.skillCtrl.setValue(null);
    }
  }

  removeSkill(skill: string): void {
    this.skillsSelected = R.filter(currentSkill => currentSkill !== skill, this.skillsSelected);
    this.userProjectForm.patchValue({
      skills: this.skillsSelected
    });
  }

  selectedSkillFromAoutocomplete(event: MatAutocompleteSelectedEvent): void {
    if (!this.skillsSelected.includes(event.option.viewValue)) {
      this.skillsSelected.push(event.option.viewValue);
    }
    this.skillInput.nativeElement.value = '';
    this.skillCtrl.setValue(null);
    this.userProjectForm.patchValue({
      skills: this.skillsSelected
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.dataSkills.filter(skill => value && skill.toLowerCase().indexOf(filterValue) > -1);
  }

  saveUserProject(): void {
    if (this.userProjectForm.valid) {
      console.log(this.userProjectForm.value);
      this.userExperiancenceService.saveProject(this.userProjectForm.value).subscribe(
        res => console.log(res),
        err => console.log(err)
      );
    }

  }
}
