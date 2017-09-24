import { Component, OnInit, NgZone } from '@angular/core';
import { Http } from "@angular/http";
import { GoogleMapsAPIWrapper } from "@agm/core";

@Component({
  selector: 'app-request-ruta',
  templateUrl: './request-ruta.component.html',
  styleUrls: ['./request-ruta.component.css']
})
export class RequestRutaComponent implements OnInit {
  user = {
    coords: {
      latitude: 4.6374661999999995,
      longitude: -74.0831427
    }
  };

  destiny = {
    name: '',
    lat: 4.6374661999999995,
    long: -74.0831427
  };

  types = [
    {
      label: "local_taxi",
      key: "taxi",
      active: false
    },
    {
      label: "directions_car",
      key: "car",
      active: false
    },
    {
      label: "directions_bus",
      key: "bus",
      active: false
    },
    {
      label: "directions_bike",
      key: "bike",
      active: false
    },
    {
      label: "directions_walk",
      key: "walk",
      active: false
    }
  ];

  constructor(
    public http: Http) {
  }

  ngOnInit() {

    // Get user geolocation
    const self = this;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        self.user.coords = position.coords;
        self.destiny.lat = self.user.coords.latitude;
        self.destiny.long =  self.user.coords.longitude;
      });
    }
  }

  drawDestinyAddress(event: any){
    const self = this;
    const gapiUrl = "https://maps.googleapis.com/maps/api/geocode/json?";
    let destinyUrl = `${gapiUrl}address=${this.destiny}&key=AIzaSyCLHVsmTkK8mWKnfYJUEQmkUFsy_KI1kIs`;

    this.http.request(destinyUrl).subscribe(function(destinyResponse) {
      const parsedDestinyResponse = JSON.parse(destinyResponse.text()).results[0].geometry.location;
      console.log(parsedDestinyResponse);
      self.destiny.lat = parsedDestinyResponse.lat;
      self.destiny.long = parsedDestinyResponse.lng;
      console.log(self.destiny);
    });
  };

}
