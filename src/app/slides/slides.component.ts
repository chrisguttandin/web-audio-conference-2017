import { transition, trigger, useAnimation } from '@angular/animations';
import { ChangeDetectionStrategy, Component, HostBinding, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { slideAnimation } from './slide.animation';

@Component({
    animations: [
        trigger('transition', [
            transition('* => *', [
                useAnimation(slideAnimation)
            ])
        ])
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: [ './slides.component.css' ],
    templateUrl: './slides.component.html'
})
export class SlidesComponent implements OnDestroy, OnInit {

    @HostBinding('@transition') public transition!: { params: { enterTransform: string, leaveTransform: string }, value: number };

    private _activatedRoute: ActivatedRoute;

    private _index: number;

    private _router: Router;

    private _routerEventsSubscription: any;

    constructor (activatedRoute: ActivatedRoute, router: Router) {
        this._activatedRoute = activatedRoute;
        this._index = 0;
        this._router = router;
    }

    @HostListener('document:keyup', [ '$event' ]) public handleKeyUp (event: KeyboardEvent) {
        if ((event.code && event.code === 'ArrowLeft') ||
            // The keyCode property is deprecated but it should be fine to use it here as it is only used as a fallback.
            event.keyCode === 37 // tslint:disable-line:deprecation
        ) {
            this._goToPreviousSlide();
        } else if ((event.code && event.code === 'ArrowRight') ||
            // The keyCode property is deprecated but it should be fine to use it here as it is only used as a fallback.
            event.keyCode === 39 // tslint:disable-line:deprecation
        ) {
            this._goToNextSlide();
        }
    }

    public handleSwipeLeft () {
        this._goToNextSlide();
    }

    public handleSwipeRight () {
        this._goToPreviousSlide();
    }

    public ngOnDestroy () {
        this._routerEventsSubscription.unsubscribe();
    }

    public ngOnInit () {
        this._routerEventsSubscription = this._router.events
            .pipe(
                filter((routerEvent) => (routerEvent instanceof NavigationEnd))
            )
            .subscribe(() => this._setIndexAndTransition()); // tslint:disable-line:rxjs-prefer-async-pipe

        const activatedChildRoute = this._activatedRoute.firstChild;

        if (activatedChildRoute !== null) {
            const index = parseInt(activatedChildRoute.snapshot.url[0].path, 10);

            this._index = index;
            this.transition = { params: { enterTransform: 'none', leaveTransform: 'none' }, value: index };
        }
    }

    private _goToNextSlide () {
        if (this._index < 17) {
            this._router.navigate([ `${ this._index + 1 }` ], { relativeTo: this._activatedRoute });
        }
    }

    private _goToPreviousSlide () {
        if (this._index > 1) {
            this._router.navigate([ `${ this._index - 1 }` ], { relativeTo: this._activatedRoute });
        }
    }

    private _setIndexAndTransition () {
        const activatedChildRoute = this._activatedRoute.firstChild;

        if (activatedChildRoute !== null) {
            const newIndex = parseInt(activatedChildRoute.snapshot.url[0].path, 10);
            const direction = (newIndex > this._index) ? 'forwards' : 'backwards';

            this._index = newIndex;
            this.transition = {
                params: {
                    enterTransform: (direction === 'forwards') ? 'translateX(100%)' : 'translateX(-100%)',
                    leaveTransform: (direction === 'forwards') ? 'translateX(-100%)' : 'translateX(100%)'
                },
                value: newIndex
            };
        }
    }

}
