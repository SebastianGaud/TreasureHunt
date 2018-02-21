import {
    animate, state, transition, trigger, style, query,
    stagger, AnimationEvent, animateChild, group
} from "@angular/animations";



export class Animations {

    private static duration = 400;



    static Stagger = trigger('stagger', [
        transition('* => *', [
            query(':enter', stagger("75ms", [animateChild()]), { optional: true })
        ])
    ]);

    static TranslateFromTop = trigger('translateFromTop', [
        transition(':enter', [
            style({ opacity: 0, transform: "translateY(-30%)" }),
            animate(Animations.duration + "ms", style({ opacity: 1, transform: "translateY(0)" }))
        ])

    ]);

    static TranslateFromBottom = trigger('translateFromBottom', [
        transition(':enter', [
            style({ opacity: 0, transform: "translateY(+30%)" }),
            animate(Animations.duration + "ms", style({ opacity: 1, transform: "translateY(0)" }))
        ])

    ]);

    static TranslateFromLeft = trigger('translateFromLeft', [
        transition(':enter', [
            style({ transform: "translateX(-50px)", opacity: 0 }),
            animate(Animations.duration + "ms ease")])
    ]);

    static TranslateFromRight = trigger('translateFromRight', [
        transition(':enter', [
            style({ opacity: 0, transform: "translateX(50px)" }),
            animate(Animations.duration + "ms", style({ opacity: 1, transform: "translateX(0)" }))
        ])

    ]);

    static Fade = trigger('fade', [
        transition(':enter', [
            style({ opacity: 0 }),
            animate(Animations.duration + "ms", style({ opacity: 1 }))
        ])

    ]);

    static Dummy = trigger('dummy', []);
}