import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WeatherForecast } from './types/weatherForecast';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  constructor(private http: HttpClient) { }

  fetchData() {
    return this.http.get<WeatherForecast[]>('/api/weatherforecast');
  }
}
