import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        loadChildren: () => import('./slides').then((mdl) => mdl.SlidesModule),
        path: 'slides'
    },
    {
        path: '',
        pathMatch: 'prefix',
        redirectTo: 'slides'
    }
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule {}
