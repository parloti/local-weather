import { Component, OnInit } from '@angular/core';

import { Geoposition } from './geoposition';
import { GeolocationService } from './geolocation.service';
import { WeatherService } from './weather.service';
import { Weather } from './weather';
import { ReverseGeocodingService } from './reverse-geocoding.service';

declare const Skycons: any;

@Component({
  providers: [
    GeolocationService,
    WeatherService,
    ReverseGeocodingService
  ],
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {

  private weather: Weather = new Weather();
  private error: string = '';

  constructor(
    private geolocationService: GeolocationService,
    private weatherService: WeatherService,
    private reverseGeocodingService: ReverseGeocodingService
  ) { }

  private getWeather(position: Geoposition): void {
    this.weatherService.getWeather(position.coords)
      .then((weather: Weather) => {
        Object.assign(this.weather, { available: true }, weather);
        this.updateIcon();
      })
      .catch((error: Error) => console.log(error));
  }

  private getAddress(position: Geoposition): void {
    let reverseGeocoding = this.reverseGeocodingService;

    reverseGeocoding.getCity(position.coords)
      .then((city: Object) => {
        Object.assign(this.weather, city)
      })
      .catch((error: Error) => console.log(error));
  }

  private positionError(err: PositionError): void {
    this.error = err.message;
    console.warn(`ERROR(${err.code}): ${err.message}`);
    if (err.code === 3) {
      this.ngOnInit();
    }
  };

  onChangeTemperatureUnit(temperature: number): void {
    let _unit = this.weather.unit === 'Celsius' ? 'Fahrenheit' : 'Celsius';
    Object.assign(this.weather, {
      temperature: temperature,
      unit: _unit
    });
  }

  onChangeWindSpeedUnit(speed: number): void {
    let _unit = this.weather.wind.unit === 'Km/h' ? 'mi/h' : 'Km/h';
    Object.assign(this.weather.wind, {
      speed: speed,
      unit: _unit,
      direction: this.weather.wind.direction
    });
  }

  private updateIcon(): void {
    let skycons = new Skycons({ 'color': '#336699' });
    skycons.add('icon', this.weather.icon);
    skycons.play();
  }

  ngOnInit() {
    this.geolocationService
      .getPosition()
      .catch(this.positionError.bind(this))
      .then((position: Position) => {
        if (position) {
          this.error = '';
          this.getWeather(position);
          this.getAddress(position);
        }
      });
  }
}