import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LmtAutocompleteComponent } from './lmt-autocomplete.component';
import { MaterialModule } from 'src/app/material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('LmtAutocompleteComponent', () => {
  let component: LmtAutocompleteComponent;
  let fixture: ComponentFixture<LmtAutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [        
        MaterialModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        FormsModule
      ],
      declarations: [ LmtAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LmtAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('the component is not ready', done => {
    let comp = new LmtAutocompleteComponent();
    comp.componentReady.subscribe(ready => {
      expect(ready).toBe(false);
      done();
    })
  });

  
  it('the component is ready', done => {
    component.lmtAutocompleteParam =  {
      datasource:             [],
      attributeNameToDisplay: 'name',
      attributeNameForFilter: 'name',
      attributeNameKey:       'id',
    };
    component.componentReady.subscribe(ready => {
      expect(ready).toBe(true);
      done();
    })
  });

  it('verify length of selecteItems', () => {
    component.lmtAutocompleteParam =  {
      datasource:             [ {
        "id": 5,
        "name": "big data senior"

        },
        {
            "id": 6,
            "name": "big data confirmé"

        }
      ],
      attributeNameToDisplay: 'name',
      attributeNameForFilter: 'name',
      attributeNameKey:       'id',
    };
    component.componentReady.next(true);
    const inputElement = fixture.debugElement.query(By.css('input')); // Returns DebugElement
    console.log('inputElement',inputElement.nativeElement);
    inputElement.nativeElement.dispatchEvent(new Event('focusin'));
    inputElement.nativeElement.value = '';
    inputElement.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    const matOptions = document.querySelectorAll('mat-option');
    console.log('matOptions', matOptions)// liste vide
    expect(matOptions.length).toEqual(2);
  });

});
