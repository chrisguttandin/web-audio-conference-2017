/*
 * @todo The reflect polyfill is currently only needed to run the e2e tests. For some reason the e2e tests do not use the AoT compiler and
 * therefore need the polyfill.
 */
import 'core-js/es7/reflect'; // tslint:disable-line:no-submodule-imports
import 'zone.js/dist/zone';
