import {Component, Input, ViewChild} from '@angular/core';
import {WeatherForecastHourlyResponseDto} from '../../core/dto/weather-forecast-hourly-response.dto';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ChartConfiguration, ChartData, ChartDataset, ChartOptions, ChartType, TooltipItem} from 'chart.js';
import {BaseChartDirective} from 'ng2-charts';

@Component({
  selector: 'dg-weather-forecast-hourly-chart-modal',
  templateUrl: './weather-forecast-hourly-chart-modal.component.html',
  styleUrls: ['./weather-forecast-hourly-chart-modal.component.scss']
})
export class WeatherForecastHourlyChartModalComponent {

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  @Input() locationName!: string;

  lineChartData!: ChartData;
  lineChartType: ChartType = 'line';
  lineChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      y: {
        beginAtZero: true,
        suggestedMin: -5,
        suggestedMax: 20,
        ticks: {
          callback: (value) => {
            return value + ' °C';
          },
          font: {
            size: 21
          },
          stepSize: 1,
        }
      },
      x: {
        ticks: {
          font: {
            size: 21
          }
        }
      }
    },
    datasets: {
      line: {
        label: ''
      }
    },
    plugins: {
      tooltip: {
        displayColors: false,
        bodyFont: {
          size: 21
        },
        titleFont: {
          size: 21
        },
        enabled: true,
        callbacks: {
          label(tooltipItem: TooltipItem<'line'>): string | string[] {
            return tooltipItem.label + ' °C';
          }
        }
      }
    }
  };

  @Input() set hourlyData(data: WeatherForecastHourlyResponseDto | null) {
    if (!data) {
      return;
    }

    this.setChartDatasets(data);
  };

  constructor(public activeModal: NgbActiveModal) {
  }

  setChartDatasets(data: WeatherForecastHourlyResponseDto): void {
    const dataset: ChartDataset = {
      data: [...data.hourly.map(hourly => hourly.temp)],
      backgroundColor: '#cee3f3',
      borderColor: '#428af5',
      borderWidth: 4,
      pointBackgroundColor: '#428af5',
      pointBorderColor: '#428af5',
      fill: 'start'
    }

    setTimeout(() => {
      this.lineChartData = {
        datasets: [dataset],
        labels: data.hourly.map(val => val.dt)
      } as ChartConfiguration['data'];
      this.chart?.update();
    });
  }

}
