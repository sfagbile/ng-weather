import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { WeatherService } from 'app/weather.service';
import * as WeatherActions from './weather.actions';
import { of } from 'rxjs';

@Injectable()
export class WeatherEffects {
    constructor(private actions$: Actions, private weatherService: WeatherService) { }
    addCurrentConditions$ = createEffect(() =>
        this.actions$.pipe(
            ofType(WeatherActions.addCurrentConditions),
            mergeMap((action) =>
                this.weatherService.addCurrentConditions(action.zipcode).pipe(
                    map(conditionsAndZip => WeatherActions.conditionWithZipSuccess({ conditionWithZip: conditionsAndZip })),
                    catchError(error => of(WeatherActions.httpCallFailure({ error }))
                    )
                )
            )));

    getForecast$ = createEffect(() =>
        this.actions$.pipe(
            ofType(WeatherActions.getForecast),
            mergeMap((action) =>
                this.weatherService.getForecast(action.zipcode).pipe(
                    map(forecast => WeatherActions.populateForecastSuccess({ forecast, zipcode: action.zipcode })),
                    catchError(error => of(WeatherActions.httpCallFailure({ error }))
                    )
                )
            )));
}
