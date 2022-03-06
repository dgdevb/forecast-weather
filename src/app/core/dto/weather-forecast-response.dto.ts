import {WeatherMainDto} from './weather-main.dto';
import {WeatherConditionDto} from './weather-condition.dto';
import {WeatherWindDto} from './weather-wind.dto';

export interface WeatherForecastResponseDto {
  weather: WeatherConditionDto[];
  main: WeatherMainDto;
  wind: WeatherWindDto;
}
