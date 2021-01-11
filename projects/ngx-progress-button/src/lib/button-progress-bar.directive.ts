import { Directive, Input, ElementRef, ComponentFactoryResolver, ViewContainerRef, Renderer2, OnDestroy, Optional } from '@angular/core';
import { ProgressIndicatorDirective } from './progress-indicator-directive';
import { MatButton } from '@angular/material/button';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { ThemePalette } from '@angular/material/core';
import { ProgressIndicatorType } from './progress-indicator.component';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[buttonProgressBar]'
})
export class ButtonProgressBarDirective extends ProgressIndicatorDirective implements OnDestroy {

    constructor(
        hostElementRef: ElementRef,
        componentFactoryResolver: ComponentFactoryResolver,
        viewContainerRef: ViewContainerRef,
        renderer: Renderer2,
        @Optional() matButton: MatButton
    ) {
        super(hostElementRef, renderer, matButton);

        this.loadComponent(componentFactoryResolver, viewContainerRef);
        this.progressComponent.indicatorType = ProgressIndicatorType.ProgressBar;
        this.progressComponent.mode = "indeterminate";
        this.setHostElementStyle();
    }

    @Input() set buttonProgressBar(show: boolean) {
        this.toggle(show);
    }

    @Input() set disableWhenLoading(value: boolean) {
        this.manageButton = value;
    }

    @Input() set buttonProgressBarColor(value: ThemePalette) {
        this.progressComponent.color = value;
    }

    @Input() set buttonProgressBarMode(value: ProgressBarMode) {
        this.progressComponent.mode = value;
    }

    @Input() set buttonProgressBarValue(value: number) {
        this.progressComponent.value = value;
    }

    @Input() set buttonProgressBarBufferValue(value: number) {
        this.progressComponent.bufferValue = value;
    }
}
