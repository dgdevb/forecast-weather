import {Injectable, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject, Subscription, timer} from 'rxjs';
import {WeatherForecastSearchDto} from '../core/dto/weather-forecast-search.dto';
import {WeatherForecastResponseDto} from '../core/dto/weather-forecast-response.dto';
import {WeatherForecastApiService} from '../api-services/weather-forecast-api.service';
import {CityLocationModel} from '../core/models/city-location.model';
import {concatMap, map, tap} from 'rxjs/operators';

@Injectable()
export class WeatherForecastService implements OnInit, OnDestroy {

  private location!: CityLocationModel;
  private weatherForecastSubject: Subject<WeatherForecastResponseDto> = new Subject<WeatherForecastResponseDto>();
  private subscription: Subscription = new Subscription();

  averageTemperature$: Observable<number> = this.weatherForecastSubject.asObservable().pipe(
    map(forecast => Math.floor((forecast.main.temp_max + forecast.main.temp_min) / 2))
  );

  forecastDetails$: Observable<WeatherForecastResponseDto> = this.weatherForecastSubject.asObservable();

  // TODO forecast in next hours

  constructor(private weatherForecastApiService: WeatherForecastApiService) {
  }

  ngOnInit(): void {

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

  private refreshWeatherForecast$(): Observable<WeatherForecastResponseDto> {

    if (!this.location) {
      throw "Location not specified";
    }

    const weatherForecastSearchDto = {
      latitude: this.location.latitude,
      longitude: this.location.longitude
    } as WeatherForecastSearchDto;

    return this.weatherForecastApiService.getActualWeatherForecast(weatherForecastSearchDto)
      .pipe(
        tap((forecast: WeatherForecastResponseDto) => this.weatherForecastSubject.next(forecast))
      );
  }

}
