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
    private _mode: ProgressSpinnerMode = 'indeterminate';
    private _color: ThemePalette = null;
    private _value: number = 0;
    private _diameter: number = 19;
    private _strokeWidth: number = null;

    @Input() set buttonSpinner(show: boolean) {
        this.showSubject.next(show);
    }

    @Input('buttonSpinnerColor') set color(value: ThemePalette) {
        if (value == null) {
            return;
        }

        this._color = value;

        if (this.progressComponent) {
            this.progressComponent.color = value;
        }
    }

    @Input('buttonSpinnerMode') set mode(value: ProgressSpinnerMode) {
        if (value == null) {
            return;
        }

        this._mode = value;

        if (this.progressComponent) {
            this.progressComponent.mode = value;
        }
    }

    @Input('buttonSpinnerValue') set value(value: number) {
        if (value == null) {
            return;
        }

        this._value = value;

        if (this.progressComponent) {
            this.progressComponent.value = value;
        }
    }

    @Input('buttonSpinnerDiameter') set diameter(value: number) {
        if (value == null) {
            return;
        }

        this._diameter = value;

        if (this.progressComponent) {
            this.progressComponent.diameter = value;
        }
    }

    @Input('buttonSpinnerStrokeWidth') set strokeWidth(value: number) {
        if (value == null) {
            return;
        }

        this._strokeWidth = value;

        if  (this.progressComponent) {
            this.progressComponent.strokeWidth = value;
        }
    }

    @Input('buttonSpinnerDelay') set delay(value: number) {
        if (value != null) {
            this.indicatorDelay = value;
        }
    }

    @Input('buttonSpinnerDisableHost') set disableHost(value: boolean) {
        if (value != null) {
            this.disableHostButton = value;
        }
    }

    @Input('buttonSpinnerHostDisabled') set hostDisabled(value: boolean) {
        this.isHostDisabledByApp = value;
    }

    constructor(
        hostElementRef: ElementRef,
        componentFactoryResolver: ComponentFactoryResolver,
        viewContainerRef: ViewContainerRef,
        renderer: Renderer2,
        @Optional() matButton: MatButton
    ) {
        super(hostElementRef, componentFactoryResolver, viewContainerRef, renderer, matButton);
    }

    setProgressIndicatorProperties() {
        this.progressComponent.indicatorType = ProgressIndicatorType.Spinner;
        this.progressComponent.mode = this._mode;
        this.progressComponent.color = this._color;
        this.progressComponent.value = this._value;
        this.progressComponent.diameter = this._diameter;
        this.progressComponent.strokeWidth = this._strokeWidth;
    }
}
