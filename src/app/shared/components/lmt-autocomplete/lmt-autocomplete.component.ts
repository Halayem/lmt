import { Component, ViewChild, ElementRef, Input, forwardRef } from '@angular/core';
import { LmtAutocompleteParameter } from './model/lmt-autocomplete-param';
import { Observable, BehaviorSubject } from 'rxjs';
import { LmtAutocompleteConfigurationModel } from './model/lmt-autocomplete-config';
import { LMT_AUTO_COMPLETE_DEFAULT_CONFIGURATION } from './config/lmt-autocomplete-configs';
import { FormControl, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import * as R from 'ramda';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material';
@Component({
  selector:     'app-lmt-autocomplete',
  templateUrl:  './lmt-autocomplete.component.html',
  styleUrls:    ['./lmt-autocomplete.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LmtAutocompleteComponent),
      multi: true
    }
  ]
})
export class LmtAutocompleteComponent implements ControlValueAccessor {
  @ViewChild ( 'auto',      { static: false } ) matAutocomplete:  MatAutocomplete;
  @ViewChild ( 'itemInput', { static: false })  itemInput:        ElementRef<HTMLInputElement>;
 
  // input by setter !
  private _lmtAutocompleteParam:  LmtAutocompleteParameter;
  @Input() lmtAutocompleteConfig: LmtAutocompleteConfigurationModel;

  private _selectedItems: any[] = []; // for @Output
  private _filteredItems: Observable<any[]>;
  private _itemControl:   FormControl;

  private _componentReady = new BehaviorSubject( false );

  public _values: any;
  
  constructor( ) { 
    if ( R.isNil( this.lmtAutocompleteConfig ) ) {
      this.lmtAutocompleteConfig = LMT_AUTO_COMPLETE_DEFAULT_CONFIGURATION;
      console.info ( 'LmtAutocompleteComponent - setting lmt autocomplete default configuration: ', this.lmtAutocompleteConfig );
    }
    
    this._itemControl = new FormControl();
    this._componentReady.subscribe( ready => {
      console.log ( '*** construction ready ?', ready );
      if ( ready ) {
        
        this._filteredItems = this.getFilterCallback();;    
      }
    });
  }

  @Input()
  set lmtAutocompleteParam( param: LmtAutocompleteParameter) {
    console.info ( ' @Input() set lmtAutocompleteParam - parameter: ', param );
    if ( R.isNil ( param ) ) {
      return;
    }
    this._lmtAutocompleteParam = param;
    this._componentReady.next ( true );
  }



  public selectedItem( matAutocompleteSelectedEvent: MatAutocompleteSelectedEvent ): void {
    console.log ( 'selectedItem - received event, input: ', matAutocompleteSelectedEvent.option );
    
    this._selectedItems.push  ( matAutocompleteSelectedEvent.option.value );
    this.itemInput.nativeElement.value = '';
    this._itemControl.setValue( null );
    this._values = this._selectedItems;
    this.onChange(this._values )

    console.log( 'selected items', this._selectedItems );
  }

  /**
   * Removes a previous selected item
   * @param itemToRemove 
   */
  public removeItem( itemToRemove: any ): void {
    this._selectedItems.splice(
      R.findIndex( 
        R.propEq( this.lmtAutocompleteParam.attributeNameKey, itemToRemove[ this.lmtAutocompleteParam.attributeNameKey ] ) 
      )( this._selectedItems )
    ,1 ); 
    
    this._values = this._selectedItems;
    this.onChange(this._values )// removes one element from index computed by R.findIndex...
  }

  private getFilterCallback(): Observable<any[]> {
    return  ( this._itemControl.valueChanges.pipe(
              startWith ( null ),
              map( ( searchedItem: string | null ) => 
                      searchedItem ?  this.defaultFilter ( searchedItem ) :
                                      this.lmtAutocompleteParam.datasource.slice()
              )
            ) );
  }

  private defaultFilter( searchedItem: string | any ): any[] {
    if ( typeof searchedItem !== 'string' ) {
      return;
    }
    return this.lmtAutocompleteParam.datasource.filter(
        item => item[ this.lmtAutocompleteParam.attributeNameForFilter ].toLowerCase()
                                                                        .indexOf( 
                                                                          searchedItem.toLowerCase() 
                                                                        ) === 0 
    );
  }

  onChange: any = () => {}

  onTouch: any = () => {}
  

  writeValue(obj: any): void {
    this._values = obj;

  }
  registerOnChange(fn: any): void {
    this.onChange = fn;

  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  get itemControl         () { return this._itemControl;          }
  get filteredItems       () { return this._filteredItems;        }
  get selectedItems       () { return this._selectedItems;        }
  get lmtAutocompleteParam() { return this._lmtAutocompleteParam; }
  get componentReady      () { return this._componentReady;       }
}
