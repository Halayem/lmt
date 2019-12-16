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
    let comp = new LmtAutocompleteComponent();
    comp.lmtAutocompleteParam =  {
      datasource:             [],
      attributeNameToDisplay: 'name',
      attributeNameForFilter: 'name',
      attributeNameKey:       'id',
    };
    comp.componentReady.subscribe(ready => {
      expect(ready).toBe(true);
      done();
    })
  });

  it('verify length of selecteItems', () => {
    let comp = new LmtAutocompleteComponent();
    comp.lmtAutocompleteParam =  {
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
    comp.componentReady.next(true);
    fixture.detectChanges();
    const trigger = fixture.debugElement.query(By.css('.test'))
  
    
    console.log('trigger', trigger);
    console.log('trigger2', fixture.debugElement.query(By.css('.test')));
    trigger.nativeElement.click();

    expect(comp.selectedItems.length).toEqual(3)
    comp.selectedItem;
    expect(comp.selectedItems.length).toEqual(2)
    comp.removeItem;
    expect(comp.selectedItems.length).toEqual(1)

  });

});
