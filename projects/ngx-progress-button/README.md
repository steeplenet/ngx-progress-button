## NgxProgressButton

#### An Angular Directive that adds a MatSpinner or a MatProgressBar to a MatButton. 


This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.2.13.


## Installation

`npm install ngx-progress-button`

## Usage

.html:
```html
    <button mat-raised-button
        [buttonSpinner]="isLoggingIn"
        color="primary" 
        [disabled]="isLoggingIn"
        (click)="handleLogin()"
    >
        Login
    </button>

    <button mat-raised-button
        [buttonSpinner]="isLoadingData"
        color="primary" 
        [disabled]="isLoadingData"
        (click)="handleLoadData()"
    >
       Load 
    </button>

```

.ts:
```ts
    handleLogin() {
        this.isLoggingIn = true;
        this.authenticationService.login(username.value, password.value).pipe(take(1)).subscribe({
            next: data => {
                ...
                this.isLoggingIn = false;
            }
        }};
    }

    handleLoadData() {
        this.isLoadingData = true;
        this.userService.loadData(username.value).pipe(take(1)).subscribe({
            next: data => {
                ...
                this.isLoadingData = false;
            }
        }};
    }

```

## License
This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/steeplenet/ngx-progress-button/LICENSE.md) file for details.
