import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PrismComponent } from '../prism/prism.component';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [PrismComponent],
    selector: 'wac-slide-four',
    styleUrls: ['./slide-four.component.scss'],
    templateUrl: './slide-four.component.html'
})
export class SlideFourComponent {}
