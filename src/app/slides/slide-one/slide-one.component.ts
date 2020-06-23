import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./slide-one.component.css'],
    templateUrl: './slide-one.component.html'
})
export class SlideOneComponent {}
