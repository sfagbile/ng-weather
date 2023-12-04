import { Injectable } from '@angular/core';
import {WeatherService} from "./weather.service";
import { Store } from '@ngrx/store';
import { selectWeatherConditions } from './state-management/weather/weather.selectors';
import { ConditionsAndZip } from './conditions-and-zip.type';
import * as WeatherActions from './state-management/weather/weather.actions';

export const LOCATIONS : string = "locations";

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  locations : string[] = [];
  constructor(private store: Store) {

    let currentConditionsByZip: ConditionsAndZip[];
    
    this.store.select(selectWeatherConditions).subscribe(conditionsAndZip => {
      currentConditionsByZip = conditionsAndZip;
    });

    if(currentConditionsByZip)
    this.locations = currentConditionsByZip.map(x=> x.zip);

    for (let loc of this.locations)
    this.store.dispatch(WeatherActions.addCurrentConditions({zipcode: loc })); 
  }

  addLocation(zipcode: string) {
    this.store.dispatch(WeatherActions.addCurrentConditions({zipcode})); 
  }

  removeLocation(zipcode: string) {
    this.store.dispatch(WeatherActions.addCurrentConditions({ zipcode }));
  }
}
