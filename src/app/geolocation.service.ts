import { Injectable } from "@angular/core";
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { ImplementedPositionOptions } from './implemented-position-options';

@Injectable()
export class GeolocationService {

    private baseUrl: string = "https://maps.googleapis.com/maps/api/geocode/json?latlng=";
    private key: string = "AIzaSyCc_xT8XsMNaGifnC44EBLSgK9oqrei9yU";
    private options: PositionOptions = new ImplementedPositionOptions();
    private location: Geolocation = navigator.geolocation;

    public getPosition(): Promise<Position> {
        return new Promise((resolve, reject) => {
            if (this.location) {
                this.location.getCurrentPosition(resolve, reject, this.options);
            }
            else {
                reject("Geolocation not supported.");
            }
        });
    }
}
