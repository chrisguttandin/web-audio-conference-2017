import { browser, by } from 'protractor';
import { elementShotMatchers, expectElementShot, resembleElementShot } from 'element-shot';

const IS_SMOKE_TEST = !!process.env.IS_SMOKE_TEST;

const navigateTo = (path: string) => {
    return browser.get((IS_SMOKE_TEST) ? `https://chrisguttandin.github.io/web-audio-conference-2017${ path }` : path);
}

describe('slides', () => {

    beforeEach(() => {
        jasmine.addMatchers(elementShotMatchers);
    });

    describe('first slide', () => {

        it('should look the same', async () => {
            navigateTo('/');

            const result = await resembleElementShot(by.tagName('body'), 'test/screenshots/slide-1');

            if (process.env.TRAVIS) {
                expectElementShot(result).toHaveMismatchWithinRange(3.2, 3.4);
            } else {
                expectElementShot(result).toBeRegressionFree();
            }
        });

        it('should look the same', async () => {
            navigateTo('/slides/1');

            const result = await resembleElementShot(by.tagName('body'), 'test/screenshots/slide-1');

            if (process.env.TRAVIS) {
                expectElementShot(result).toHaveMismatchWithinRange(3.2, 3.4);
            } else {
                expectElementShot(result).toBeRegressionFree();
            }
        });

    });

    describe('second slide', () => {

        it('should look the same', async () => {
            navigateTo('/slides/2');

            const result = await resembleElementShot(by.tagName('body'), 'test/screenshots/slide-2');

            if (process.env.TRAVIS) {
                expectElementShot(result).toHaveMismatchWithinRange(2.1, 2.3);
            } else {
                expectElementShot(result).toBeRegressionFree();
            }
        });

    });

    describe('third slide', () => {

        it('should look the same', async () => {
            navigateTo('/slides/3');

            const result = await resembleElementShot(by.tagName('body'), 'test/screenshots/slide-3');

            if (process.env.TRAVIS) {
                expectElementShot(result).toHaveMismatchWithinRange(1.3, 1.5);
            } else {
                expectElementShot(result).toBeRegressionFree();
            }
        });

    });

    describe('fourth slide', () => {

        it('should look the same', async () => {
            navigateTo('/slides/4');

            const result = await resembleElementShot(by.tagName('body'), 'test/screenshots/slide-4');

            if (process.env.TRAVIS) {
                expectElementShot(result).toHaveMismatchWithinRange(2.1, 2.3);
            } else {
                expectElementShot(result).toBeRegressionFree();
            }
        });

    });

    describe('fifth slide', () => {

        it('should look the same', async () => {
            navigateTo('/slides/5');

            const result = await resembleElementShot(by.tagName('body'), 'test/screenshots/slide-5');

            if (process.env.TRAVIS) {
                expectElementShot(result).toHaveMismatchWithinRange(3, 3.2);
            } else {
                expectElementShot(result).toBeRegressionFree();
            }
        });

    });

    describe('sixth slide', () => {

        it('should look the same', async () => {
            navigateTo('/slides/6');

            const result = await resembleElementShot(by.tagName('body'), 'test/screenshots/slide-6');

            if (process.env.TRAVIS) {
                expectElementShot(result).toHaveMismatchWithinRange(8.0, 8.2);
            } else {
                expectElementShot(result).toBeRegressionFree();
            }
        });

    });

    describe('seventh slide', () => {

        it('should look the same', async () => {
            navigateTo('/slides/7');

            const result = await resembleElementShot(by.tagName('body'), 'test/screenshots/slide-7');

            if (process.env.TRAVIS) {
                expectElementShot(result).toHaveMismatchWithinRange(4.2, 4.4);
            } else {
                expectElementShot(result).toBeRegressionFree();
            }
        });

    });

    describe('eighth slide', () => {

        it('should look the same', async () => {
            navigateTo('/slides/8');

            const result = await resembleElementShot(by.tagName('body'), 'test/screenshots/slide-8');

            if (process.env.TRAVIS) {
                expectElementShot(result).toHaveMismatchWithinRange(8.0, 8.2);
            } else {
                expectElementShot(result).toBeRegressionFree();
            }
        });

    });

    describe('nineth slide', () => {

        it('should look the same', async () => {
            navigateTo('/slides/9');

            const result = await resembleElementShot(by.tagName('body'), 'test/screenshots/slide-9');

            if (process.env.TRAVIS) {
                expectElementShot(result).toHaveMismatchWithinRange(3.8, 4);
            } else {
                expectElementShot(result).toBeRegressionFree();
            }
        });

    });

    describe('tenth slide', () => {

        it('should look the same', async () => {
            navigateTo('/slides/10');

            const result = await resembleElementShot(by.tagName('body'), 'test/screenshots/slide-10');

            if (process.env.TRAVIS) {
                expectElementShot(result).toHaveMismatchWithinRange(3.1, 3.3);
            } else {
                expectElementShot(result).toBeRegressionFree();
            }
        });

    });

    describe('eleventh slide', () => {

        it('should look the same', async () => {
            navigateTo('/slides/11');

            const result = await resembleElementShot(by.tagName('body'), 'test/screenshots/slide-11');

            if (process.env.TRAVIS) {
                expectElementShot(result).toHaveMismatchWithinRange(6.2, 6.4);
            } else {
                expectElementShot(result).toBeRegressionFree();
            }
        });

    });

    describe('twelveth slide', () => {

        it('should look the same', async () => {
            navigateTo('/slides/12');

            const result = await resembleElementShot(by.tagName('body'), 'test/screenshots/slide-12');

            if (process.env.TRAVIS) {
                expectElementShot(result).toHaveMismatchWithinRange(3.9, 4.1);
            } else {
                expectElementShot(result).toBeRegressionFree();
            }
        });

    });

    describe('thirteenth slide', () => {

        it('should look the same', async () => {
            navigateTo('/slides/13');

            const result = await resembleElementShot(by.tagName('body'), 'test/screenshots/slide-13');

            if (process.env.TRAVIS) {
                expectElementShot(result).toHaveMismatchWithinRange(3.1, 3.3);
            } else {
                expectElementShot(result).toBeRegressionFree();
            }
        });

    });

    describe('fourteenth slide', () => {

        it('should look the same', async () => {
            navigateTo('/slides/14');

            const result = await resembleElementShot(by.tagName('body'), 'test/screenshots/slide-14');

            if (process.env.TRAVIS) {
                expectElementShot(result).toHaveMismatchWithinRange(1.7, 1.9);
            } else {
                expectElementShot(result).toBeRegressionFree();
            }
        });

    });

    describe('fifteenth slide', () => {

        it('should look the same', async () => {
            navigateTo('/slides/15');

            const result = await resembleElementShot(by.tagName('body'), 'test/screenshots/slide-15');

            if (process.env.TRAVIS) {
                expectElementShot(result).toHaveMismatchWithinRange(1.8, 2);
            } else {
                expectElementShot(result).toBeRegressionFree();
            }
        });

    });

    describe('sixteenth slide', () => {

        it('should look the same', async () => {
            navigateTo('/slides/16');

            const result = await resembleElementShot(by.tagName('body'), 'test/screenshots/slide-16');

            if (process.env.TRAVIS) {
                expectElementShot(result).toHaveMismatchWithinRange(2.9, 3.1);
            } else {
                expectElementShot(result).toBeRegressionFree();
            }
        });

    });

    describe('seventeenth slide', () => {

        it('should look the same', async () => {
            navigateTo('/slides/17');

            const result = await resembleElementShot(by.tagName('body'), 'test/screenshots/slide-17');

            if (process.env.TRAVIS) {
                expectElementShot(result).toHaveMismatchWithinRange(2.6, 2.8);
            } else {
                expectElementShot(result).toBeRegressionFree();
            }
        });

    });

});
