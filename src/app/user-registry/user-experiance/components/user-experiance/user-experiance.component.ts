import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { MatAutocomplete, MatChipInputEvent, MatAutocompleteSelectedEvent } from '@angular/material';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { UserExperiancenceService } from '../../service/user-experiancence.service';

@Component({
  selector: 'app-user-experiance',
  templateUrl: './user-experiance.component.html',
  styleUrls: ['./user-experiance.component.scss']
})
export class UserExperianceComponent implements OnInit {

  missionForm: FormGroup;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = false;
  separatorKeysCodes: number[] = [];
  technoCtrl = new FormControl();
  filteredTechnos: Observable<string[]>;
  technos: string[] = [];
  allTechnos: string[] = ['Angular', 'Java', '.Net', 'React', 'Python', 'PHP', 'C++', 'QT'];

  @ViewChild('technoInput', { static: false }) technoInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete;


  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Description rôle',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };
  constructor(private fb: FormBuilder, private userExperiancenceService: UserExperiancenceService) {
    this.filteredTechnos = this.technoCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => fruit ? this._filter(fruit) : this.allTechnos.slice()));
  }

  ngOnInit() {
    this.cretaeForm();

  }

  cretaeForm() {
    this.missionForm = this.fb.group({
      entrepriseName: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(3)]],
      dateStart: ['', [Validators.required]],
      dateEnd: ['', [Validators.required]],
      projet: ['', [Validators.required]],
      role: ['', [Validators.required]],
      descriptionRole: ['', [Validators.required]],
      technos: ['', [Validators.required]],
    });
  }

  add(event: MatChipInputEvent): void {
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      if ((value || '').trim()) {
        this.technos.push(value.trim());
        this.missionForm.patchValue({
          technos: this.technos
        });
      }

      if (input) {
        input.value = '';
      }

      this.technoCtrl.setValue(null);
    }
  }

  remove(techno: string): void {
    const index = this.technos.indexOf(techno);

    if (index >= 0) {
      this.technos.splice(index, 1);
      this.missionForm.patchValue({
        technos: this.technos
      });
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.technos.push(event.option.viewValue);
    this.technoInput.nativeElement.value = '';
    this.technoCtrl.setValue(null);
    this.missionForm.patchValue({
      technos: this.technos
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allTechnos.filter(fruit => fruit.toLowerCase().indexOf(filterValue) > -1);
  }

  saveMission(): void {
    console.log(this.missionForm.value);
    this.userExperiancenceService.saveMission(this.missionForm.value).subscribe(
      res => console.log(res),
      err => console.log(err)
    );
  }

  get entrepriseName() { return this.missionForm.get('entrepriseName'); }
  get dateStart() { return this.missionForm.get('dateStart'); }
  get dateEnd() { return this.missionForm.get('dateEnd'); }
  get projet() { return this.missionForm.get('projet'); }
  get role() { return this.missionForm.get('role'); }
  get descriptionRole() { return this.missionForm.get('descriptionRole'); }
  get techno() { return this.missionForm.get('technos'); }


}
