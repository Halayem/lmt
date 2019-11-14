import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserInformationComponent } from './user-registry/components/user-information.component';
import { UserBasicInformationComponent } from './user-registry/user-basic-information/components/user-basic-information.component';



const routes: Routes = [
  {
    path:       'user-information',
    component:  UserInformationComponent
  },
  {
    path: 'user-basic-information',
    component: UserBasicInformationComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
