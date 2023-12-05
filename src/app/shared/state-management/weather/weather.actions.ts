import { createAction, props } from '@ngrx/store';
import { ConditionsAndZip } from 'app/shared/conditions-and-zip.type';
import { Forecast } from 'app/forecasts-list/forecast.type';

export const addCurrentConditionAction = createAction('[Weather] Add Current Weather Conditions',props<{ zipcode: string }>());
export const removeCurrentConditionAction = createAction('[Weather] Remove Current Weather Conditions', props<{ zipcode: string }>());
export const removeCurrentConditionsByIndexAction = createAction('[Weather] Remove Current Weather Conditions by Index', props<{ index: number }>());
export const populateCurrentConditionAction = createAction('[Weather] Populate Current Weather Conditions', props<{ conditionWithZip: ConditionsAndZip }>());
export const httpCallFailureAction = createAction('[Weather] Load Http Failure', props<{ error: any }>());
export const getForecastAction = createAction('[Forecast] Get Forecast', props<{ zipcode: string }>());
export const populateForecastAction = createAction('[Forecast] Load Forecast Success', props<{ forecast: Forecast, zipcode: string }>());
