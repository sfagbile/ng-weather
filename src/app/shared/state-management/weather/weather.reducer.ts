import { createReducer, on } from '@ngrx/store';
import * as WeatherActions from './weather.actions';
import { ConditionsAndZip } from 'app/shared/conditions-and-zip.type';

export interface WeatherState {
    conditions: ConditionsAndZip[];
}

// Define the initial state for the weather feature
export const initialState: WeatherState = {
    conditions: [],
};

export const weatherReducer = createReducer(
    initialState,

    // Reducer case to remove current conditions by zipcode
    on(WeatherActions.removeCurrentConditionAction, (state, { zipcode }) => ({
        ...state,
        conditions: state.conditions.filter((condition) => condition.zip !== zipcode),
    })),

    // Reducer case to remove current condition by index
    on(WeatherActions.removeCurrentConditionsByIndexAction, (state, { index }) => ({
        ...state,
        conditions: state.conditions.filter((condition, i) => i !== index),
    })),

    // Reducer case for addition of weather conditions with zipcode
    on(WeatherActions.populateCurrentConditionAction, (state, { conditionWithZip }) => ({
        ...state,
        conditions: [...state.conditions, conditionWithZip],
    })),

    // Reducer case for population of forecast with zipcode
    on(WeatherActions.populateForecastAction, (state, { forecast, zipcode }) => {
        // Update conditions with forecast for the specified zipcode
        const conditionsAndZips = state.conditions.map((item) =>
            item.zip === zipcode ? { ...item, forecast } : item
        );
        return ({
            ...state,
            conditions: conditionsAndZips
        })
    })
);
