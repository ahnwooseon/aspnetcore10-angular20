import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WeatherForecast } from './types/weatherForecast';
import { WeatherService } from './weatherservice';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  private readonly weatherService = inject(WeatherService);

  protected readonly title = signal('Angular');
  protected forecasts: WeatherForecast[] = [];

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.weatherService.fetchData().subscribe({
      next: result => this.forecasts = result,
      error: console.error
    });
  }
}
