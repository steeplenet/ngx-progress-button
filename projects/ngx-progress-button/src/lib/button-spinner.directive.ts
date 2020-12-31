import { Directive, ElementRef, Input, ComponentFactoryResolver, ViewContainerRef, Renderer2 } from '@angular/core';
import { MatButton, MatSpinner } from '@angular/material';
import { ProgressIndicatorDirective } from './progress-indicator-directive';

@Directive({
    // tslint:disable-next-line: directive-selector
    selector: '[buttonSpinner]'
})
export class ButtonSpinnerDirective extends ProgressIndicatorDirective {
    @Input() set buttonSpinner(show: boolean) {
        this.toggle(show);
    }

    constructor(
        hostElementRef: ElementRef,
        componentFactoryResolver: ComponentFactoryResolver,
        viewContainerRef: ViewContainerRef,
        renderer: Renderer2,
        hostButton: MatButton
    ) {
        super(
            hostElementRef,
            componentFactoryResolver.resolveComponentFactory(MatSpinner),
            viewContainerRef,
            renderer,
            hostButton,
            'spinner');
    }

    setOptions(progressIndicator: MatSpinner) {
        progressIndicator.mode = 'indeterminate';
        progressIndicator.color = 'primary';
        progressIndicator.diameter = 19;
    }
}
