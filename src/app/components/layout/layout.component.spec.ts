import {render} from '@testing-library/angular';
import {LayoutComponent} from './layout.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

describe('LayoutComponent', () => {

  it('should display all of weather forecast cards and header', async () => {
    await render(LayoutComponent, {
      componentProperties: {
        locations: [
          {name: 'Warsaw', longitude: 21.0122, latitude: 52.2297},
          {name: 'Paris ', longitude: 2.3490, latitude: 48.8647},
          {name: 'Cracow', longitude: 19.9445, latitude: 50.0496},
          {name: 'Berlin', longitude: 13.4049, latitude: 52.5200},
          {name: 'Amsterdam', longitude: 4.8970, latitude: 52.3779}
        ]
      },
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });

    const weatherForecastCards = document.querySelectorAll('dg-weather-forecast');
    const header = document.querySelectorAll('dg-header');
    expect(weatherForecastCards.length).toEqual(5);
    expect(header.length).toEqual(1);
  });

});
