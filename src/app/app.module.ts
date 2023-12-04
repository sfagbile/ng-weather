import { BrowserModule } from '@angular/platform-browser';
import { NgModule, isDevMode } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ZipcodeEntryComponent } from './zipcode-entry/zipcode-entry.component';
import { ForecastsListComponent } from './forecasts-list/forecasts-list.component';
import { CurrentConditionsComponent } from './current-conditions/current-conditions.component';
import { MainPageComponent } from './main-page/main-page.component';
import {RouterModule} from "@angular/router";
import {routing} from "./app.routing";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { WeatherEffects } from './state-management/weather/weather.effects';
import { weatherReducer } from './state-management/weather/weather.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CacheInterceptor } from './cache.interceptor';
import { TabsComponent } from './app-tab/tabs.component';
import { TabComponent } from './app-tab/tab.component';

@NgModule({
  declarations: [
    AppComponent,
    ZipcodeEntryComponent,
    ForecastsListComponent,
    CurrentConditionsComponent,
    TabComponent, 
    TabsComponent,
    MainPageComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    routing,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    StoreModule.forRoot({ weather: weatherReducer }),
    EffectsModule.forRoot([WeatherEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  // providers: [LocationService, WeatherService, 
  //   {
  //   provide: HTTP_INTERCEPTORS,
  //   useClass: CacheInterceptor
  // },

  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: CacheInterceptor,
    multi: true
  }],

  bootstrap: [AppComponent]
})
export class AppModule { }
