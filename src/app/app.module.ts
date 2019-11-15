import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from './material/material.module';
import { UserExperiancenceService } from './user-registry/user-experiance/service/user-experiancence.service';
import { UserExperianceResolverService } from './user-registry/user-experiance/service/user-experiance-resolver.service';
import { MAT_DATE_LOCALE } from '@angular/material';
import { UserInformationComponent } from './user-registry/components/user-information.component';
import { UserBasicInformationComponent } from './user-registry/user-basic-information/components/user-basic-information.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PhoneMaskDirective } from './shared/directives/phone-mask.directive';
import { UserExperianceComponent } from './user-registry/user-experiance/components/user-experiance.component';

@NgModule({
  declarations: [
    AppComponent,
    UserInformationComponent,
    PhoneMaskDirective,
    UserBasicInformationComponent
    UserExperianceComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
   ReactiveFormsModule,
   HttpClientModule,
   BsDatepickerModule.forRoot(),
    BrowserAnimationsModule,
    FormsModule,
    AngularEditorModule,
    MaterialModule,
  ],
  providers: [UserExperiancenceService, UserExperianceResolverService, { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
