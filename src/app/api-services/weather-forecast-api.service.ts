import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {WeatherForecastResponseDto} from '../core/dto/weather-forecast-response.dto';
import {environment} from '../../environments/environment';
import {WeatherForecastSearchDto} from '../core/dto/weather-forecast-search.dto';

@Injectable({
  providedIn: 'root'
})
export class WeatherForecastApiService {

  constructor(private httpClient: HttpClient) {
  }

  getActualWeatherForecast(dto: WeatherForecastSearchDto): Observable<WeatherForecastResponseDto> {
    return this.httpClient.get<WeatherForecastResponseDto>(
      `https://api.openweathermap.org/data/2.5/weather?lat=${dto.latitude}&lon=${dto.longitude}&appid=${environment.weatherDataApiKey}&units=metric`
    );
  }

}
