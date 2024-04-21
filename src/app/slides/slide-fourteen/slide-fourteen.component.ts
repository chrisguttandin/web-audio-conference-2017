import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'wac-slide-fourteen',
    standalone: true,
    templateUrl: './slide-fourteen.component.html'
})
export class SlideFourteenComponent {}
