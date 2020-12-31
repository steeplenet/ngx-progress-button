import { ElementRef, ViewContainerRef, Renderer2, ComponentFactory } from '@angular/core';
import { MatSpinner, MatProgressBar, MatButton } from '@angular/material';

type ProgressComponent = MatSpinner | MatProgressBar;

export abstract class ProgressIndicatorDirective {
    private progressIndicatorElement: any;

    constructor(
        private hostElementRef: ElementRef,
        private componentFactory: ComponentFactory<ProgressComponent>,
        private viewContainerRef: ViewContainerRef,
        private renderer: Renderer2,
        private hostButton: MatButton,
        private progressElementCssClass: string
        ) {
        this.loadComponent();
    }

    private loadComponent() {
        this.viewContainerRef.clear();

        const progressIndicator = this.viewContainerRef.createComponent(this.componentFactory, 2).instance;

        this.setOptions(progressIndicator);

        this.progressIndicatorElement = progressIndicator._elementRef.nativeElement;
        this.renderer.addClass(this.progressIndicatorElement, this.progressElementCssClass);
        this.renderer.appendChild(this.hostElementRef.nativeElement, this.progressIndicatorElement);
        this.renderer.addClass(this.hostButton._elementRef.nativeElement, 'progress-indicator');
    }

    protected abstract setOptions(progressIndicator: ProgressComponent);

    protected toggle(show: boolean) {
        show ? this.show() : this.hide();
    }

    private show() {
        this.hostButton.disabled = true;
        this.renderer.addClass(this.hostButton._elementRef.nativeElement, 'active');
        this.renderer.addClass(this.progressIndicatorElement, 'active');
    }

    private hide() {
        this.hostButton.disabled = false;
        this.renderer.removeClass(this.progressIndicatorElement, 'active');
        this.renderer.removeClass(this.hostButton._elementRef.nativeElement, 'active');
    }
}
