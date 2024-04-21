import { ApplicationConfig } from '@angular/core';
import { HammerModule, provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideServiceWorker } from '@angular/service-worker';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
    providers: [
        provideAnimations(),
        provideClientHydration(),
        provideRouter(routes),
        provideServiceWorker('ngsw-worker.js', { enabled: !ngDevMode }),
        HammerModule
    ]
};
