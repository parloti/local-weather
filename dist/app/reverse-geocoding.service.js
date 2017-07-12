"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/toPromise");
var ReverseGeocodingService = (function () {
    function ReverseGeocodingService(http) {
        this.http = http;
        this.baseUrl = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';
        this.key = 'AIzaSyCc_xT8XsMNaGifnC44EBLSgK9oqrei9yU';
        this.preferredAddressTypes = [
            ['locality', 'political'],
            ['street_address']
        ];
        this.preferredAddressComponents = [
            ['administrative_area_level_3', 'political']
        ];
    }
    ReverseGeocodingService.prototype.getReverseGeocode = function (coordinates) {
        var latitude = coordinates.latitude;
        var longitude = coordinates.longitude;
        var url = "" + this.baseUrl + latitude + "," + longitude + "&key=" + this.key;
        return this.http.get(url)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    ReverseGeocodingService.prototype.searchPreferredAddressType = function (addressTypes) {
        var preferredTypes = this.preferredAddressTypes;
        var preferredType;
        var addressType;
        for (var i = 0; i < preferredTypes.length; i++) {
            preferredType = preferredTypes[i];
            for (var j = 0; j < addressTypes.length; j++) {
                addressType = addressTypes[j];
                if (preferredType.indexOf(addressType) === -1) {
                    //atLeastOneAddressTypeNotFound
                    return false;
                }
            }
            //allAddressTypeFound
            return true;
        }
    };
    ReverseGeocodingService.prototype.filterCity = function (results) {
        var _this = this;
        var city;
        city = results.find(function (result) {
            var addressTypes = result.types;
            return _this.searchPreferredAddressType(addressTypes);
        });
        if (!city) {
            console.log(results);
            city = results[0];
        }
        return city.formatted_address;
    };
    ReverseGeocodingService.prototype.getCity = function (coordinates) {
        var _this = this;
        return this.getReverseGeocode(coordinates).then(function (reverseGeocode) {
            return new Promise(function (resolve, reject) {
                var city;
                if (reverseGeocode.status === 'OK') {
                    city = _this.filterCity(reverseGeocode.results);
                }
                else {
                    console.warn(reverseGeocode);
                    city = 'unknown';
                }
                resolve({ city: city });
            });
        });
    };
    ReverseGeocodingService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    return ReverseGeocodingService;
}());
ReverseGeocodingService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], ReverseGeocodingService);
exports.ReverseGeocodingService = ReverseGeocodingService;
//# sourceMappingURL=reverse-geocoding.service.js.map