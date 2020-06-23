import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Input,
    OnChanges,
    Renderer2,
    SimpleChanges,
    ViewChild
} from '@angular/core';
import * as Prism from 'prismjs';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'wac-prism',
    styleUrls: ['./prism.component.css'],
    templateUrl: './prism.component.html'
})
export class PrismComponent implements AfterViewInit, OnChanges {
    @Input() public readonly language!: string;

    @ViewChild('element', { static: true }) private _element!: ElementRef;

    constructor(private _renderer2: Renderer2) {}

    public ngAfterViewInit(): void {
        Prism.highlightElement(this._element.nativeElement, false);
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes.language !== undefined) {
            const change = changes.language;

            if (!change.firstChange) {
                this._renderer2.removeClass(this._element.nativeElement, `language-${change.previousValue}`);
            }

            this._renderer2.addClass(this._element.nativeElement, `language-${change.currentValue}`);

            if (!change.firstChange) {
                Prism.highlightElement(this._element.nativeElement, false);
            }
        }
    }
}
