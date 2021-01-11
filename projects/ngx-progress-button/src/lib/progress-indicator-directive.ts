import { ElementRef, ViewContainerRef, Renderer2, ComponentRef, OnDestroy } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { ProgressIndicatorComponent } from './progress-indicator.component';
import { ComponentFactoryResolver } from '@angular/core';

export abstract class ProgressIndicatorDirective implements OnDestroy {
    protected componentRef: ComponentRef<ProgressIndicatorComponent>;
    protected manageButton = true;

    constructor(private hostElementRef: ElementRef, private renderer: Renderer2, private matButton: MatButton) {
    }

    protected get progressComponent(): ProgressIndicatorComponent {
        return this.componentRef.instance;
    }

    ngOnDestroy() {
        this.renderer.removeChild(
            this.hostElementRef.nativeElement,
            this.progressComponent.elementRef.nativeElement);
        this.componentRef.destroy();
    }

    protected toggle(show: boolean) {
        show ? this.show() : this.hide();
    }

    protected loadComponent(
        componentFactoryResolver: ComponentFactoryResolver,
        viewContainerRef: ViewContainerRef,
    ): ComponentRef<ProgressIndicatorComponent> {
        viewContainerRef.clear();
        const componentFactory = componentFactoryResolver.resolveComponentFactory(ProgressIndicatorComponent);
        this.componentRef = viewContainerRef.createComponent(componentFactory);

        return this.componentRef;
    }

    private show() {
        this.enableButton(false);
        this.renderer.appendChild(this.hostElementRef.nativeElement, this.progressComponent.elementRef.nativeElement);
    }

    private hide() {
        this.enableButton(true);
        this.renderer.removeChild(this.hostElementRef.nativeElement, this.progressComponent.elementRef.nativeElement);
    }

    private enableButton(enable: boolean) {
        if (this.manageButton && this.matButton) {
            this.matButton.disabled = !enable;
        }
    }
}
