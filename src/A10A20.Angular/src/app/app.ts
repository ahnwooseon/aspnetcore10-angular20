import { Component, OnInit, inject, signal, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WeatherForecast } from './types/weatherForecast';
import { WeatherService } from './weatherservice';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  private readonly platform = inject(PLATFORM_ID);
  private readonly weatherService = inject(WeatherService);

  protected readonly title = signal('Angular');
  protected readonly forecasts = signal<WeatherForecast[]>([]);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platform)) {
      this.loadData();
    }
  }

  loadData(): void {
    this.weatherService.fetchData().subscribe({
      next: result => this.forecasts.set(result),
      error: console.error
    });
  }
}
