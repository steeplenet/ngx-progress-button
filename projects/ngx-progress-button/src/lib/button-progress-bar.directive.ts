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
    private _mode: ProgressBarMode = 'indeterminate';
    private _color: ThemePalette = null;
    private _value = 0;
    private _bufferValue = 0;

    @Input() set buttonProgressBar(show: boolean) {
        this.showSubject.next(show);
    }

    @Input('buttonProgressBarColor') set color(value: ThemePalette) {
        if (value == null) {
            return;
        }

        this._color = value;

        if (this.progressComponent) {
            this.progressComponent.color = value;
        }
    }

    @Input('buttonProgressBarMode') set mode(value: ProgressBarMode) {
        if (value == null) {
            return;
        }

        this._mode = value;

        if (this.progressComponent) {
            this.progressComponent.mode = value;
        }
    }

    @Input('buttonProgressBarValue') set value(value: number) {
        if (value == null) {
            return;
        }

        this._value = value;

        if (this.progressComponent) {
            this.progressComponent.value = value;
        }
    }

    @Input('buttonProgressBarBufferValue') set bufferValue(value: number) {
        if (value == null) {
            return;
        }

        this._bufferValue = value;

        if (this.progressComponent) {
            this.progressComponent.bufferValue = value;
        }
    }

    @Input('buttonProgressBarDelay') set delay(value: number) {
        if (value != null) {
            this.indicatorDelay = value;
        }
    }

    @Input('buttonProgressBarDisableHost') set disableHost(value: boolean) {
        if (value != null) {
            this.disableHostButton = value;
        }
    }

    @Input('buttonProgressBarHostDisabled') set hostDisabled(value: boolean) {
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
        this.progressComponent.indicatorType = ProgressIndicatorType.ProgressBar;
        this.progressComponent.mode = this._mode;
        this.progressComponent.color = this._color;
        this.progressComponent.value = this._value;
        this.progressComponent.bufferValue = this._bufferValue;
    }
}
