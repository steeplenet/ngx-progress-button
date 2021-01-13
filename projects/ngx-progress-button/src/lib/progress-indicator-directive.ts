import { ElementRef, ViewContainerRef, Renderer2, ComponentRef, OnDestroy } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { ProgressIndicatorComponent } from './progress-indicator.component';
import { ComponentFactoryResolver } from '@angular/core';
import { asapScheduler, of, Subject } from 'rxjs';
import { delay, takeUntil } from 'rxjs/operators'

export abstract class ProgressIndicatorDirective implements OnDestroy {
    protected disableHostButton = true;
    protected componentRef: ComponentRef<ProgressIndicatorComponent>;
    protected showSubject = new Subject<boolean>();
    protected cancelSubject = new Subject<any>();
    protected indicatorDelay = 1000;

    constructor(private hostElementRef: ElementRef, private renderer: Renderer2, private matButton: MatButton) {
    }

    protected get progressComponent(): ProgressIndicatorComponent {
        return this.componentRef.instance;
    }

    ngOnDestroy() {
        this.cancelSubject.next();
        this.cancelSubject.complete();
        this.showSubject.complete();
        this.renderer.removeChild(this.hostElementRef.nativeElement, this.progressComponent.elementRef.nativeElement);
        this.componentRef.destroy();
    }

    protected toggle(show: boolean) {
        this.cancelSubject.next();

        if (show) {
            // We want this to be called after changes to input variables are resolved - specifically manageButton
            asapScheduler.schedule(_ => {
                this.enableButton(false);
                of(show).pipe(delay(this.indicatorDelay), takeUntil(this.cancelSubject)).subscribe({
                    next: _ => this.show()
                });
            });
        } else {
            this.cancelSubject.next();
            this.enableButton(true);
            this.hide();
        }
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
        this.disableHostButton = disableHost;
    }

    protected enableButton(enable: boolean) {
        if ((this.disableHostButton || this.disableHostButton == null) && this.matButton) {
            this.matButton.disabled = !enable;
        }
    }

    private show() {
        this.renderer.appendChild(this.hostElementRef.nativeElement, this.progressComponent.elementRef.nativeElement);
    }

    private hide() {
        this.renderer.removeChild(this.hostElementRef.nativeElement, this.progressComponent.elementRef.nativeElement);
    }
}
