import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LmtAutocompleteComponent } from './lmt-autocomplete.component';

describe('LmtAutocompleteComponent', () => {
  let component: LmtAutocompleteComponent;
  let fixture: ComponentFixture<LmtAutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
