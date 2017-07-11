import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'temperature',
    templateUrl: './temperature.component.html',
    styleUrls: ['./temperature.component.css']
})

export class Temperature {
    @Input() temperature: number;
    @Input() unit: string;
    @Output() onChangeTemperatureUnit: EventEmitter<number> = new EventEmitter<number>();

    toCelsius(): void {
        if (this.unit && this.unit !== "Celsius") {
            let temperature = (this.temperature - 32) * 5 / 9;
            this.onChangeTemperatureUnit.emit(temperature);
        }
    }

    toFahrenheit(): void {
        if (this.unit && this.unit !== "Fahrenheit") {
            let temperature = this.temperature * 9 / 5 + 32;
            this.onChangeTemperatureUnit.emit(temperature);
        }
    }
}