import {WeatherForecastComponent} from './weather-forecast.component';
import {render} from '@testing-library/angular';
import {WeatherForecastService} from '../../services/weather-forecast.service';
import {of} from 'rxjs';
import {WeatherForecastHourlyResponseDto} from '../../core/dto/weather-forecast-hourly-response.dto';
import * as moment from 'moment';
import {WeatherForecastApiService} from '../../api-services/weather-forecast-api.service';
import {WeatherForecastResponseDto} from '../../core/dto/weather-forecast-response.dto';
import {WeatherTypeEnum} from '../../core/enums/weather-type.enum';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {fakeAsync, tick} from '@angular/core/testing';
import Spy = jasmine.Spy;

describe('WeatherForecastComponent', () => {

  let weatherForecastApiServiceSpy: Spy;

  beforeEach(() => {
    weatherForecastApiServiceSpy = jasmine.createSpyObj('WeatherForecastApiService', {
      getActualWeatherForecast: of({
        weather: [
          {
            main: WeatherTypeEnum.Clear,
            id: 1,
            description: 'Test',
            icon: 'test'
          }
        ],
        wind: {
          speed: 12
        },
        main: {
          temp_min: 6,
          temp_max: 2,
          temp: 1,
          feels_like: 2,
          humidity: 1,
          pressure: 1
        }
      } as WeatherForecastResponseDto),
      getWeatherForecastForNextHours: of(
        {
          hourly: [
            {temp: 12, dt: moment().unix().toString()}
          ]
        } as WeatherForecastHourlyResponseDto
      )
    });
  });

  it('should display correct weather information', fakeAsync(async () => {
    const component = await render(WeatherForecastComponent, {
      providers: [
        WeatherForecastService,
        {provide: WeatherForecastApiService, useValue: weatherForecastApiServiceSpy},
        HttpClientTestingModule
      ],
      componentProperties: {
        location: {name: 'Warsaw', longitude: 21.0122, latitude: 52.2297},
      }
    });

    tick(0);
    component.fixture.componentInstance.weatherForecastService.subscription.unsubscribe();

    component.fixture.whenStable().then(() => {
      component.fixture.detectChanges();
      const cityName = document.getElementsByClassName('weather-details__city-name')[0];
      const temperature = document.getElementsByClassName('weather-details__temperature')[0];
      const windSpeed = document.getElementsByClassName('weather-details__wind-speed')[0];
      const weatherIcon = document.getElementsByClassName('bi bi-brightness-high')[0];
      expect(cityName.outerHTML).toContain('Warsaw');
      expect(windSpeed.outerHTML).toContain('12 m/s');
      expect(temperature.outerHTML).toContain('4 °C');
      expect(weatherIcon).toBeTruthy();
    });
  }));

});
