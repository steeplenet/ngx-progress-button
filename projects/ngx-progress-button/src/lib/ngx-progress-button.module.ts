import { NgModule } from '@angular/core';
import { ButtonProgressBarDirective } from './button-progress-bar.directive';
import { ButtonSpinnerDirective } from './button-spinner.directive';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ProgressIndicatorComponent } from './progress-indicator.component';

@NgModule({
    declarations: [
        ButtonProgressBarDirective,
        ButtonSpinnerDirective,
        ProgressIndicatorComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatProgressBarModule,
        MatProgressSpinnerModule
    ],
    exports: [
        ButtonProgressBarDirective,
        ButtonSpinnerDirective
    ]
})
export class NgxProgressButtonModule { }
