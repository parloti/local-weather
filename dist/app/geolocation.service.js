"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
require("rxjs/add/operator/toPromise");
var implemented_position_options_1 = require("./implemented-position-options");
var GeolocationService = (function () {
    function GeolocationService() {
        this.baseUrl = "https://maps.googleapis.com/maps/api/geocode/json?latlng=";
        this.key = "AIzaSyCc_xT8XsMNaGifnC44EBLSgK9oqrei9yU";
        this.options = new implemented_position_options_1.ImplementedPositionOptions();
        this.location = navigator.geolocation;
    }
    GeolocationService.prototype.getPosition = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.location) {
                _this.location.getCurrentPosition(resolve, reject, _this.options);
            }
            else {
                reject("Geolocation not supported.");
            }
        });
    };
    return GeolocationService;
}());
GeolocationService = __decorate([
    core_1.Injectable()
], GeolocationService);
exports.GeolocationService = GeolocationService;
//# sourceMappingURL=geolocation.service.js.map