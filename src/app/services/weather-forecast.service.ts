import {Injectable, OnDestroy} from '@angular/core';
import {Observable, Subject, Subscription, timer} from 'rxjs';
import {WeatherForecastSearchDto} from '../core/dto/weather-forecast-search.dto';
import {WeatherForecastResponseDto} from '../core/dto/weather-forecast-response.dto';
import {WeatherForecastApiService} from '../api-services/weather-forecast-api.service';
import {CityLocationModel} from '../core/models/city-location.model';
import {concatMap, map, tap} from 'rxjs/operators';

/**
 * WeatherForecastService is responsible for keeping fresh weather forecast.
 * It has a timer which refresh weather data.
 * There are observables with weather forecast based on subject with weather forecast details. Subject and observables make us sure to be notified when weather get refreshed.
 * Service is not a singleton, It is like a helper for component displaying weather forecast. Service is focused only for one location provided by host component.
 * */

@Injectable()
export class WeatherForecastService implements OnDestroy {

  subscription: Subscription = new Subscription();

  private location!: CityLocationModel;
  private weatherForecastSubject: Subject<WeatherForecastResponseDto> = new Subject<WeatherForecastResponseDto>();

  weatherType$ = this.weatherForecastSubject.asObservable().pipe(
    map(details => details.weather[0].main)
  )

  windSpeed$ = this.weatherForecastSubject.asObservable().pipe(
    map(details => details.wind.speed)
  )

  averageTemperature$: Observable<number> = this.weatherForecastSubject.asObservable().pipe(
    map(forecast => Math.floor((forecast.main.temp_max + forecast.main.temp_min) / 2))
  );

  constructor(private weatherForecastApiService: WeatherForecastApiService) {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  initForecast(location: CityLocationModel): void {
    this.location = location;
    this.startForecastWatcher();
  }

  startForecastWatcher(): void {
    const watcherSubscription = timer(0, 10000).pipe(
      concatMap(() => this.refreshWeatherForecast$())
    ).subscribe();

    this.subscription.add(watcherSubscription);
  }

  getForecastSearchDto(): WeatherForecastSearchDto {
    return {
      latitude: this.location.latitude,
      longitude: this.location.longitude
    } as WeatherForecastSearchDto;
  }

  private refreshWeatherForecast$(): Observable<WeatherForecastResponseDto> {

    if (!this.location) {
      throw "Location not specified!";
    }

    return this.weatherForecastApiService.getActualWeatherForecast(this.getForecastSearchDto())
      .pipe(
        tap((forecast: WeatherForecastResponseDto) => this.weatherForecastSubject.next(forecast))
      );
  }

}
