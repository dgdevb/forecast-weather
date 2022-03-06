import {Component, Input, OnInit} from '@angular/core';
import {CityLocationModel} from '../../core/models/city-location.model';
import {WeatherForecastService} from '../../services/weather-forecast.service';
import {WeatherForecastApiService} from '../../api-services/weather-forecast-api.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {WeatherForecastHourlyResponseDto} from '../../core/dto/weather-forecast-hourly-response.dto';
import {WeatherForecastHourlyChartModalComponent} from '../weather-forecast-hourly-chart-modal/weather-forecast-hourly-chart-modal.component';
import {WeatherTypeEnum} from '../../core/enums/weather-type.enum';

/**
 * WeatherForecastComponent has provider to WeatherForecastService, so there is one instance of that service for one instance of WeatherForecastComponent.
 * That make component able to keep weather details fresh and easy to access to them.
 *
 * WeatherForecastComponent has public dependency weatherForecastService, so that we can use async pipes which reduce quantity of code.
 * To show forecast details, there is NgbModal dependency which allow us to open NgBootstrap modal with details.
 * */

@Component({
  selector: 'dg-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  providers: [WeatherForecastService]
})
export class WeatherForecastComponent implements OnInit {

  @Input() location!: CityLocationModel;

  weatherType: typeof WeatherTypeEnum = WeatherTypeEnum;

  constructor(public weatherForecastService: WeatherForecastService,
              private weatherForecastApiService: WeatherForecastApiService,
              private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.weatherForecastService.initForecast(this.location);
  }

  openWeatherForecastForNextHours(): void {
    this.weatherForecastApiService.getWeatherForecastForNextHours(this.weatherForecastService.getForecastSearchDto())
      .subscribe((response: WeatherForecastHourlyResponseDto) => {
        const modalRef = this.modalService.open(WeatherForecastHourlyChartModalComponent, {size: 'lg'});
        modalRef.componentInstance.hourlyData = response;
        modalRef.componentInstance.locationName = this.location.name;
      });
  }

}
