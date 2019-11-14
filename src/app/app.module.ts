import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { HttpClientModule } from '@angular/common/http';

import { UserInformationComponent } from './user-registry/components/user-information.component';
import { UserExperianceComponent } from './user-registry/user-experiance/components/user-experiance/user-experiance.component';

import { MaterialModule } from './material/material.module';
import { UserExperiancenceService } from './user-registry/user-experiance/service/user-experiancence.service';
import { UserExperianceResolverService } from './user-registry/user-experiance/service/user-experiance-resolver.service';
import { MAT_DATE_LOCALE } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    UserInformationComponent,
    UserExperianceComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularEditorModule,
    MaterialModule,

  ],
  providers: [UserExperiancenceService, UserExperianceResolverService, { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' },],
  bootstrap: [AppComponent]
})
export class AppModule { }
