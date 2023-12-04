import { Component } from '@angular/core';
import {LocationService} from "../location.service";
import { Store } from '@ngrx/store';
import * as WeatherActions from 'app/state-management/weather/weather.actions';

@Component({
  selector: 'app-zipcode-entry',
  templateUrl: './zipcode-entry.component.html'
})
export class ZipcodeEntryComponent {

  constructor(private store: Store) { }

  addLocation(zipcode : string){
    this.store.dispatch(WeatherActions.addCurrentConditions({zipcode})); 
  }

}
