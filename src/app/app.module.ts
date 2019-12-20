import { NgModule, LOCALE_ID } from '@angular/core';
import { AppComponent } from './app.component';
import { MAT_DATE_LOCALE } from '@angular/material';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { UserRegistryModule } from './user-registry/user-registry.module';
import { routing } from './app-routing.module';

// the second parameter 'fr' is optional
registerLocaleData(localeFr, 'fr');


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    UserRegistryModule,
    routing
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' }, 
    { provide: LOCALE_ID,       useValue: 'fr'    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
