import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PrismComponent } from '../prism/prism.component';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [PrismComponent],
    selector: 'wac-slide-ten',
    standalone: true,
    templateUrl: './slide-ten.component.html'
})
export class SlideTenComponent {}
