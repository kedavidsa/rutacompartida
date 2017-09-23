import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { LoginService } from "../login.service";
import { RutasService } from "../rutas.service";

@Component({
  selector: "home-page",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomePageComponent {
  title = "Home";

  lat: number = 51.678418;
  lng: number = 7.809007;

  lat2: number = 51.678418;
  lng2: number = 7.809007;

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

  days = [
    {
      label: "DO",
      active: false,
      fireLabel: 'D'
    },
    {
      label: "LU",
      active: false,
      fireLabel: 'L'
    },
    {
      label: "MA",
      active: true,
      fireLabel: 'M'
    },
    {
      label: "MI",
      active: false,
      fireLabel: 'I'
    },
    {
      label: "JU",
      active: false,
      fireLabel: 'J'
    },
    {
      label: "VI",
      active: true,
      fireLabel: 'V'
    },
    {
      label: "SA",
      active: false,
      fireLabel: 'S'
    }
  ];

  routes = [
    {
      name: "Oficina - Estación Alcala",
      start: "calle falsa 123",
      startLat: "",
      startLon: "",
      end: "calle falsa 123",
      endLat: "",
      endLon: ""
    },
    {
      name: "Oficina - Casa",
      start: "calle falsa 123",
      startLat: "",
      startLon: "",
      end: "calle falsa 123",
      endLat: "",
      endLon: ""
    },
    {
      name: "Casa - Oficina",
      start: "calle falsa 123",
      startLat: "",
      startLon: "",
      end: "calle falsa 123",
      endLat: "",
      endLon: ""
    }
  ];
  username: string;
  userpic: string;
  constructor(
    private router: Router, 
    private authService: LoginService, 
    public rutaServ: RutasService,
  ){
    this.authService.user.subscribe(user=>{
      this.username = user.displayName;
      this.userpic = user.photoURL;
    })
  }
  getReverseGeocoding(address) {
    console.log("test");
    return address;
  }
  add() {
    this.router.navigate(["/newruta"]);
  }
}
