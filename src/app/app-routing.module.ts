import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserInformationComponent } from './user-registry/components/user-information.component';



const routes: Routes = [
  {
    path:       'user-information',
    component:  UserInformationComponent
  },
  {
    path: '**',
    redirectTo: '/user-information'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
