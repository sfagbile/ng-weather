import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WeatherState } from './weather.reducer';

// Create a feature selector for the 'weather' feature state
export const selectWeatherState = createFeatureSelector<WeatherState>('weather');

// Create a selector to get the 'conditions' property from the 'weather' feature state
export const selectWeatherConditions = createSelector(
    selectWeatherState,
    (state: WeatherState) => state.conditions
  );

