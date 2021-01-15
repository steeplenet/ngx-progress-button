## NgxProgressButton - Add a spinner or progressbar to your buttons


#### * This Angular Directive adds a MatProgressSpinner or a MatProgressBar to any button.
#### * Works on any element but with the caveat that the css display property will be set to 'relative'. (To be resolved in a near-term version)
#### * MatButtons are optionally disabled by default when a loading event occurs. (This feature will support arbitrary host elements soon)
#### * Optional initial timeout before a progress indicator is displayed. Host button is disabled immediately for debouncing.



This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1


## Installation

`npm install ngx-progress-button`

## Usage

Your .html file:
```html
    <button mat-raised-button
        [buttonSpinner]="isLoggingIn"
        color="primary"
        (click)="login()"
    >
        <mat-icon>login<mat-icon> Login
    </button>

    <!-- In this example the 'disabled' state will be set to 'isImageLoaded' when loadImage() completes.
         In the absence of 'buttonSpinnerHostDisabled', the disabled state will be set to 'false' - overriding
         the disabled state assigned by the application.
         NOTE: Setting the host button's disabled property as shown below is not required by ngx-progress-button
         directives and does not affect their behavior.
    -->
    <button mat-icon-button
        [buttonSpinner]="isLoadingImage"
        [buttonSpinnerHostDisabled]="isImageLoaded"
        [disabled]="isImageLoaded"
        color="primary"
        (click)="loadImage()"
    >
        <mat-icon>file_upload<mat-icon>
    </button>

    <button
        [buttonProgressBar]="isLoadingData"
        color="primary"
        (click)="loadData()"
    >
       Load
    </button>

```

Your .ts file:
```ts
    login() {
        // Activate the buttonSpinner.  The button will be disabled immediately.
        this.isLoggingIn = true;

        this.authenticationService.login(username.value, password.value).pipe(take(1)).subscribe({
            next: data => {
                ...
                // Deactivate the buttonSpinner.
                this.isLoggingIn = false;
            }
        }};
    }

    loadImage() {
        // Activate the buttonSpinner.  The button will be disabled immediately.
        this.isLoadingImage = true;

        this.userService.loadData(username.value).pipe(take(1)).subscribe({
            next: data => {
                ...
                // Deactivate the buttonSpinner.
                this.isLoadingImage = false;
                // We want the image load button to remain disabled.
                this.isImageLoaded = true;
            }
        }};
    }

    loadData() {
        // Activate the buttonProgressBar. The button will disabled immediately (if it's a MatButton).
        // NOTE: Disablement will be extended to other elements in a future version.
        this.isLoadingData = true;

        this.userService.loadData(username.value).pipe(take(1)).subscribe({
            next: data => {
                ...
                // Dectivate the buttonProgressBar.
                this.isLoadingData = false;
            }
        }};
    }

```

Your module file for a module that will use a ngx-progress-button directive:
```
    import { NgxProgressButtonModule } from 'ngx-progress-button';

    ...

    imports: [
        ...
        NgxProgressButtonModule,
        ...
    ],

```


## Options

### [buttonSpinner] Directive:
| Directive Property     |  MatProgressSpinner Property | Description                                  | Default Value
| -------------------------- | ------------------ | -------------------------------------------------- | -------------
| `buttonSpinnerColor`       | `color`            | *Theme color palette.                              | `primary`
| `buttonSpinnerMode`        | `mode`             | *Mode of the progress spinner. Values: `determinate`, `indeterminate` | `indeterminate`
| `buttonSpinnerValue`       | `value`            | *Value of the progress spinner.                    | `0`
| `buttonSpinnerDiameter`    | `diameter`         | *The diameter of the progress spinner.             | `19`
| `buttonSpinnerStrokeWidth` | `strokeWidth`      | *Stroke width of the progress spinner.             | Determined by Angular framework.
| `buttonSpinnerDelay`       | n/a                | Delay display of the progress spinner. NOTE: Disablement is immediate. | `1000` (millisecs)
| `buttonSpinnerDisableHost` | n/a                | Disable the host button when [buttonSpinner]=true. NOTE: Applicable to MatButtons only in the current version. | `true`
| `buttonSpinnerHostDisabled`| n/a                | An optional 'disabled' state to be applied to the host button at the end of a loading event. NOTE: Applicable to MatButtons only in the current version. | n/a

*See [MatProgressSpinner](https://material.angular.io/components/progress-spinner/api) for details.

### [buttonProgressBar] Directive:
| Directive Property             | MatProgressBar Property | Description                                | Default Value
| ------------------------------ | ------------------ | ----------------------------------------------- | -------------
| `buttonProgressBarColor`       | `color`            | *Theme color palette.                           | `primary`
| `buttonProgressBarMode`        | `mode`             | *Mode of the progress bar. Values: `determinate`, `indeterminate`, `buffer`, `query` | `indeterminate`
| `buttonProgressBarValue`       | `value`            | *Value of the progress bar.                     | `0`
| `buttonProgressBarBufferValue` | `bufferValue`      | *Buffer value of the progress bar.              | `0`
| `buttonProgressBarDelay`       | n/a                | Delay display of the progress bar. NOTE: Disablement is immediate. | `1000` (millisecs)
| `buttonProgressBarDisableHost` | n/a                | Disable the host button when [buttonProgressBar]=true. NOTE: Applicable to MatButtons only in the current version. | `true`
| `buttonProgressBarHostDisabled`| n/a                | An optional 'disabled' state to be applied to the host button at the end of a loading event. NOTE: Applicable to MatButtons only in the current version. | n/a

*See [MatProgressBar](https://material.angular.io/components/progress-bar/api) for details.

## License
This project is licensed under the MIT License - see the [LICENSE](https://github.com/steeplenet/ngx-progress-button/blob/main/LICENSE) file for details.
