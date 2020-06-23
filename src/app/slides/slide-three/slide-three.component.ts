import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './slide-three.component.html'
})
export class SlideThreeComponent {}
