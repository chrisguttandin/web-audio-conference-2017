import { env } from 'process';
import { expect, test } from '@playwright/test';

test.use({ viewport: { height: 768, width: 1024 } });

for (let slide = 1; slide < 18; slide += 1) {
    test.describe(`slide ${slide}`, () => {
        let name: string;
        let path: string;

        test.beforeEach(async ({ page }) => {
            name = `slide-${slide}-should-look-the-same-1.png`;
            path = `./slides/${slide}`;

            await page.emulateMedia({ reducedMotion: 'reduce' });
        });

        test('should look the same', async ({ page }) => {
            await page.goto(path);

            await expect(page).toHaveScreenshot(name, {
                fullPage: true
            });
        });

        test.describe('when offline', () => {
            test.beforeEach(async ({ context, page }) => {
                test.skip(env.IS_SMOKE_TEST !== 'true', 'This test only works with an installed Service Worker.');

                await page.goto(path);
                await page.evaluate(() => navigator.serviceWorker.ready);
                await context.setOffline(true);
            });

            test('should look the same', async ({ browserName, page }) => {
                if (browserName === 'chromium') {
                    await page.goto(path);

                    expect(await page.evaluate(() => navigator.serviceWorker.getRegistration())).toBeDefined();

                    await expect(page).toHaveScreenshot(name, {
                        fullPage: true
                    });
                }
            });
        });

        test.describe('without JavaScript', () => {
            test.use({ javaScriptEnabled: false });

            test('should look the same', async ({ browserName, page }) => {
                await page.goto(path);

                if (browserName !== 'firefox') {
                    expect(await page.evaluate(() => navigator.serviceWorker.getRegistration())).toBeUndefined();
                }

                await expect(page).toHaveScreenshot(name, {
                    fullPage: true
                });
            });
        });

        test.describe('without font synthesis', () => {
            test('should look the same', async ({ browserName, page }) => {
                await page.goto(path);
                await page.locator('html').evaluate(({ style }) => (style.fontSynthesis = 'none'));

                if (browserName === 'chromium' && [4, 5, 6, 7, 8, 9, 10, 11, 12].includes(slide)) {
                    await expect(page).not.toHaveScreenshot(name, {
                        fullPage: true
                    });
                    await expect(page).toHaveScreenshot(`slide-${slide}-without-font-synthesis-should-look-the-same-1.png`, {
                        fullPage: true
                    });
                } else {
                    await expect(page).toHaveScreenshot(name, {
                        fullPage: true
                    });
                }
            });
        });
    });
}
