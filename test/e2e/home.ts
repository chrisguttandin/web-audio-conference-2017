import { test, expect, ConsoleMessage } from '@playwright/test';
import { Home } from './home.po';

let home: Home;
let removeListener: () => ConsoleMessage[];

test.afterEach(() => {
    const consoleMessages = removeListener();
    const severeConsoleMessages = consoleMessages.filter(
        (consoleMessage) => !['debug', 'info', 'log', 'warning'].includes(consoleMessage.type())
    );

    // eslint-disable-next-line no-console
    severeConsoleMessages.forEach((consoleMessage) => console.log(`${consoleMessage.type()}: ${consoleMessage.text()}`));

    expect(severeConsoleMessages).toEqual([]);
});

test.beforeEach(async ({ page }) => {
    const consoleMessages: ConsoleMessage[] = [];
    const listener = (consoleMessage) => consoleMessages.push(consoleMessage);

    page.addListener('console', listener);

    removeListener = () => {
        page.removeListener('console', listener);

        return consoleMessages;
    };

    home = new Home(page);

    await home.navigateTo();
});

test('should display the correct headline', async () => {
    await expect(home.getHeadline()).toHaveText('Noiseless Web Audio tests');
});

test('should go to the first slide', async ({ page }) => {
    await expect(page).toHaveURL(/\/slides\/1$/);
});

test('should go to the next slide when using the arrow key', async ({ page }) => {
    await page.waitForURL(/\/slides\/1$/);
    await page.keyboard.press('ArrowRight');
    await page.waitForURL(/\/slides\/2$/);

    await expect(home.getSubHeadline()).toHaveText('About me');
});

test('should go to the next slide when using a swipe gesture', async ({ page }) => {
    await page.waitForURL(/\/slides\/1$/);

    const boundingBox = await home.getAppComponent().boundingBox();

    if (boundingBox === null) {
        throw new Error("Can't get bounding box.");
    }

    const left = boundingBox.x + 10;
    const right = boundingBox.x + (boundingBox.height * 4) / 3 - 10;
    const y = boundingBox.y + boundingBox.height / 2;

    await page.mouse.move(right, y);
    await page.mouse.down();
    await page.mouse.move(left, y);
    await page.mouse.up();
    await page.waitForURL(/\/slides\/2$/);

    await expect(home.getSubHeadline()).toHaveText('About me');
});
