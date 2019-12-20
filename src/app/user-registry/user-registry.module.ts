import { UserInformationComponent } from "./components/user-information.component";
import { UserProjectComponent } from './user-project/components/user-project.component';
import { UserExperianceListComponent } from './user-experiance/user-experiance-list/user-experiance-list.component';
import { UserBasicInformationComponent } from './user-basic-information/components/user-basic-information.component';
import { UserExperianceComponent } from './user-experiance/components/user-experiance.component';
import { NgModule } from '@angular/core';
import { EmployeeService } from './user-basic-information/service/employee';
import { ProfileService } from './user-project/service/profile.service';
import { SkillService } from './user-project/service/skill.service';
import { UserProjectService } from './user-project/service/user-project.service';
import { LmtAutocompleteComponent } from '../shared/components/lmt-autocomplete/lmt-autocomplete.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxMaskModule } from 'ngx-mask';
import { BrowserModule } from '@angular/platform-browser';
import { NormalizeStringService } from '../shared/service/normalize-string.service';
import { UserProjectMapper } from './user-project/mapper/user-project';
import { MaterialModule } from '../material/material.module';
import { routing } from './user-registry.routes';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [
        UserInformationComponent,
        UserProjectComponent,
        UserExperianceListComponent,
        UserBasicInformationComponent,
        UserExperianceComponent,
        LmtAutocompleteComponent
    ],
    imports: [
        BrowserModule,
        TranslateModule,
        ReactiveFormsModule,
        NgxMaskModule.forRoot(),
        HttpClientModule,
        BsDatepickerModule.forRoot(),
        BrowserAnimationsModule,
        FormsModule,
        MaterialModule,
        AngularEditorModule,
        routing
    ],
    providers: [
        { provide: EmployeeService,         useClass: EmployeeService           },
        { provide: ProfileService,          useClass: ProfileService            },
        { provide: SkillService,            useClass: SkillService              },
        { provide: UserProjectService,      useClass: UserProjectService        },
        { provide: NormalizeStringService,  useClass: NormalizeStringService    },
        { provide: UserProjectMapper,       useClass: UserProjectMapper         }
    ],
    exports: [
        UserInformationComponent,
        RouterModule
    ]
})

export class UserRegistryModule {}
