import { Injectable } from '@angular/core';
import * as R from 'ramda';

@Injectable()

export class NormalizeStringService {

  constructor() {}

  public nfd ( input: string ): string {
    return R.isNil( input ) ? input: input.normalize( 'NFD' ).replace( /[\u0300-\u036f]/g, '' );
  }
}
