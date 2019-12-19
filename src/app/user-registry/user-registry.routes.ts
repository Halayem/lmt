import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserInformationComponent } from './components/user-information.component';

export const routes: Routes = [
    {
        path:       'user-information',
        component:  UserInformationComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild( routes );
