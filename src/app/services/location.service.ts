import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectWeatherConditions } from '../shared/state-management/weather/weather.selectors';
import { ConditionsAndZip } from '../shared/conditions-and-zip.type';
import * as WeatherActions from '../shared/state-management/weather/weather.actions';
import { Subscription } from 'rxjs';

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
    this.store.dispatch(WeatherActions.addCurrentConditionAction({zipcode: loc })); 
  }

  addLocation(zipcode: string) {
    this.store.dispatch(WeatherActions.addCurrentConditionAction({zipcode})); 
  }

  removeLocation(zipcode: string) {
    this.store.dispatch(WeatherActions.removeCurrentConditionAction({ zipcode }));
  }
}
