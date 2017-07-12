import { Component, Input, Output, EventEmitter } from '@angular/core';

declare const Skycons: any;

@Component({
    selector: 'wind',
    templateUrl: './wind.component.html',
    styleUrls: ['./wind.component.css']
})

export class Wind {
    @Input() speed: number;
    @Input() windUnit: string;
    @Input() windDirection: string;
    @Output() onChangeWindSpeedUnit: EventEmitter<number> = new EventEmitter<number>();

    toKilometersPerHour(): void {
        if (this.windUnit && this.windUnit !== 'Km/h') {
            let speed = this.speed / 0.62137;
            this.onChangeWindSpeedUnit.emit(speed);
        }
    }

    toMilesPerHour(): void {
        if (this.windUnit && this.windUnit !== 'mi/h') {
            let speed = this.speed * 0.62137;
            this.onChangeWindSpeedUnit.emit(speed);
        }
    }

    private updateIcon(): void {
        let skycons = new Skycons({ 'color': '#336699' });
        skycons.add('wind', 'wind');
        skycons.play();
    }

    ngAfterViewInit() {
        this.updateIcon();
    }
}