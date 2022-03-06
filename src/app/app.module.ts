import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {LayoutComponent} from './components/layout/layout.component';
import {WeatherForecastComponent} from './components/weather-forecast/weather-forecast.component';
import {NgbActiveModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HeaderComponent} from './components/header/header.component';
import {WeatherForecastHourlyChartModalComponent} from './components/weather-forecast-hourly-chart-modal/weather-forecast-hourly-chart-modal.component';
import {NgChartsModule} from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    WeatherForecastComponent,
    HeaderComponent,
    WeatherForecastHourlyChartModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    NgbModule,
    NgChartsModule
  ],
  providers: [
    NgbActiveModal
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
