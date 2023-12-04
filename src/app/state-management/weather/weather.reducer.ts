import { createReducer, on } from '@ngrx/store';
import * as WeatherActions from './weather.actions';
import { ConditionsAndZip } from 'app/conditions-and-zip.type';

export interface WeatherState {conditions: ConditionsAndZip[];
}

export const initialState: WeatherState = {
    conditions: [],
};

export const weatherReducer = createReducer(
    initialState,
    on(WeatherActions.removeWeatherConditions, (state, { zipcode }) => ({
        ...state,
        conditions: state.conditions.filter((condition) => condition.zip !== zipcode),
    })),

    on(WeatherActions.conditionWithZipSuccess, (state, { conditionWithZip }) => ({
        ...state,
        conditions: [...state.conditions, conditionWithZip],
    })),

    on(WeatherActions.populateForecastSuccess, (state, { forecast, zipcode} ) => {
        const conditionsAndZips = state.conditions.map((item) =>
          item.zip === zipcode ? { ...item, forecast } : item
        );
        return ({
        ...state,
        conditions: conditionsAndZips
      })})
);
