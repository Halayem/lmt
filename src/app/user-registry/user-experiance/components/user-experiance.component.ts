import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocomplete, MatChipInputEvent, MatAutocompleteSelectedEvent } from '@angular/material';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ActivatedRoute } from '@angular/router';
import { Entreprise } from '../model/entreprise';
import { lmtWysiwygHtmlEditorConfig } from 'src/app/config/lmtWysiwygHtmlEditorConfig';

@Component({
  selector: 'app-user-experiance',
  templateUrl: './user-experiance.component.html',
  styleUrls: ['./user-experiance.component.scss']
})
export class UserExperianceComponent implements OnInit {

  projectForm: FormGroup;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  skillCtrl = new FormControl();
  filteredSkills: Observable<string[]>;
  skillsSelected: string[] = [];
  dataSkills: string[];
  roles: string[];
  filteredEntreprise$: Observable<Entreprise[]>;

  dateStartMin: Date;
  dateStartMax = new Date();
  dateEndMin: Date;
  dateEndMax = new Date();

  @ViewChild('skillInput', { static: false }) skillInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete;


  config: AngularEditorConfig = lmtWysiwygHtmlEditorConfig;
  constructor(
    readonly fb: FormBuilder,
    readonly actRoute: ActivatedRoute) {
    this.filteredSkills = this.skillCtrl.valueChanges.pipe(
      startWith(null),
      map((skill: string | null) => skill ? this._filter(skill) : this.dataSkills.slice()));
  }

  ngOnInit() {
    this.cretaeForm();
    this.getDataResolver();
    this.dateStartChange();
    this.dateEndChange();
    this.config.placeholder = 'Description du projet';
  }

  dateStartChange() {
    this.projectForm
      .get('startDate')
      .valueChanges.subscribe(
        val => {
          val ? this.dateEndMin = val : this.dateEndMin = null;
        }
      );
  }

  dateEndChange() {
    this.projectForm
      .get('endDate')
      .valueChanges.subscribe(
        val => {
          val ? this.dateStartMax = val : this.dateStartMax = new Date();
        }
      );
  }


  cretaeForm() {
    this.projectForm = this.fb.group({
      entitle: ['', [Validators.required]],
      description: ['', [Validators.required]],
      entrepriseName: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', []], role: ['', [Validators.required]],
      skills: ['', [Validators.required]],
    });
  }

  getDataResolver(): void {
    this.actRoute.data.subscribe(res => {
      [this.roles, this.dataSkills] = res.data;
    });
  }



  add(event: MatChipInputEvent): void {
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      if ((value || '').trim()) {
        this.skillsSelected.push(value.trim());
        this.projectForm.patchValue({
          skills: this.skillsSelected
        });
      }

      if (input) {
        input.value = '';
      }

      this.skillCtrl.setValue(null);
    }
  }

  remove(techno: string): void {
    const index = this.skillsSelected.indexOf(techno);

    if (index >= 0) {
      this.skillsSelected.splice(index, 1);
      this.projectForm.patchValue({
        skills: this.skillsSelected
      });
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.skillsSelected.push(event.option.viewValue);
    this.skillInput.nativeElement.value = '';
    this.skillCtrl.setValue(null);
    this.projectForm.patchValue({
      skills: this.skillsSelected
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.dataSkills.filter(skill => value && skill.toLowerCase().indexOf(filterValue) > -1);
  }

  saveProject(): void {
    if (this.projectForm.valid) {
      console.log(this.projectForm.value);
    }

  }

  get entitle() { return this.projectForm.get('entitle'); }
  get description() { return this.projectForm.get('description'); }
  get entrepriseName() { return this.projectForm.get('entrepriseName'); }
  get startDate() { return this.projectForm.get('startDate'); }
  get endDate() { return this.projectForm.get('endDate'); }
  get project() { return this.projectForm.get('project'); }
  get role() { return this.projectForm.get('role'); }
  get skills() { return this.projectForm.get('skills'); }


}
