## WeatherForecast
Application created by Daniel Gutowski.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/gutowski`. The app will automatically reload if you change any of the source files.

~~## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.~~

## Running tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## What I have done - project description

Weather forecast application is created for recruitment process.
Application shows current situation of weather in 5 European cities including average temperature, wind strength and other details.

## Additional libraries description

1. NgBootstrap - library which gives a lot of tools, styles, components for develop user interfaces. It is like a facade between Angular and Bootstrap. It helps to improve fast of building angular components in bootstrap style.
2. Angular Testing Library - @testing-library/angular. Library which helps to improve test quality in the project. It helps to test components without testing implementation details what is important if we want to have easy to maintain code.
3. chart.js and ng2-charts - I used that libraries to present details of weather forecast in next hours on chart. 
4. moment.js - library for operating with dates.

## Architecture

1. Project architecture is based on one module - app module. There was no reason to put lazy loading modules or create code in external libraries because project is very simple and small.
2. Project has global styles in src/scss location. There are global variables, blocks, styles for body of the page. Global styles help to decrease code quantity and to set the common theme of applications. In order to use that styles we have to import global.scss to styles.scss. Global.scss is like a module which define imports to other global styles.
3. Application distinguish services for api calls and services used inside of app.
4. Application content is placed in layout-component.ts. LayoutComponent is like a wrapper for user interface. It can help to divide app between authorized and unauthorized  user in the future.
5. I placed all components into src/app/components. If there will be more than 5 components I'll make separated locations for components depending on destiny of that components.
6. All models used in app are placed into core catalogue.
7. To keep code clean I installed eslint with common configuration.
