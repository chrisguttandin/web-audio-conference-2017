import { browser, by, element } from 'protractor';

const IS_SMOKE_TEST = !!process.env.IS_SMOKE_TEST;

export class HomePage {

    public getHeadline () {
        return element(by.css('wac-app h1')).getText();
    }

    public getSubHeadline () {
        return element(by.css('wac-app h2')).getText();
    }

    public navigateTo () {
        return browser.get((IS_SMOKE_TEST) ? 'https://chrisguttandin.github.io/web-audio-conference-2017' : '/');
    }

}
