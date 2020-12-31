import { Directive, Input, ElementRef, ComponentFactoryResolver, ViewContainerRef, Renderer2 } from '@angular/core';
import { ProgressIndicatorDirective } from './progress-indicator-directive';
import { MatButton, MatProgressBar } from '@angular/material';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[buttonProgressBar]'
})
export class ButtonProgressBarDirective extends ProgressIndicatorDirective {
    @Input() set buttonProgressBar(show: boolean) {
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
            componentFactoryResolver.resolveComponentFactory(MatProgressBar),
            viewContainerRef,
            renderer,
            hostButton,
            'spinner');
    }

    protected setOptions(progressIndicator: MatProgressBar) {
        progressIndicator.mode = 'indeterminate';
        progressIndicator.color = 'primary';
    }
}
