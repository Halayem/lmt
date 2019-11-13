import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { MatAutocomplete, MatChipInputEvent, MatAutocompleteSelectedEvent } from '@angular/material';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-user-experiance',
  templateUrl: './user-experiance.component.html',
  styleUrls: ['./user-experiance.component.scss']
})
export class UserExperianceComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = false;
  separatorKeysCodes: number[] = [];
  technoCtrl = new FormControl();
  filteredTechnos: Observable<string[]>;
  technos: string[] = [];
  allTechnos: string[] = ['Angular', 'Java', '.Net', 'React', 'Python', 'PHP', 'C++', 'QT'];

  @ViewChild('technoInput', {static: false}) technoInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;


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
  constructor() {
    this.filteredTechnos = this.technoCtrl.valueChanges.pipe(
        startWith(null),
        map((fruit: string | null) => fruit ? this._filter(fruit) : this.allTechnos.slice()));
  }

  ngOnInit() {

  }

  add(event: MatChipInputEvent): void {
    // Add fruit only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our fruit
      if ((value || '').trim()) {
        this.technos.push(value.trim());
      }

      // Reset the input value
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
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.technos.push(event.option.viewValue);
    this.technoInput.nativeElement.value = '';
    this.technoCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allTechnos.filter(fruit => fruit.toLowerCase().indexOf(filterValue) > -1);
  }

}
