import { Directive, ElementRef, Input, ComponentFactoryResolver, ViewContainerRef, Renderer2, OnDestroy, Optional } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { ProgressIndicatorDirective } from './progress-indicator-directive';
import { ProgressIndicatorType } from './progress-indicator.component';

@Directive({
    // tslint:disable-next-line: directive-selector
    selector: '[buttonSpinner]'
})
export class ButtonSpinnerDirective extends ProgressIndicatorDirective implements OnDestroy {

    constructor(
        hostElementRef: ElementRef,
        componentFactoryResolver: ComponentFactoryResolver,
        viewContainerRef: ViewContainerRef,
        renderer: Renderer2,
        @Optional() matButton: MatButton
    ) {
        super(hostElementRef, renderer, matButton);
        this.loadComponent(componentFactoryResolver, viewContainerRef);
        this.progressComponent.indicatorType = ProgressIndicatorType.Spinner;
        this.progressComponent.diameter = 19;
        this.progressComponent.mode = "indeterminate";
        this.progressComponent.strokeWidth = 2;
    }

    @Input() set buttonSpinner(show: boolean) {
        this.toggle(show);
    }

    @Input() set disableWhenLoading(value: boolean) {
        this.manageButton = value;
    }

    @Input() set buttonSpinnerColor(value: ThemePalette) {
        this.progressComponent.color = value;
    }

    @Input() set buttonSpinnerMode(value: ProgressSpinnerMode) {
        this.progressComponent.mode = value;
    }

    @Input() set buttonSpinnerValue(value: number) {
        this.progressComponent.value = value;
    }

    @Input() set buttonSpinnerDiameter(value: number) {
        this.progressComponent.diameter = value;
    }

    @Input() set buttonSpinnerStrokeWidth(value: number) {
        this.progressComponent.strokeWidth = value;
    }
}
