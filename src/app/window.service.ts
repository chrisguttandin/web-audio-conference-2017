import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class WindowService {

    get nativeWindow (): null | Window {
        return (typeof window === 'undefined') ? null : window;
    }

}
