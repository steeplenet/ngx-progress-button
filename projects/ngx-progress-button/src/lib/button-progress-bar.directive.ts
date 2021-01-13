import {
    Directive,
    Input,
    ElementRef,
    ComponentFactoryResolver,
    ViewContainerRef,
    Renderer2,
    OnDestroy,
    Optional
} from '@angular/core';
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

    @Input('buttonProgressBarDisableHost') set disableHost(value: boolean) {
        this.disableHostButton = value;
    }

    @Input('buttonProgressBarColor') set color(value: ThemePalette) {
        this.progressComponent.color = value;
    }

    @Input('buttonProgressBarMode') set mode(value: ProgressBarMode) {
        this.progressComponent.mode = value;
    }

    @Input('buttonProgressBarValue') set value(value: number) {
        this.progressComponent.value = value;
    }

    @Input('buttonProgressBarBufferValue') set bufferValue(value: number) {
        this.progressComponent.bufferValue = value;
    }

    @Input('buttonProgressBarDelay') set delay(value: number) {
        if (value != null) {
            this.indicatorDelay = value;
        }
    }
}
