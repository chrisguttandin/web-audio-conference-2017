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
            navigate () {} // tslint:disable-line:no-empty
        };

        spyOn(router, 'navigate').and.callThrough();

        slidesComponent = new SlidesComponent(activatedRoute, router);
    });

});
