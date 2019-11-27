import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from './material/material.module';
import { UserProjectService } from './user-registry/user-project/service/user-project.service';
import { MAT_DATE_LOCALE } from '@angular/material';
import { UserInformationComponent } from './user-registry/components/user-information.component';
import { UserProjectComponent } from './user-registry/user-project/components/user-project.component';
import { UserBasicInformationComponent } from './user-registry/user-basic-information/components/user-basic-information.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { UserExperianceComponent } from './user-registry/user-experiance/components/user-experiance.component';
import { UserExperianceListComponent } from './user-registry/user-experiance/components/user-experiance-list/user-experiance-list.component';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

// the second parameter 'fr' is optional
registerLocaleData(localeFr, 'fr');
import { NgxMaskModule } from 'ngx-mask';
import { LmtAutocompleteComponent } from './shared/components/lmt-autocomplete/lmt-autocomplete.component';


@NgModule({
  declarations: [
    AppComponent,
    UserInformationComponent,
    UserProjectComponent,
    UserExperianceListComponent,
    UserBasicInformationComponent,
    UserExperianceComponent,
    LmtAutocompleteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
   ReactiveFormsModule,
   NgxMaskModule.forRoot(),
   HttpClientModule,
   BsDatepickerModule.forRoot(),
    BrowserAnimationsModule,
    FormsModule,
    AngularEditorModule,
    MaterialModule,
  ],
  providers: [
    UserProjectService,
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' }, 
    { provide: LOCALE_ID, useValue: 'fr' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
