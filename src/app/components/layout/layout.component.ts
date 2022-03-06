import {Component} from '@angular/core';
import {CityLocationModel} from '../../core/models/city-location.model';

@Component({
  selector: 'dg-layout',
  templateUrl: './layout.component.html'
})
export class LayoutComponent {

  locations: CityLocationModel[] = [
    {name: 'Warsaw', longitude: 21.0122, latitude: 52.2297},
    {name: 'Paris ', longitude: 2.3490, latitude: 48.8647},
    {name: 'Cracow', longitude: 19.9445, latitude: 50.0496},
    {name: 'Berlin', longitude: 13.4049, latitude: 52.5200},
    {name: 'Amsterdam', longitude: 4.8970, latitude: 52.3779}
  ];

}

