import { Injectable } from "@angular/core";

import { Weather } from './weather';
import { MockWeather } from './mock-weather';
import { Geoposition } from './geoposition';

@Injectable()
export class WeatherService {
    baseUrl: string = "https://api.darksky.net/forecast/";
    key: string = "7367ac42e8e4dc971df8a9962aa11964";
    latitude: number;
    longitude: number;

    makeUrlRequest(): string {
        return this.baseUrl + this.key + "/" + this.latitude + "," + this.longitude;
    }

    getWeather(position: Geoposition): Promise<Weather> {
        return Promise.resolve(MockWeather);
    }

    getWeatherSlowly(position: Geoposition): Promise<Weather> {
        return new Promise(resolve => {
            // Simulate server latency with 2 second delay
            setTimeout(() => resolve(this.getWeather(position)), 2000);
        });
    }

}
