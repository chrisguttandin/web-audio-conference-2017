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
    },
    {
        children: [
            {
                loadComponent: () => import('./slides/slide-one/slide-one.component').then(({ SlideOneComponent }) => SlideOneComponent),
                path: ''
            }
        ],
        loadComponent: () => import('./slides/slides.component').then(({ SlidesComponent }) => SlidesComponent),
        path: ''
    }
];
