import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PrismComponent } from './prism/prism.component';
import { SlideOneComponent } from './slide-one/slide-one.component';
import { SlidesRoutingModule } from './slides-routing.module';
import { SlidesComponent } from './slides.component';

@NgModule({
    declarations: [
        PrismComponent,
        SlideOneComponent,
        SlidesComponent
    ],
    imports: [
        CommonModule,
        SlidesRoutingModule
    ]
})
export class SlidesModule { }
