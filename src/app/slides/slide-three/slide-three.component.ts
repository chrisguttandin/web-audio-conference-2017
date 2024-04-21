import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'wac-slide-three',
    standalone: true,
    templateUrl: './slide-three.component.html'
})
export class SlideThreeComponent {}
