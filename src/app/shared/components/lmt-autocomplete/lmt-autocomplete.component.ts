import { Component, OnInit, Input } from '@angular/core';
import { LmtAutocompleteParameter } from './model/lmt-autocomplete-param';
import { Observable, of } from 'rxjs';
import { LmtAutocompleteConfigurationModel } from './model/lmt-autocomplete-config';
import { LMT_AUTO_COMPLETE_DEFAULT_CONFIGURATION } from './config/lmt-autocomplete-configs';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector:     'app-lmt-autocomplete',
  templateUrl:  './lmt-autocomplete.component.html',
  styleUrls:    ['./lmt-autocomplete.component.scss']
})
export class LmtAutocompleteComponent implements OnInit {

  @Input() lmtAutocompleteParam:  LmtAutocompleteParameter;
  @Input() lmtAutocompleteConfig: LmtAutocompleteConfigurationModel;

  private _filteredItems: Observable<any[]>;
  private _itemControl:   FormControl;
  constructor() { 
    if ( this.lmtAutocompleteConfig === null ) {
      this.lmtAutocompleteConfig = LMT_AUTO_COMPLETE_DEFAULT_CONFIGURATION;
      console.info ( 'LmtAutocompleteComponent - setting lmt autocomplete default configuration: ', this.lmtAutocompleteConfig );
    }

    this._itemControl   = new FormControl();
    this.getFilterCallback().subscribe( filterCallback => this._filteredItems = filterCallback );
  }


  private getFilterCallback(): Observable<Observable<any[]>> {
    return  ( this._itemControl.valueChanges.pipe(
              startWith ( null ),
              map( ( searchedItem: string | null ) => 
                      searchedItem ?  this.defaultFilter ( searchedItem ) :
                                      this.lmtAutocompleteParam.datasource.pipe()
              )
            ) );
  }

  private defaultFilter( searchedItem: string ): Observable<any[]> {
    return this.lmtAutocompleteParam.datasource.pipe(
      map ( items => items.filter ( 
        item => item[ this.lmtAutocompleteParam.attributeName ].toLowerCase().indexOf( searchedItem.toLowerCase() ) === 0 ) )
    );
  }

  ngOnInit() {
  }

  get itemControl() { return this._itemControl; }
}
