import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        children: [
            {
                loadChildren: () => import('./slides'),
                path: 'slides'
            },
            {
                path: '**',
                redirectTo: 'slides'
            }
        ],
        path: '',
        pathMatch: 'prefix'
    }
];
