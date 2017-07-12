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
var Wind = (function () {
    function Wind() {
        this.onChangeWindSpeedUnit = new core_1.EventEmitter();
    }
    Wind.prototype.toKilometersPerHour = function () {
        if (this.windUnit && this.windUnit !== 'Km/h') {
            var speed = this.speed / 0.62137;
            this.onChangeWindSpeedUnit.emit(speed);
        }
    };
    Wind.prototype.toMilesPerHour = function () {
        if (this.windUnit && this.windUnit !== 'mi/h') {
            var speed = this.speed * 0.62137;
            this.onChangeWindSpeedUnit.emit(speed);
        }
    };
    Wind.prototype.updateIcon = function () {
        var skycons = new Skycons({ 'color': '#336699' });
        skycons.add('wind', 'wind');
        skycons.play();
    };
    Wind.prototype.ngAfterViewInit = function () {
        this.updateIcon();
    };
    return Wind;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], Wind.prototype, "speed", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], Wind.prototype, "windUnit", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], Wind.prototype, "windDirection", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], Wind.prototype, "onChangeWindSpeedUnit", void 0);
Wind = __decorate([
    core_1.Component({
        selector: 'wind',
        templateUrl: './wind.component.html',
        styleUrls: ['./wind.component.css']
    })
], Wind);
exports.Wind = Wind;
//# sourceMappingURL=wind.component.js.map