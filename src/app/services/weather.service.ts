import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CurrentConditions } from '../current-conditions/current-conditions.type';
import { ConditionsAndZip } from '../shared/conditions-and-zip.type';
import { Forecast } from '../forecasts-list/forecast.type';
import { map } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { selectWeatherConditions } from '../shared/state-management/weather/weather.selectors';
import * as WeatherActions from '../shared/state-management/weather/weather.actions';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  static URL = environment.URL; 
  static APPID = environment.APP_ID;
  static ICON_URL = environment.ICON_URL;

  constructor(private http: HttpClient, private store: Store) { }

  // Select weather conditions from the store as an observable
  weatherConditions$ = this.store.select(selectWeatherConditions);

  // Add current conditions for a given zipcode using the OpenWeatherMap API
  addCurrentConditions(zipcode: string): Observable<ConditionsAndZip> {
    return this.http.get<CurrentConditions>(`${WeatherService.URL}/weather?zip=${zipcode},us&units=imperial&APPID=${WeatherService.APPID}`)
      .pipe(map(data => { return { zip: zipcode, data, iconurl: this.getWeatherIcon(data.weather[0].id), } }));
  }

  // Remove current conditions for a given zipcode using the NgRx store
  removeCurrentConditions(zipcode: string) {
    this.store.dispatch(WeatherActions.removeCurrentConditionAction({ zipcode }));
  }

  getWeatherConditions(): Observable<ConditionsAndZip[]> {
    return this.store.pipe(select(selectWeatherConditions));
  }

  // Get the 5-day weather forecast for a given zipcode using the OpenWeatherMap API
  getForecast(zipcode: string): Observable<Forecast> {
    return this.http.get<Forecast>(`${WeatherService.URL}/forecast/daily?zip=${zipcode},us&units=imperial&cnt=5&APPID=${WeatherService.APPID}`).pipe(
      map(response => {
        const list = response.list.map((item) => {
          item.weatherIcon = this.getWeatherIcon(item.weather[0].id)
          return item;
        });
        return { ...response, list }
      })
    );
  }

  getWeatherIcon(id): string {
    if (id >= 200 && id <= 232)
      return WeatherService.ICON_URL + "art_storm.png";
    else if (id >= 501 && id <= 511)
      return WeatherService.ICON_URL + "art_rain.png";
    else if (id === 500 || (id >= 520 && id <= 531))
      return WeatherService.ICON_URL + "art_light_rain.png";
    else if (id >= 600 && id <= 622)
      return WeatherService.ICON_URL + "art_snow.png";
    else if (id >= 801 && id <= 804)
      return WeatherService.ICON_URL + "art_clouds.png";
    else if (id === 741 || id === 761)
      return WeatherService.ICON_URL + "art_fog.png";
    else
      return WeatherService.ICON_URL + "art_clear.png";
  }
}
