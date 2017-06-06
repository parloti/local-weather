import { Injectable } from "@angular/core";

import { Weather } from './weather';
import { MockWeather } from './mock-weather';

@Injectable()
export class WeatherService {
    
    getWeather(): Promise<Weather> {
        return Promise.resolve(MockWeather);
    }

    getWeatherSlowly(): Promise<Weather> {
        return new Promise(resolve => {
            // Simulate server latency with 2 second delay
            setTimeout(() => resolve(this.getWeather()), 2000);
        });
    }

}
