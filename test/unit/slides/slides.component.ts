import { BehaviorSubject } from 'rxjs';
import { SlidesComponent } from '../../../src/app/slides';

describe('SlidesComponent', () => {

    let activatedRoute: any;

    let router: any;

    let slidesComponent: SlidesComponent;

    beforeEach(() => {
        activatedRoute = {
            firstChild: {
                snapshot: {
                    url: [ {
                        path: '8'
                    } ]
                }
            }
        };

        router = {
            events: new BehaviorSubject('a fake router event'),
            navigate (): void {} // tslint:disable-line:no-empty
        };

        spyOn(router, 'navigate').and.callThrough();

        slidesComponent = new SlidesComponent(activatedRoute, router, { nativeWindow: null });
    });

    describe('handleKeyUp()', () => {

        beforeEach(() => {
            slidesComponent.ngOnInit();
        });

        it('should navigate to the previous slide', () => {
            const keyboardEvent = new KeyboardEvent('keyup', { code: 'ArrowLeft' });

            slidesComponent.handleKeyUp(keyboardEvent);

            expect(router.navigate).toHaveBeenCalledWith([ '7' ], { relativeTo: activatedRoute });
        });

        it('should navigate to the previous slide', () => {
            // @todo Constructing a real KeyboardEvent with a given keyCode seems to be impossible.
            slidesComponent.handleKeyUp(<KeyboardEvent> { keyCode: 37 });

            expect(router.navigate).toHaveBeenCalledWith([ '7' ], { relativeTo: activatedRoute });
        });

        it('should navigate to the next slide', () => {
            const keyboardEvent = new KeyboardEvent('keyup', { code: 'ArrowRight' });

            slidesComponent.handleKeyUp(keyboardEvent);

            expect(router.navigate).toHaveBeenCalledWith([ '9' ], { relativeTo: activatedRoute });
        });

        it('should navigate to the next slide', () => {
            // @todo Constructing a real KeyboardEvent with a given keyCode seems to be impossible.
            slidesComponent.handleKeyUp(<KeyboardEvent> { keyCode: 39 });

            expect(router.navigate).toHaveBeenCalledWith([ '9' ], { relativeTo: activatedRoute });
        });

    });

    describe('handleSwipeLeft()', () => {

        beforeEach(() => {
            slidesComponent.ngOnInit();
        });

        it('should navigate to the next slide', () => {
            slidesComponent.handleSwipeLeft();

            expect(router.navigate).toHaveBeenCalledWith([ '9' ], { relativeTo: activatedRoute });
        });

    });

    describe('handleSwipeRight()', () => {

        beforeEach(() => {
            slidesComponent.ngOnInit();
        });

        it('should navigate to the previous slide', () => {
            slidesComponent.handleSwipeRight();

            expect(router.navigate).toHaveBeenCalledWith([ '7' ], { relativeTo: activatedRoute });
        });

    });

});
