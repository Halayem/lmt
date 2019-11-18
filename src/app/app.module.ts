import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from './material/material.module';
import { UserExperiancenceService } from './user-registry/user-project/service/user-experiancence.service';
import { UserExperianceResolverService } from './user-registry/user-project/service/user-experiance-resolver.service';
import { MAT_DATE_LOCALE } from '@angular/material';
import { UserInformationComponent } from './user-registry/components/user-information.component';
import { UserProjectComponent } from './user-registry/user-project/components/user-project.component';

@NgModule({
  declarations: [
    AppComponent,
    UserInformationComponent,
    UserProjectComponent,
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
  providers: [UserExperiancenceService, UserExperianceResolverService, { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
