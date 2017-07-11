import { Injectable } from "@angular/core";
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Address } from './address';
import { ReverseGeocode } from './reverse-geocode';

@Injectable()
export class ReverseGeocodingService {
    private baseUrl: string = "https://maps.googleapis.com/maps/api/geocode/json?latlng=";
    private key: string = "AIzaSyCc_xT8XsMNaGifnC44EBLSgK9oqrei9yU";



    private preferredTypes: Array<string[]> = [
        ["locality", "political"],
        ["street_address"]
    ]

    constructor(private http: Http) { }

    private getReverseGeocode(coordinates: Coordinates): Promise<ReverseGeocode> {
        const latitude: number = coordinates.latitude;
        const longitude: number = coordinates.longitude;
        const url: string = `${this.baseUrl}${latitude},${longitude}&key=${this.key}`;

        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as ReverseGeocode)
            .catch(this.handleError);
    }

    private searchPreferredType(addressTypes: string[]): boolean {
        let preferredTypes = this.preferredTypes;
        let preferredType;
        let addressType;

        for (let i = 0; i < preferredTypes.length; i++) {
            preferredType = preferredTypes[i];

            for (let j = 0; j < addressTypes.length; j++) {
                addressType = addressTypes[j];
                if (preferredType.indexOf(addressType) === -1) {
                    //atLeastOneAddressTypeNotFound
                    return false;
                }
            }
            //allAddressTypeFound
            return true;
        }
    }

    private filterCity(results: Array<Address>): string {
        let city: Address;

        city = results.find((result: Address) => {
            let addressTypes: string[] = result.types;
            return this.searchPreferredType(addressTypes);
        });
        if (!city) {
            console.log(results);
            city = results[0];
        }
        return city.formatted_address;
    }

    public getCity(coordinates: Coordinates): Promise<Object> {
        return this.getReverseGeocode(coordinates).then(reverseGeocode => {
            return new Promise((resolve, reject) => {
                let city: string;
                if (reverseGeocode.status === "OK") {
                    city = this.filterCity(reverseGeocode.results);
                }
                else {
                    console.warn(reverseGeocode);
                    city = "unknown";
                }
                resolve({ city: city });
            });
        });
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
