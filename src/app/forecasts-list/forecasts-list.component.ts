import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Forecast } from './forecast.type';
import { Store } from '@ngrx/store';
import * as WeatherActions from 'app/shared/state-management/weather/weather.actions';
import { selectWeatherConditions } from 'app/shared/state-management/weather/weather.selectors';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-forecasts-list',
  templateUrl: './forecasts-list.component.html',
  styleUrls: ['./forecasts-list.component.css']
})
export class ForecastsListComponent implements OnInit {
  zipcode: string;
  forecast$: Observable<Forecast>;
  iconUrl: string;

  constructor(private store: Store, route: ActivatedRoute) {
    // Subscribe to route parameter changes
    route.params.subscribe(params => {
      // Update the zipcode with the latest value from the route parameters
      this.zipcode = params['zipcode'];
      // Dispatch the getForecast action with the provided zipcode
      this.store.dispatch(WeatherActions.getForecastAction({ zipcode: this.zipcode }));
    });
  }

  ngOnInit(): void {
    // Select weather conditions from the store and transform the data using pipe/map
    this.forecast$ = this.store.select(selectWeatherConditions).pipe(
      map(data => {
        // Find conditions with the matching zipcode
        var conditionsAndZip = data.find(x => x.zip == this.zipcode);
        // Update the iconUrl with the icon URL from the conditions (if available)
        this.iconUrl = conditionsAndZip?.iconurl;
        return conditionsAndZip?.forecast;
      }
      ));
  }
}
