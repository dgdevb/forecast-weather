import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherForecastHourlyChartModalComponent } from './weather-forecast-hourly-chart-modal.component';

describe('WeatherForecastHourlyChartModalComponent', () => {
  let component: WeatherForecastHourlyChartModalComponent;
  let fixture: ComponentFixture<WeatherForecastHourlyChartModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeatherForecastHourlyChartModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherForecastHourlyChartModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
