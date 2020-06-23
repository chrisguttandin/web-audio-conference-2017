import { animate, animation, group, query, style } from '@angular/animations';

// @todo For some reason the objects which define the styles can't be composed when using AoT.

export const slideAnimation = animation([
    group([
        query(
            ':enter',
            [
                style({
                    position: 'fixed',
                    top: '{{ top }}',
                    transform: '{{ enterTransform }}',
                    width: '{{ width }}'
                }),
                animate(
                    '{{ duration }} ease-in-out',
                    style({
                        position: 'fixed',
                        top: '{{ top }}',
                        transform: 'translateX(0%)',
                        width: '{{ width }}'
                    })
                )
            ],
            { optional: true }
        ),
        query(
            ':leave',
            [
                style({
                    position: 'fixed',
                    top: '{{ top }}',
                    transform: 'translateX(0%)',
                    width: '{{ width }}'
                }),
                animate(
                    '{{ duration }} ease-in-out',
                    style({
                        position: 'fixed',
                        top: '{{ top }}',
                        transform: '{{ leaveTransform }}',
                        width: '{{ width }}'
                    })
                )
            ],
            { optional: true }
        )
    ])
]);
