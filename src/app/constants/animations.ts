import { trigger, transition, style, animate, state, query, animateChild, group } from '@angular/animations';

export const cameraAnimations = [
  trigger('photoSaved', [
    transition(':increment', [
      style({ opacity: 0, transform: 'scale(0)' }), animate('150ms', style({opacity: 1, transform: 'scale(1)'}))
    ]),
    transition(':enter', [
      style({ opacity: 0, transform: 'scale(0)' }), animate('200ms', style({opacity: 1, transform: 'scale(1)'}))
    ])
  ]),
  trigger('lens', [
    state('active', style({
      background: 'transparent'
    })),
    state('idle', 
    style({
      background: 'black'
    })),
    transition('active <=> idle', [
      group([
        query('@feed', animateChild()),
      ])
    ])
  ]),
  trigger('feed', [
    state('idle', style({ filter: 'blur(5px)' })),
    transition('* <=> *', [
      animate('500ms 600ms cubic-bezier(0.16,1,0.3,1)')
    ])
  ])
]

export const cameraRollAnimations = [
  trigger('roll', [
    transition(':enter', [
      style({ opacity: 0 }), animate('500ms cubic-bezier(0.16,1,0.3,1)', style({ opacity: 1 }))
    ]),
    transition(':leave', [
      style({ opacity: 1 }), animate('300ms 500ms ease-out', style({ opacity: 0 }))
    ])
  ]),
]