import {
    Directive,
    ElementRef,
    Input,
    ComponentFactoryResolver,
    ViewContainerRef,
    Renderer2,
    OnDestroy,
    Optional
} from '@angular/core';
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
    private _show: boolean;

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
        this.setHostElementStyle();
    }

    @Input() set buttonSpinner(show: boolean) {
        this._show = show;
        this.toggle(show);
    }

    @Input('buttonSpinnerDisableHost') set disableHost(value: boolean) {
        this.setButtonManagementState(value, this._show);
    }

    @Input('buttonSpinnerColor') set color(value: ThemePalette) {
        this.progressComponent.color = value;
    }

    @Input('buttonSpinnerMode') set mode(value: ProgressSpinnerMode) {
        this.progressComponent.mode = value;
    }

    @Input('buttonSpinnerValue') set value(value: number) {
        this.progressComponent.value = value;
    }

    @Input('buttonSpinnerDiameter') set diameter(value: number) {
        if (value) {
            this.progressComponent.diameter = value;
        }
    }

    @Input('buttonSpinnerStrokeWidth') set strokeWidth(value: number) {
        this.progressComponent.strokeWidth = value;
    }
}
