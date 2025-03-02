# BMI-Weight-Tracker

This is the new version of the BMI Weight Tracker currently in development. The application allows users to record their daily weight and calculates their BMI and body fat percentage based on their gender and age.

## DIRECTORY STRUCTURE

```
src
    app/
        app.routes              Defines the routes for each page
        core/models/            Contains common models used across the system
        core/services/          Contains common services used across the system
        dashboard/              Main dashboard page
        dashboard-details/      Dashboard details page
        history/                Records of user's weight, BMI, and body fat percentage history
        progress/               User's weight, BMI, and body fat percentage progress over different time periods
        progress-chart/         Progress chart visualization
        user-profile/           User profile information page
        weight-date-modal/      Date selection for adding weight records
        settings/               System settings page
        shared/                 Shared constants and utility functions
        tabs/                   Navigation tabs for redirecting to different pages

assets                          Static assets and resources
environments                    Environment configuration files
```

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 19.0.0.

## Development server

Run `npm run start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ionic generate page page-name` to generate a new page.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `www` folder.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Live Demo

Try the BMI Weight Tracker application here:  
🔗 [Live Demo](http://bmi-weight-tracker-ionic-demo.s3-website.us-east-2.amazonaws.com)

_Note: This is a demo version hosted on AWS S3. Some features may be limited._
