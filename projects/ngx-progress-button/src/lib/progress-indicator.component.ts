import { Component, ElementRef, Input } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

export enum ProgressIndicatorType {
    Spinner = 'spinner',
    ProgressBar = 'progressBar'
}

@Component({
    selector: 'app-progress-indicator',
    templateUrl: './progress-indicator.component.html',
    styleUrls: ['./progress-indicator.component.css']
})
export class ProgressIndicatorComponent {
    @Input() indicatorType: ProgressIndicatorType;
    @Input() value;
    @Input() color: ThemePalette;
    @Input() strokeWidth: number;
    @Input() mode: ProgressBarMode | ProgressSpinnerMode;
    @Input() bufferValue;
    @Input() diameter;

    constructor(public elementRef: ElementRef) {
    }
}
