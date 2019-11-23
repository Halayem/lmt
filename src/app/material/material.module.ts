import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatAutocompleteModule,
  MatChipsModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatExpansionModule
} from '@angular/material';

const modulesMaterials = [
  MatAutocompleteModule,
  MatChipsModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatExpansionModule];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    modulesMaterials
  ],
  exports: [modulesMaterials]
})
export class MaterialModule { }
