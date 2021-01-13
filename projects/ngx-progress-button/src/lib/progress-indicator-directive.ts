import { ElementRef, ViewContainerRef, Renderer2, ComponentRef, OnDestroy } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { ProgressIndicatorComponent } from './progress-indicator.component';
import { ComponentFactoryResolver } from '@angular/core';

export abstract class ProgressIndicatorDirective implements OnDestroy {
    private manageButton = null;
    protected componentRef: ComponentRef<ProgressIndicatorComponent>;

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

    protected setHostElementStyle() {
        this.renderer.setStyle(this.hostElementRef.nativeElement, 'position', 'relative');
    }

    protected setButtonManagementState(disableHost: boolean, show: boolean) {
        // If this property is being set for the first time and to false
        // AND being set to false
        // AND we initially disabled the host button then revert it.
        // revert the host button disable state.
        if (this.manageButton == null && !disableHost && show) {
            this.enableButton(show);
        }

        this.manageButton = disableHost;
    }

    protected enableButton(enable: boolean) {
        if ((this.manageButton || this.manageButton == null) && this.matButton) {
            this.matButton.disabled = !enable;
        }
    }

    private show() {
        this.enableButton(false);
        this.renderer.appendChild(this.hostElementRef.nativeElement, this.progressComponent.elementRef.nativeElement);
    }

    private hide() {
        this.enableButton(true);
        this.renderer.removeChild(this.hostElementRef.nativeElement, this.progressComponent.elementRef.nativeElement);
    }
}
