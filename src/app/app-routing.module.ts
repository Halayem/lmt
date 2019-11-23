import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserInformationComponent } from './user-registry/components/user-information.component';
import { UserProjectResolverService } from './user-registry/user-project/service/user-project-resolver.service';
import { UserBasicInformationComponent } from './user-registry/user-basic-information/components/user-basic-information.component';
import { UserExperianceComponent } from './user-registry/user-experiance/components/user-experiance.component';

const routes: Routes = [
  {
    path:       'user-information',
    component:  UserInformationComponent,
    resolve: {
      data: UserProjectResolverService
      }
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
