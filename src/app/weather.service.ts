import { Injectable } from "@angular/core";
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Weather } from './weather';
import { Geoposition } from './geoposition';

@Injectable()
export class WeatherService {
    private baseUrl: string = "https://alexparloti.com/APPs/local-weather/index.php?";

    constructor(private http: Http) { }

    public getWeather(coordinates: Coordinates): Promise<Weather> {
        const url = `${this.baseUrl}latitude=${coordinates.latitude}&longitude=${coordinates.longitude}`;

        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as Weather)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
