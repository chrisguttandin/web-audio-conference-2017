import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './slide-two.component.html'
})
export class SlideTwoComponent {}
