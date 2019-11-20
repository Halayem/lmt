import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserInformationComponent } from './user-registry/components/user-information.component';
import { UserProjectResolverService } from './user-registry/user-project/service/user-project-resolver.service';
import { UserExperianceComponent } from './user-registry/user-experiance/components/user-experiance.component';



const routes: Routes = [
  {
    path:       'user-information',
    component:  UserInformationComponent,
  },
  {
    path:       'user-experiance',
    component:  UserExperianceComponent,
    resolve: {
      data: UserProjectResolverService
      }
  },
  { path: '',
    redirectTo: '/user-information',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
