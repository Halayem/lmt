import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserInformationComponent } from './user-registry/components/user-information.component';
import { UserBasicInformationComponent } from './user-registry/user-basic-information/components/user-basic-information.component';
import { UserExperianceComponent } from './user-registry/user-experiance/components/user-experiance.component';
import { UserProjectComponent } from './user-registry/user-project/components/user-project.component';

const routes: Routes = [
  {
    path:       'user-project',
    component:  UserProjectComponent,
  },
  {
    path:       'user-information',
    component:  UserInformationComponent,
  },
  {
    path:       'user-experiance',
    component:  UserExperianceComponent
  },
  {
    path: 'user-basic-information',
    component: UserBasicInformationComponent
  },
  {
    path: 'user-experiences',
    component: UserExperianceComponent
  }
   
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
