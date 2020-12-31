import { NgModule } from '@angular/core';
import { ButtonProgressBarDirective } from './button-progress-bar.directive';
import { ButtonSpinnerDirective } from './button-spinner.directive';
import { MatButtonModule, MatProgressBarModule, MatProgressSpinnerModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        ButtonProgressBarDirective,
        ButtonSpinnerDirective
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
    ],
    exports: [
        ButtonProgressBarDirective,
        ButtonSpinnerDirective
    ]
})
export class NgxProgressButtonModule { }
