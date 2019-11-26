import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { LmtAutocompleteParameter } from './model/lmt-autocomplete-param';
import { Observable } from 'rxjs';
import { LmtAutocompleteConfigurationModel } from './model/lmt-autocomplete-config';
import { LMT_AUTO_COMPLETE_DEFAULT_CONFIGURATION } from './config/lmt-autocomplete-configs';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { SkillService } from 'src/app/user-registry/user-project/service/skill.service';
import * as R from 'ramda';
import { MatChipInputEvent, MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material';
@Component({
  selector:     'app-lmt-autocomplete',
  templateUrl:  './lmt-autocomplete.component.html',
  styleUrls:    ['./lmt-autocomplete.component.scss']
})
export class LmtAutocompleteComponent implements OnInit {

  @ViewChild ( 'auto',      { static: false } ) matAutocomplete:  MatAutocomplete;
  @ViewChild ( 'itemInput', { static: false })  itemInput:        ElementRef<HTMLInputElement>;
  // @Input() lmtAutocompleteParam:  LmtAutocompleteParameter;
  // @Input() lmtAutocompleteConfig: LmtAutocompleteConfigurationModel;
  public lmtAutocompleteParam:  LmtAutocompleteParameter;
  public lmtAutocompleteConfig: LmtAutocompleteConfigurationModel

  private _selectedItems: any[] = []; // for @Output

  private _filteredItems: Observable<any[]>;
  private _itemControl:   FormControl;
  
  constructor( readonly skillService: SkillService ) { 
    if ( R.isNil( this.lmtAutocompleteConfig ) ) {
      this.lmtAutocompleteConfig = LMT_AUTO_COMPLETE_DEFAULT_CONFIGURATION;
      console.info ( 'LmtAutocompleteComponent - setting lmt autocomplete default configuration: ', this.lmtAutocompleteConfig );
    }

    this.lmtAutocompleteParam = {
      datasource:       this.skillService.getSkills(),
      attributeName:    'name',
      attributeIdName:  'id'
    };

    console.log ( 'LmtAutocompleteComponent - ws executed ?');

    this._itemControl   = new FormControl();
    this.getFilterCallback().subscribe( filterCallback => this._filteredItems = filterCallback );
  }

  public selectedItem( matAutocompleteSelectedEvent: MatAutocompleteSelectedEvent ): void {
    console.log ( 'selectedItem - received event, input: ', matAutocompleteSelectedEvent.option );
    
    this._selectedItems.push  ( matAutocompleteSelectedEvent.option.value );
    this.itemInput.nativeElement.value = '';
    this._itemControl.setValue( null );

    console.log( 'selected items', this._selectedItems );
  }

  public removeItem( itemToRemove: any ): void {
    this._selectedItems.splice(
      R.findIndex( 
        R.propEq( this.lmtAutocompleteParam.attributeIdName, itemToRemove[ this.lmtAutocompleteParam.attributeIdName ] ) 
      )( this._selectedItems )
    ,1 ); // removes one element from index computed by R.findIndex...
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

  private defaultFilter( searchedItem: string | any ): Observable<any[]> {
    if ( typeof searchedItem !== 'string' ) {
      return;
    }
    return this.lmtAutocompleteParam.datasource.pipe(
      map ( items => items.filter ( 
        item => item[ this.lmtAutocompleteParam.attributeName ].toLowerCase()
                                                               .indexOf( 
                                                                  searchedItem.toLowerCase() 
                                                                ) === 0 ) )
    );
  }

  ngOnInit() {
  }

  get itemControl   () { return this._itemControl;    }
  get filteredItems () { return this._filteredItems;  }
  get selectedItems () { return this._selectedItems;  }
}
