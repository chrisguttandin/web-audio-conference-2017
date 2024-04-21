import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'wac-slide-two',
    standalone: true,
    templateUrl: './slide-two.component.html'
})
export class SlideTwoComponent {}
