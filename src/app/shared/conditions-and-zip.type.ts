import { CurrentConditions } from '../current-conditions/current-conditions.type';
import { Forecast } from '../forecasts-list/forecast.type';

export interface ConditionsAndZip {
    zip: string;
    data: CurrentConditions;
    iconurl: string;
    forecast?: Forecast;
}
