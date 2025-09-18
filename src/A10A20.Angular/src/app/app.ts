import { Component, OnInit, inject, signal, PLATFORM_ID, DestroyRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WeatherForecast } from './types/weatherForecast';
import { WeatherService } from './weatherservice';
import { isPlatformBrowser } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  private readonly platform = inject(PLATFORM_ID);
  private readonly weatherService = inject(WeatherService);
  private readonly destroyRef = inject(DestroyRef); // Auto-unsubscribe

  protected readonly title = signal('Angular');
  protected readonly forecasts = signal<WeatherForecast[]>([]);
  protected readonly loading = signal(false); // Loading state
  protected readonly error = signal<string | null>(null); // Error state

  ngOnInit(): void {
    if (isPlatformBrowser(this.platform)) {
      this.loadData();
    }
  }

  private loadData(): void {
    this.loading.set(true);
    this.error.set(null);

    this.weatherService.fetchData()
      .pipe(takeUntilDestroyed(this.destroyRef), // Auto-cleanup
      finalize(() => this.loading.set(false))
      )
      .subscribe({
        next: (result: WeatherForecast[]) => {
          this.forecasts.set(result);
        },
        error: (err: any) => {
          this.error.set(err?.message?? "An error occurred");
          console.error('Weather fetch error:', err);
        }
      });
  }
}
