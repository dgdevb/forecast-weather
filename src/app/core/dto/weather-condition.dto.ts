import {WeatherTypeEnum} from '../enums/weather-type.enum';

export interface WeatherConditionDto {
  id: number;
  main: WeatherTypeEnum;
  description: string;
  icon: string;
}
