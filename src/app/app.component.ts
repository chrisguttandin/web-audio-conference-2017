import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'wac-app',
    templateUrl: './app.component.html'
})
export class AppComponent { }
