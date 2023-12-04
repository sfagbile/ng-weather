import { createAction, props } from '@ngrx/store';
import { ConditionsAndZip } from 'app/conditions-and-zip.type';
import { Forecast } from 'app/forecasts-list/forecast.type';

export const addCurrentConditions = createAction('[Weather] Add Weather Conditions',props<{ zipcode: string }>());
export const removeWeatherConditions = createAction('[Weather] Remove Weather Conditions', props<{ zipcode: string }>());
export const conditionWithZipSuccess = createAction('[Weather] Load Weather Success', props<{ conditionWithZip: ConditionsAndZip }>());
export const httpCallFailure = createAction('[Weather] Load Http Failure', props<{ error: any }>());
export const getForecast = createAction('[Forecast] Get Forecast', props<{ zipcode: string }>());
export const populateForecastSuccess = createAction('[Forecast] Load Forecast Success', props<{ forecast: Forecast, zipcode: string }>());
