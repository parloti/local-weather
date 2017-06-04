import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

interface Geoposition {
  coords: Coordinates;
  timestamp: number;
}

export class AppComponent {
  statusIcon: string;
  temperature: number;
  temperatureUnit: string;

  name = 'Angular';

  error(err: PositionError) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  };

  getLocation() {
    let options: PositionOptions = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    let location = navigator.geolocation;
    if (location) {
      location.getCurrentPosition(this.getWeatherData, this.error, options);
    };
  }
  getWeatherData(location: Geoposition) {

  }
  ngOnInit() {
    this.getLocation();
  }
}