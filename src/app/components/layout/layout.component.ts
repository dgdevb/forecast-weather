import {Component, OnInit} from '@angular/core';
import {WeatherForecastApiService} from '../../api-services/weather-forecast-api.service';
import {WeatherForecastSearchDto} from '../../core/dto/weather-forecast-search.dto';
import {CityLocationModel} from '../../core/models/city-location.model';

@Component({
  selector: 'dg-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  locations: CityLocationModel[] = [
    {name: 'Warsaw', longitude: 21.0122, latitude: 52.2297},
    {name: 'Paris ', longitude: 2.3490, latitude: 48.8647},
    {name: 'Cracow', longitude: 19.9445, latitude: 50.0496},
    {name: 'Berlin', longitude: 13.4049, latitude: 52.5200},
    {name: 'Amsterdam', longitude: 4.8970, latitude: 52.3779}
  ];

  constructor(private weatherForecastApiService: WeatherForecastApiService) {
  }

  ngOnInit(): void {
  }
}

