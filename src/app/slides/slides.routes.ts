import { Routes } from '@angular/router';
import { SlideEightComponent } from './slide-eight/slide-eight.component';
import { SlideElevenComponent } from './slide-eleven/slide-eleven.component';
import { SlideFifteenComponent } from './slide-fifteen/slide-fifteen.component';
import { SlideFiveComponent } from './slide-five/slide-five.component';
import { SlideFourComponent } from './slide-four/slide-four.component';
import { SlideFourteenComponent } from './slide-fourteen/slide-fourteen.component';
import { SlideNineComponent } from './slide-nine/slide-nine.component';
import { SlideOneComponent } from './slide-one/slide-one.component';
import { SlideSevenComponent } from './slide-seven/slide-seven.component';
import { SlideSeventeenComponent } from './slide-seventeen/slide-seventeen.component';
import { SlideSixComponent } from './slide-six/slide-six.component';
import { SlideSixteenComponent } from './slide-sixteen/slide-sixteen.component';
import { SlideTenComponent } from './slide-ten/slide-ten.component';
import { SlideThirteenComponent } from './slide-thirteen/slide-thirteen.component';
import { SlideThreeComponent } from './slide-three/slide-three.component';
import { SlideTwelveComponent } from './slide-twelve/slide-twelve.component';
import { SlideTwoComponent } from './slide-two/slide-two.component';
import { SlidesComponent } from './slides.component';

export const routes: Routes = [
    {
        children: [
            {
                component: SlideOneComponent,
                path: '1'
            },
            {
                component: SlideTwoComponent,
                path: '2'
            },
            {
                component: SlideThreeComponent,
                path: '3'
            },
            {
                component: SlideFourComponent,
                path: '4'
            },
            {
                component: SlideFiveComponent,
                path: '5'
            },
            {
                component: SlideSixComponent,
                path: '6'
            },
            {
                component: SlideSevenComponent,
                path: '7'
            },
            {
                component: SlideEightComponent,
                path: '8'
            },
            {
                component: SlideNineComponent,
                path: '9'
            },
            {
                component: SlideTenComponent,
                path: '10'
            },
            {
                component: SlideElevenComponent,
                path: '11'
            },
            {
                component: SlideTwelveComponent,
                path: '12'
            },
            {
                component: SlideThirteenComponent,
                path: '13'
            },
            {
                component: SlideFourteenComponent,
                path: '14'
            },
            {
                component: SlideFifteenComponent,
                path: '15'
            },
            {
                component: SlideSixteenComponent,
                path: '16'
            },
            {
                component: SlideSeventeenComponent,
                path: '17'
            },
            {
                path: '**',
                redirectTo: '1'
            }
        ],
        component: SlidesComponent,
        path: ''
    }
];
