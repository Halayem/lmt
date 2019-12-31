import { NgModule, LOCALE_ID, APP_INITIALIZER } from '@angular/core';
import { AppComponent } from './app.component';
import { MAT_DATE_LOCALE } from '@angular/material';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { UserRegistryModule } from './user-registry/user-registry.module';
import { routing } from './app-routing.module';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { HttpLoaderFactory, translateInitializerFn } from './app.init';
import { BrowserModule } from '@angular/platform-browser';
import { NgReduxModule, NgRedux } from '@angular-redux/store';
import { SkillState, skillReducer, INITIAL_STATE } from './user-registry/user-project/reducer/skill';
import { SkillActions } from './user-registry/user-project/action/skill';

// the second parameter 'fr' is optional
registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    UserRegistryModule,
    BrowserModule,
    NgReduxModule,
    TranslateModule.forRoot({
      loader: {
        provide:    TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps:       [HttpClient]
      }
    }),
    routing
  ],
  providers: [
    SkillActions,
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' }, 
    { provide: LOCALE_ID,       useValue: 'fr'    },
    { provide: APP_INITIALIZER, useFactory: translateInitializerFn, multi: true, deps: [TranslateService] }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { 

  constructor( skillNgRedux: NgRedux<SkillState> ) {
    skillNgRedux.configureStore( skillReducer, INITIAL_STATE );
  }
}
