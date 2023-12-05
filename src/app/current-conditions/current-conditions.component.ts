import { Component, inject } from '@angular/core';
import { Router } from "@angular/router";
import { ConditionsAndZip } from '../shared/conditions-and-zip.type';
import { Store } from '@ngrx/store';
import { selectWeatherConditions } from 'app/shared/state-management/weather/weather.selectors';
import * as WeatherActions from 'app/shared/state-management/weather/weather.actions';

@Component({
  selector: 'app-current-conditions',
  templateUrl: './current-conditions.component.html',
})
export class CurrentConditionsComponent {

  // Inject the Router service for navigation
  private router = inject(Router);
  protected currentConditionsByZip: ConditionsAndZip[];

  constructor(private store: Store) {
    // Subscribe to the weather conditions in the store
    this.store.select(selectWeatherConditions).subscribe(conditionsAndZip => {
      this.currentConditionsByZip = conditionsAndZip;
    });
  }

  removeLocation(zipcode: string) {
    // Dispatch the removeWeatherConditions action with the provided zipcode
    this.store.dispatch(WeatherActions.removeCurrentConditionAction({ zipcode }));
  }

  removeLocationByIndex(index: number) {
    // Dispatch the removeWeatherConditionByIndex action with the provided index
    this.store.dispatch(WeatherActions.removeCurrentConditionsByIndexAction({ index }));
  }

  showForecast(zipcode: string) {
    this.router.navigate(['/forecast', zipcode])
  }
}
