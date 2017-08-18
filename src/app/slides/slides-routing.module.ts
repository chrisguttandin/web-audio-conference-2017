import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SlideOneComponent } from './slide-one/slide-one.component';
import { SlidesComponent } from './slides.component';

const routes: Routes = [
    {
        children: [
            {
                component: SlideOneComponent,
                path: '1'
            }, {
                path: '**',
                redirectTo: '1'
            }
        ],
        component: SlidesComponent,
        path: ''
    }
];

@NgModule({
    exports: [
        RouterModule
    ],
    imports: [
        RouterModule.forChild(routes)
    ]
})
export class SlidesRoutingModule { }
