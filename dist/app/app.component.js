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
var geolocation_service_1 = require("./geolocation.service");
var weather_service_1 = require("./weather.service");
var weather_1 = require("./weather");
var reverse_geocoding_service_1 = require("./reverse-geocoding.service");
var AppComponent = (function () {
    function AppComponent(geolocationService, weatherService, reverseGeocodingService) {
        this.geolocationService = geolocationService;
        this.weatherService = weatherService;
        this.reverseGeocodingService = reverseGeocodingService;
        this.weather = new weather_1.Weather();
        this.error = '';
    }
    AppComponent.prototype.getWeather = function (position) {
        var _this = this;
        this.weatherService.getWeather(position.coords)
            .then(function (weather) {
            Object.assign(_this.weather, { available: true }, weather);
            _this.updateIcon();
        })
            .catch(function (error) { return console.log(error); });
    };
    AppComponent.prototype.getAddress = function (position) {
        var _this = this;
        var reverseGeocoding = this.reverseGeocodingService;
        reverseGeocoding.getCity(position.coords)
            .then(function (city) {
            Object.assign(_this.weather, city);
        })
            .catch(function (error) { return console.log(error); });
    };
    AppComponent.prototype.positionError = function (err) {
        this.error = err.message;
        console.warn("ERROR(" + err.code + "): " + err.message);
        if (err.code === 3) {
            this.ngOnInit();
        }
    };
    ;
    AppComponent.prototype.onChangeTemperatureUnit = function (temperature) {
        var _unit = this.weather.unit === 'Celsius' ? 'Fahrenheit' : 'Celsius';
        Object.assign(this.weather, {
            temperature: temperature,
            unit: _unit
        });
    };
    AppComponent.prototype.onChangeWindSpeedUnit = function (speed) {
        var _unit = this.weather.wind.unit === 'Km/h' ? 'mi/h' : 'Km/h';
        Object.assign(this.weather.wind, {
            speed: speed,
            unit: _unit,
            direction: this.weather.wind.direction
        });
    };
    AppComponent.prototype.updateIcon = function () {
        var skycons = new Skycons({ 'color': '#336699' });
        skycons.add('icon', this.weather.icon);
        skycons.play();
    };
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.geolocationService
            .getPosition()
            .catch(this.positionError.bind(this))
            .then(function (position) {
            if (position) {
                _this.error = '';
                _this.getWeather(position);
                _this.getAddress(position);
            }
        });
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        providers: [
            geolocation_service_1.GeolocationService,
            weather_service_1.WeatherService,
            reverse_geocoding_service_1.ReverseGeocodingService
        ],
        selector: 'my-app',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.css']
    }),
    __metadata("design:paramtypes", [geolocation_service_1.GeolocationService,
        weather_service_1.WeatherService,
        reverse_geocoding_service_1.ReverseGeocodingService])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map