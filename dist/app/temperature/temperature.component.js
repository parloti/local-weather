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
var Temperature = (function () {
    function Temperature() {
        this.onChangeTemperatureUnit = new core_1.EventEmitter();
    }
    Temperature.prototype.toCelsius = function () {
        if (this.unit && this.unit !== "Celsius") {
            var temperature = (this.temperature - 32) * 5 / 9;
            this.onChangeTemperatureUnit.emit(temperature);
        }
    };
    Temperature.prototype.toFahrenheit = function () {
        if (this.unit && this.unit !== "Fahrenheit") {
            var temperature = this.temperature * 9 / 5 + 32;
            this.onChangeTemperatureUnit.emit(temperature);
        }
    };
    return Temperature;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], Temperature.prototype, "temperature", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], Temperature.prototype, "unit", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], Temperature.prototype, "onChangeTemperatureUnit", void 0);
Temperature = __decorate([
    core_1.Component({
        selector: 'temperature',
        templateUrl: './temperature.component.html',
        styleUrls: ['./temperature.component.css']
    })
], Temperature);
exports.Temperature = Temperature;
//# sourceMappingURL=temperature.component.js.map