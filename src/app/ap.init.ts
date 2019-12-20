import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';

// AoT requires an exported function for factories
export function HttpLoaderFactory( http: HttpClient ) {
    return new TranslateHttpLoader( http );
  };
  
  export const translateInitializerFn = ( translate: TranslateService ) => {
    return () => {
        console.log ( '***', translate );
        return translate.setDefaultLang( 'fr' );
    };
  };