import { env } from 'process';
import { browser, by, element } from 'protractor';
import { promise } from 'selenium-webdriver'; // tslint:disable-line:no-implicit-dependencies

const IS_SMOKE_TEST = !!env.IS_SMOKE_TEST;

export class HomePage {

    public getHeadline (): promise.Promise<string> {
        return element(by.css('wac-app h1')).getText();
    }

    public getSubHeadline (): promise.Promise<string> {
        return element(by.css('wac-app h2:first-child')).getText();
    }

    public navigateTo (): promise.Promise<any> {
        return browser.get((IS_SMOKE_TEST) ? 'https://chrisguttandin.github.io/web-audio-conference-2017' : '/');
    }

}
