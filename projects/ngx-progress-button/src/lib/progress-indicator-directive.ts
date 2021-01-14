import { ElementRef, ViewContainerRef, Renderer2, ComponentRef, OnDestroy, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { ProgressIndicatorComponent } from './progress-indicator.component';
import { ComponentFactoryResolver } from '@angular/core';
import { interval, of, ReplaySubject, Subject } from 'rxjs';
import { delay, delayWhen, switchMap, takeUntil, tap } from 'rxjs/operators'

export abstract class ProgressIndicatorDirective implements OnInit, OnDestroy {
    private cancelSubject = new Subject<any>();
    protected disableHostButton = true;
    protected componentRef: ComponentRef<ProgressIndicatorComponent>;
    protected showSubject = new ReplaySubject<boolean>();
    protected indicatorDelay = 1000;

    constructor(
        private hostElementRef: ElementRef,
        private componentFactoryResolver: ComponentFactoryResolver,
        private viewContainerRef: ViewContainerRef,
        private renderer: Renderer2,
        private matButton: MatButton) {
    }

    protected get progressComponent(): ProgressIndicatorComponent {
        return this.componentRef && this.componentRef.instance || null;
    }

    ngOnInit() {
        this.setHostElementStyle();

        this.showSubject
            .pipe(
                tap(show => this.enableButton(!show)),
                switchMap(show => show ? of(show).pipe(delay(this.indicatorDelay)) : of(show)),
                takeUntil(this.cancelSubject)
            )
            .subscribe({
                next: show => show ? this.createProgressIndicator() : this.removeProgressIndicator()
            });
    }

    ngOnDestroy() {
        this.cancelSubject.next();
        this.cancelSubject.complete();
        this.showSubject.complete();
        this.removeProgressIndicator();
    }

    protected abstract setProgressIndicatorProperties();

    protected enableButton(enable: boolean) {
        if ((this.disableHostButton || this.disableHostButton == null) && this.matButton) {
            this.matButton.disabled = !enable;
        }
    }

    private createProgressIndicator() {
        this.viewContainerRef.clear();

        if (!this.progressComponent) {
            const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ProgressIndicatorComponent);
            this.componentRef = this.viewContainerRef.createComponent(componentFactory);
            this.setProgressIndicatorProperties();
            this.renderer.appendChild(this.hostElementRef.nativeElement, this.progressComponent.elementRef.nativeElement);
        }
    }

    private removeProgressIndicator() {
        if (this.progressComponent) {
            this.renderer.removeChild(this.hostElementRef.nativeElement, this.progressComponent.elementRef.nativeElement);
            this.componentRef.destroy();
            this.componentRef = null;
        }
    }

    private setHostElementStyle() {
        this.renderer.setStyle(this.hostElementRef.nativeElement, 'position', 'relative');
    }
}
