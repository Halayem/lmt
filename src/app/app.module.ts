import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserInformationComponent } from './user-registry/components/user-information.component';
import { UserBasicInformationComponent } from './user-registry/user-basic-information/components/user-basic-information.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PhoneMaskDirective } from './shared/directives/phone-mask.directive';

import { HttpClientModule } from '@angular/common/http'; 

@NgModule({
  declarations: [
    AppComponent,
    UserInformationComponent,
    PhoneMaskDirective,
    UserBasicInformationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
   ReactiveFormsModule,
   HttpClientModule,
   BsDatepickerModule.forRoot(),
   FormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
