import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { Temperature } from './temperature/temperature.component';
import { Wind } from './wind/wind.component';

@NgModule({
  imports: [BrowserModule, HttpModule],
  declarations: [
    AppComponent,
    Temperature,
    Wind
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
