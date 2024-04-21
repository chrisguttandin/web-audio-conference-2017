import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        loadChildren: () => import('./slides'),
        path: 'slides'
    },
    {
        path: '',
        pathMatch: 'prefix',
        redirectTo: 'slides'
    }
];
