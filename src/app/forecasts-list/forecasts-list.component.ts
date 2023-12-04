import { Component, OnInit } from '@angular/core';
import {WeatherService} from '../weather.service';
import {ActivatedRoute} from '@angular/router';
import {Forecast} from './forecast.type';
import { Store } from '@ngrx/store';
import * as WeatherActions from 'app/state-management/weather/weather.actions';
import { selectWeatherConditions } from 'app/state-management/weather/weather.selectors';
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

  constructor(private store: Store,  route : ActivatedRoute)  {
    route.params.subscribe(params => {
      this.zipcode = params['zipcode'];

      this.store.dispatch(WeatherActions.getForecast({zipcode: this.zipcode})); 
      // this.store.dispatch(WeatherActions.removeWeatherConditions({zipcode})); 
      // weatherService.getForecast(this.zipcode)
      //   .subscribe(data => this.forecast = data);
    });
  }

  ngOnInit(): void {
    this.forecast$ =  this.store.select(selectWeatherConditions).pipe(    
      map(data => 
        {
          var conditionsAndZip =  data.find(x => x.zip == this.zipcode);
          this.iconUrl = conditionsAndZip?.iconUrl;
          return conditionsAndZip?.forecast;
        }
    ));
  }
}
