import { Component, OnInit } from '@angular/core';

import { Geoposition } from './geoposition';
import { WeatherService } from './weather.service';

@Component({
  providers: [WeatherService],
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  constructor(private weatherService: WeatherService) { }

  statusIcon: string;
  temperature: number;
  temperatureUnit: string;

  name = 'Angular';

  error(err: PositionError) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  };

  getWeatherData(position: Geoposition) {
    this.weatherService.getWeatherSlowly().then(weather => console.log(weather));
  }

  getLocation() {
    let options: PositionOptions = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    let location = navigator.geolocation;
    if (location) {
      location.getCurrentPosition(this.getWeatherData.bind(this), this.error, options);
    }
    else {
      console.error("Geolocation not supported.");
    }
  }
  ngOnInit() {
    this.getLocation();
  }
}