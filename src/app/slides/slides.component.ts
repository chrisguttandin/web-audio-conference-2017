import { transition, trigger, useAnimation } from '@angular/animations';
import { ChangeDetectionStrategy, Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import 'rxjs/add/operator/filter';
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

    @HostBinding('@transition') public transition: { params: { enterTransform: string, leaveTransform: string }, value: number };

    private _activatedRoute: ActivatedRoute;

    private _index: number;

    private _router: Router;

    private _routerEventsSubscription: any;

    constructor (activatedRoute: ActivatedRoute, router: Router) {
        this._activatedRoute = activatedRoute;
        this._router = router;
    }

    public handleKeyUp (event: KeyboardEvent) {
        if ((event.code && event.code === 'ArrowLeft') || event.keyCode === 37) {
            this._goToPreviousSlide();
        } else if ((event.code && event.code === 'ArrowRight') || event.keyCode === 39) {
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
            .filter((routerEvent) => (routerEvent instanceof NavigationEnd))
            .subscribe(() => this._setIndexAndTransition());

        this._setIndexAndTransition();
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
