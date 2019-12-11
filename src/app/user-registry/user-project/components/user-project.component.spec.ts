import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProjectComponent } from './user-project.component';
import { MaterialModule } from 'src/app/material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { LmtAutocompleteComponent } from 'src/app/shared/components/lmt-autocomplete/lmt-autocomplete.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('UserProjectComponent', () => {
  let component: UserProjectComponent;
  let fixture: ComponentFixture<UserProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [   
        HttpClientTestingModule,     
        MaterialModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
        FormsModule,
        AngularEditorModule,
      ],
      declarations: [ UserProjectComponent, LmtAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
