import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LmtAutocompleteComponent } from './lmt-autocomplete.component';
import { MaterialModule } from 'src/app/material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

describe('LmtAutocompleteComponent', () => {
  let component: LmtAutocompleteComponent;
  let fixture: ComponentFixture<LmtAutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [        
        MaterialModule,
        ReactiveFormsModule,
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
});
