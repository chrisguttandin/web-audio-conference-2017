import 'core-js/es7/reflect'; // tslint:disable-line:ordered-imports
import { APP_BASE_HREF } from '@angular/common'; // tslint:disable-line:ordered-imports
import { TestBed, async } from '@angular/core/testing';
import { AppComponent, AppModule } from '../../src/app';

describe('AppComponent', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                AppModule
            ],
            providers: [ {
                provide: APP_BASE_HREF,
                useValue : '/'
            } ]
        });
    });

    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;

        expect(app).toBeTruthy();
    }));

    it('should render the router-outlet', async(() => {
        const fixture = TestBed.createComponent(AppComponent);

        fixture.detectChanges();

        const compiled = fixture.debugElement.nativeElement;

        expect(compiled.querySelector('router-outlet')).toBeTruthy();
    }));

});
