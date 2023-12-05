import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { WeatherService } from 'app/services/weather.service';
import * as WeatherActions from './weather.actions';
import { of } from 'rxjs';

@Injectable()
export class WeatherEffects {
    constructor(private actions$: Actions, private weatherService: WeatherService) { }

    // Effect to add current conditions
    addCurrentConditions$ = createEffect(() =>
        this.actions$.pipe(
            ofType(WeatherActions.addCurrentConditionAction),
            mergeMap((action) =>
                this.weatherService.addCurrentConditions(action.zipcode).pipe(
                    // Dispatch action on success with the received conditions and zip
                    map(conditionsAndZip => WeatherActions.populateCurrentConditionAction({ conditionWithZip: conditionsAndZip })),
                    // Dispatch action on error with the received error
                    catchError(error => of(WeatherActions.httpCallFailureAction({ error }))
                    )
                )
            )));

    // Effect to get forecast
    getForecast$ = createEffect(() =>
        this.actions$.pipe(
            ofType(WeatherActions.getForecastAction),
            mergeMap((action) =>
                this.weatherService.getForecast(action.zipcode).pipe(
                    // Dispatch action on success with the received forecast and zip
                    map(forecast => WeatherActions.populateForecastAction({ forecast, zipcode: action.zipcode })),
                    // Dispatch action on error with the received error
                    catchError(error => of(WeatherActions.httpCallFailureAction({ error }))
                    )
                )
            )));
}
