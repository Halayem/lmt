import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

const routes: Routes = [];
export const routing: ModuleWithProviders = RouterModule.forRoot( routes, {
    useHash: false
});
