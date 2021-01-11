## NgxProgressButton - Add a spinner or progressbar to your buttons

#### An Angular Directive that adds a MatProgressSpinner or a MatProgressBar to any button.


This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1


## Installation

`npm install ngx-progress-button`

## Usage

.html:
```html
    <button mat-raised-button
        [buttonSpinner]="isLoggingIn"
        color="primary"
        [disabled]="isLoggingIn"
        (click)="login()"
    >
        Login
    </button>

    <button mat-raised-button
        [buttonProgressBar]="isLoadingData"
        color="primary"
        [disabled]="isLoadingData"
        (click)="loadData()"
    >
       Load
    </button>

```

.ts:
```ts
    login() {
        this.isLoggingIn = true;
        this.authenticationService.login(username.value, password.value).pipe(take(1)).subscribe({
            next: data => {
                ...
                this.isLoggingIn = false;
            }
        }};
    }

    loadData() {
        this.isLoadingData = true;
        this.userService.loadData(username.value).pipe(take(1)).subscribe({
            next: data => {
                ...
                this.isLoadingData = false;
            }
        }};
    }

```
## Options

### [buttonSpinner] Directive:
| Directive Property     |  MatProgressSpinner Property | Description                              | Default Value
| -------------------------- | ------------------ | -------------------------------------------------- | -------------
| `buttonSpinnerColor`       | `color`            | *Theme color palette.                              | `primary`
| `buttonSpinnerMode`        | `mode`             | *Mode of the progress circle. Values: `determinate`, `indeterminate` | `indeterminate`
| `buttonSpinnerValue`       | `value`            | *Value of the progress circle.                     | `0`
| `buttonSpinnerDiameter`    | `diameter`         | *The diameter of the progress spinner.             | `19`
| `buttonSpinnerStrokeWidth` | `strokeWidth`      | *Stroke width of the progress spinner.             | Not specified
| `disableWhenLoading`       | n/a                | Disable the host button when [buttonSpinner]=true. | `true`

*See [MatProgressSpinner](https://material.angular.io/components/progress-spinner/api) for details.

### [buttonProgressBar] Directive:
| Directive Property             | MatProgressBar Property | Description                              | Default Value
| ------------------------------ | ------------------ | ------------------------------------------------------ | -------------
| `buttonProgressBarColor`       | `color`            | *Theme color palette.                                  | `primary`
| `buttonProgressBarMode`        | `mode`             | *Mode of the progress bar. Values: `determinate`, `indeterminate`, `buffer`, `query` | `indeterminate`
| `buttonProgressBarValue`       | `value`            | *Value of the progress bar.                            | `0`
| `buttonProgressBarBufferValue` | `bufferValue`      | *Buffer value of the progress bar.                     | `0`
| `disableWhenLoading`           | n/a                | Disable the host button when [buttonProgressBar]=true. | `true`

*See [MatProgressSpinner](https://material.angular.io/components/progress-spinner/api) for details.

## License
This project is licensed under the MIT License - see the [LICENSE](https://github.com/steeplenet/ngx-progress-button/LICENSE) file for details.
