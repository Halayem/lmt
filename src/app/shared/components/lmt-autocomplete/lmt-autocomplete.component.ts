import { Component, ViewChild, ElementRef, Input, forwardRef } from '@angular/core';
import { LmtAutocompleteParameter, ResearchFilter } from './model/lmt-autocomplete-param';
import { Observable, BehaviorSubject } from 'rxjs';
import { LmtAutocompleteConfigurationModel } from './model/lmt-autocomplete-config';
import { LMT_AUTO_COMPLETE_DEFAULT_CONFIGURATION } from './config/lmt-autocomplete-configs';
import { FormControl, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import * as R from 'ramda';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material';
import { NormalizeStringService } from '../../service/normalize-string.service';

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

  constructor( readonly normalizeStringService: NormalizeStringService ) { 
    if ( R.isNil( this.lmtAutocompleteConfig ) ) {
      this.lmtAutocompleteConfig = LMT_AUTO_COMPLETE_DEFAULT_CONFIGURATION;
      console.info ( 'LmtAutocompleteComponent - setting lmt autocomplete default configuration: ', this.lmtAutocompleteConfig );
    }
    
    this._itemControl = new FormControl();
    this._componentReady.subscribe( ready => {
      if ( ready ) {
        this._filteredItems = this.getFilterCallback();  
      }
    });
  }

  private getFilterCallback(): Observable<any[]> {
    return  ( this._itemControl.valueChanges.pipe(
              startWith ( null ),
              map( ( searchedItem: string | null ) => 
                      searchedItem ?  this.setupFilter ( this._lmtAutocompleteParam.researchFilter )( searchedItem ):
                                      this.lmtAutocompleteParam.datasource.slice()
              )
            ) );
  }

  private setupFilter( researchFilter: ResearchFilter | null ) {
    if ( R.isNil( researchFilter ) ) {
      return this.defaultFilter.bind( this );
    }
    
    switch ( researchFilter ) {
      case ResearchFilter.NATURAL   :  return  this.defaultFilter.bind    ( this );
      case ResearchFilter.NORMALIZED:  return  this.normalizedFilter.bind ( this );
      default: {
        throw new Error( `unknown research filter to use: ${researchFilter}` );
      }
    }
  }

  @Input()
  set lmtAutocompleteParam( param: LmtAutocompleteParameter ) {
    if ( R.isNil ( param ) ) {
      return;
    }
    this._lmtAutocompleteParam = param;
    this._componentReady.next ( true );

    console.debug ( ' @Input() set lmtAutocompleteParam - parameter: ', param );
  }

  public selectedItem( matAutocompleteSelectedEvent: MatAutocompleteSelectedEvent ): void {
    this._selectedItems.push  ( matAutocompleteSelectedEvent.option.value );
    this.itemInput.nativeElement.value = '';
    this._itemControl.setValue( null );
    this.onChange( this._selectedItems );
  }

  /**
   * Removes a previous selected item: removes one element from index computed by R.findIndex...
   * @param itemToRemove 
   */
  public removeItem( itemToRemove: any ): void {
    this._selectedItems.splice(
      R.findIndex( 
        R.propEq( this.lmtAutocompleteParam.attributeNameKey, itemToRemove[ this.lmtAutocompleteParam.attributeNameKey ] ) 
      )( this._selectedItems )
    ,1 ); 
    
    this.onChange( this._selectedItems );
  }

  // *********************************************************
  // ******* F I L T E R S  I M P L E M E N T A T I O N ******
  // *********************************************************
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

  private normalizedFilter( searchedItem: string | any ): any[] {
    if ( typeof searchedItem !== 'string' ) {
      return;
    }
    return this.lmtAutocompleteParam.datasource.filter(
      item => this.normalizeStringService.nfd(item[ this.lmtAutocompleteParam.attributeNameForFilter ]).toLowerCase()
                                                                        .indexOf( 
                                                                          this.normalizeStringService.nfd( searchedItem.toLowerCase() ) 
                                                                        ) === 0 
    );
  }

  // *********************************************************
  // *** ControlValueAccessor  I M P L E M E N T A T I O N ***
  // *********************************************************

  public onChange: any = ( selectedItems: any[] )  => {};

  /**
   * @override
   */
  public writeValue( values: any[] ): void {
    this._selectedItems.push( ...values );
  }
  
  /**
   * @override
   * Register a function provided by Angular,
   * this function will be called by this component when a value changes
   * 
   */
  public registerOnChange( fn: any[] ): void {
    this.onChange = fn;
  }

  /**
   * @override
   */
  public registerOnTouched( fn: any ): void {
    console.warn ( 'registerOnTouched - not yet implemented !' );
  }



  get itemControl         () { return this._itemControl;          }
  get filteredItems       () { return this._filteredItems;        }
  get selectedItems       () { return this._selectedItems;        }
  get lmtAutocompleteParam() { return this._lmtAutocompleteParam; }
  get componentReady      () { return this._componentReady;       }
}