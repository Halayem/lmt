import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from './material/material.module';
import { UserProjectService } from './user-registry/user-project/service/user-project.service';
import { UserProjectResolverService } from './user-registry/user-project/service/user-project-resolver.service';
import { MAT_DATE_LOCALE } from '@angular/material';
import { UserInformationComponent } from './user-registry/components/user-information.component';
import { UserProjectComponent } from './user-registry/user-project/components/user-project.component';
import { UserExperianceComponent } from './user-registry/user-experiance/components/user-experiance.component';

@NgModule({
  declarations: [
    AppComponent,
    UserInformationComponent,
    UserProjectComponent,
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
  providers: [UserProjectService, UserProjectResolverService, { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
