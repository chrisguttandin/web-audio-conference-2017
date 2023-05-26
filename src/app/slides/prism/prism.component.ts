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
    styleUrls: ['./prism.component.scss'],
    templateUrl: './prism.component.html'
})
export class PrismComponent implements AfterViewInit, OnChanges {
    @Input() public language!: string;

    @ViewChild('element', { static: true }) private _element!: ElementRef;

    constructor(private _renderer2: Renderer2) {}

    public ngAfterViewInit(): void {
        Prism.highlightElement(this._element.nativeElement, false);
    }

    public ngOnChanges({ language }: SimpleChanges): void {
        if (language !== undefined) {
            if (!language.firstChange) {
                this._renderer2.removeClass(this._element.nativeElement, `language-${language.previousValue}`);
            }

            this._renderer2.addClass(this._element.nativeElement, `language-${language.currentValue}`);

            if (!language.firstChange) {
                Prism.highlightElement(this._element.nativeElement, false);
            }
        }
    }
}
