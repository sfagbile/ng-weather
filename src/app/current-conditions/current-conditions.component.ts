import {Component, inject, OnDestroy, OnInit, Signal} from '@angular/core';
import {WeatherService} from "../weather.service";
import {LocationService} from "../location.service";
import {Router} from "@angular/router";
import {ConditionsAndZip} from '../conditions-and-zip.type';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { selectWeatherConditions } from 'app/state-management/weather/weather.selectors';
import * as WeatherActions from 'app/state-management/weather/weather.actions';

@Component({
  selector: 'app-current-conditions',
  templateUrl: './current-conditions.component.html',
  styleUrls: ['./current-conditions.component.css']
})
export class CurrentConditionsComponent {
  //weatherConditions$: Observable<ConditionsAndZip[]>;

  //private weatherService = inject(WeatherService);
  private router = inject(Router);
  //protected locationService = inject(LocationService);
  protected currentConditionsByZip: ConditionsAndZip[];

  constructor(private store: Store) {
    this.store.select(selectWeatherConditions).subscribe(conditionsAndZip => {
      this.currentConditionsByZip = conditionsAndZip;
    });
  }

  removeLocation(zipcode : string){
    this.store.dispatch(WeatherActions.removeWeatherConditions({zipcode})); 
  }

  showForecast(zipcode : string){
    this.router.navigate(['/forecast', zipcode])
  }
}
