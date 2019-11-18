import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserInformationComponent } from './user-registry/components/user-information.component';
import { UserProjectResolverService } from './user-registry/user-project/service/user-project-resolver.service';



const routes: Routes = [
  {
    path:       'user-information',
    component:  UserInformationComponent,
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
