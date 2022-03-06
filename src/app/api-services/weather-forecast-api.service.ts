import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {WeatherForecastResponseDto} from '../core/dto/weather-forecast-response.dto';
import {environment} from '../../environments/environment';
import {WeatherForecastSearchDto} from '../core/dto/weather-forecast-search.dto';
import {map} from 'rxjs/operators';
import {WeatherForecastHourlyResponseDto} from '../core/dto/weather-forecast-hourly-response.dto';
import {WeatherForecastHourlyDto} from '../core/dto/weather-forecast-hourly.dto';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class WeatherForecastApiService {

  constructor(private httpClient: HttpClient) { }

  getActualWeatherForecast(dto: WeatherForecastSearchDto): Observable<WeatherForecastResponseDto> {
    return this.httpClient.get<WeatherForecastResponseDto>(
      `https://api.openweathermap.org/data/2.5/weather?lat=${dto.latitude}&lon=${dto.longitude}&appid=${environment.weatherDataApiKey}&units=metric`
    ).pipe(
      map(response => {
        return {
          weather: response.weather,
          main: response.main,
          wind: response.wind
        } as WeatherForecastResponseDto;
      })
    );
  }

  getWeatherForecastForNextHours(dto: WeatherForecastSearchDto): Observable<WeatherForecastHourlyResponseDto> {
    return this.httpClient.get<WeatherForecastHourlyResponseDto>(
      `https://api.openweathermap.org/data/2.5/onecall?&lat=${dto.latitude}&lon=${dto.longitude}&appid=${environment.weatherDataApiKey}&units=metric`
    ).pipe(
      map(response => {
        return {
          hourly: response.hourly.slice(0, 8).map(val => {
            return {
              dt: moment.unix(Number(val.dt)).format('HH:mm'),
              temp: Math.floor(val.temp)
            } as WeatherForecastHourlyDto
          })
        } as WeatherForecastHourlyResponseDto
      })
    );
  }

}
