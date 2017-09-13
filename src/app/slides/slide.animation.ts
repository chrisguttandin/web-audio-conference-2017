import { animate, animation, group, query, style } from '@angular/animations';

// @todo For some reason the objects which define the styles can't be composed when using AoT.

export const slideAnimation = animation([
    group([
        query(':enter', [
            style({
                position: 'fixed',
                top: 0,
                transform: '{{ enterTransform }}',
                width: 'calc(100% - 8vmin)'
            }),
            animate('0.5s ease-in-out', style({
                position: 'fixed',
                top: 0,
                transform: 'translateX(0%)',
                width: 'calc(100% - 8vmin)'
            }))
        ], { optional: true }),
        query(':leave', [
            style({
                position: 'fixed',
                top: 0,
                transform: 'translateX(0%)',
                width: 'calc(100% - 8vmin)'
            }),
            animate('0.5s ease-in-out', style({
                position: 'fixed',
                top: 0,
                transform: '{{ leaveTransform }}',
                width: 'calc(100% - 8vmin)'
            }))
        ], { optional: true })
    ])
]);
