import { env } from 'process';
import { browser, by, element } from 'protractor';
import { promise } from 'selenium-webdriver'; // tslint:disable-line:no-implicit-dependencies

export class HomePage {
    public getHeadline(): promise.Promise<string> {
        return element(by.css('wac-app h1')).getText();
    }

    public getSubHeadline(): promise.Promise<string> {
        return element(by.css('wac-app h2:first-child')).getText();
    }

    public navigateTo(): promise.Promise<any> {
        return browser.get(env.IS_SMOKE_TEST === 'true' ? '/web-audio-conference-2017' : '/');
    }
}
