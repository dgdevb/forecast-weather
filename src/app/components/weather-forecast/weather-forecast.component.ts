import {Component, Input, OnInit} from '@angular/core';
import {CityLocationModel} from '../../core/models/city-location.model';
import {WeatherForecastService} from '../../services/weather-forecast.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'dg-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.scss'],
  providers: [WeatherForecastService]
})
export class WeatherForecastComponent implements OnInit {

  @Input() location!: CityLocationModel;

  windSpeed$ = this.weatherForecastService.forecastDetails$.pipe(
    map(details => details.wind.speed)
  )

  constructor(public weatherForecastService: WeatherForecastService) {
  }

  ngOnInit(): void {
    this.weatherForecastService.initForecast(this.location);
  }

}
