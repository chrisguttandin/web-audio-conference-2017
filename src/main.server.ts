import { provideZoneChangeDetection } from '@angular/core';
import { BootstrapContext, bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';

const bootstrap = (context: BootstrapContext) =>
    bootstrapApplication(AppComponent, { ...config, providers: [provideZoneChangeDetection(), ...config.providers] }, context);

// eslint-disable-next-line import/no-default-export
export default bootstrap;
