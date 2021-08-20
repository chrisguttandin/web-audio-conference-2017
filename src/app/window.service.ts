import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class WindowService {
    // eslint-disable-next-line class-methods-use-this
    public get nativeWindow(): null | Window {
        return typeof window === 'undefined' ? null : window;
    }
}
