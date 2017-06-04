"use strict";
var AppComponent = (function () {
    function AppComponent() {
        this.name = 'Angular';
    }
    AppComponent.prototype.error = function (err) {
        console.warn("ERROR(" + err.code + "): " + err.message);
    };
    ;
    AppComponent.prototype.getLocation = function () {
        var options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };
        var location = navigator.geolocation;
        if (location) {
            location.getCurrentPosition(this.getWeatherData, this.error, options);
        }
        ;
    };
    AppComponent.prototype.getWeatherData = function (location) {
    };
    AppComponent.prototype.ngOnInit = function () {
        this.getLocation();
    };
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map