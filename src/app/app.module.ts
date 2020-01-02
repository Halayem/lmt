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
import { NgReduxModule, NgRedux, DevToolsExtension } from '@angular-redux/store';
import { SkillState, skillReducer, SKILL_INITIAL_STATE } from './user-registry/user-project/reducer/skill.reducer';
import { SkillActions } from './user-registry/user-project/action/skill.action';
import { SkillEpics } from './user-registry/user-project/epic/skill.epic';
import { createEpicMiddleware, combineEpics } from 'redux-observable-es6-compat';
import { StoreEnhancer, combineReducers } from 'redux';
import { ProfileState, profileReducer, PROFILE_INITIAL_STATE } from './user-registry/user-project/reducer/profile.reducer';
import { ProfileEpics } from './user-registry/user-project/epic/profile.epic';
import { ProfileActions } from './user-registry/user-project/action/profile.action';

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
    SkillActions,   SkillEpics,
    ProfileActions, ProfileEpics,
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' }, 
    { provide: LOCALE_ID,       useValue: 'fr'    },
    { provide: APP_INITIALIZER, useFactory: translateInitializerFn, multi: true, deps: [TranslateService] }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { 

  private _storeEnhancers:  StoreEnhancer<any> | any;
  private _devTools:        DevToolsExtension;

  constructor( ngRedux:       NgRedux<any>,
               skillEpics:    SkillEpics,
               profileEpics:  ProfileEpics,
               devTools:      DevToolsExtension ) {
    
    this._devTools = devTools;
    this.setupStoreEnhancersWhenDevtoosIsEnabled();

    const epicMiddleware = createEpicMiddleware();
    const rootReducer: any = combineReducers( { skills: skillReducer, profiles: profileReducer } );

    ngRedux.configureStore 
    (  
      rootReducer,
      {}, 
      [epicMiddleware], 
      this._storeEnhancers 
    );

    epicMiddleware.run( 
      combineEpics( 
        skillEpics.load, 
        profileEpics.load 
      ) 
    );
  }

  private setupStoreEnhancersWhenDevtoosIsEnabled(): void {
    this._storeEnhancers = this._devTools.isEnabled() ? [ this._devTools.enhancer() ]: [];
  }
 
}
