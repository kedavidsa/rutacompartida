import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { LoginService } from "../login.service";

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

  trips = ["Taxi", "Uber", "Transmilenio", "SITP", "Bicicleta", "Caminata"];

  days = [
    {
      label: "LU",
      active: false
    },
    {
      label: "MA",
      active: true
    },
    {
      label: "MI",
      active: false
    },
    {
      label: "JU",
      active: false
    },
    {
      label: "VI",
      active: true
    },
    {
      label: "SA",
      active: false
    },
    {
      label: "DO",
      active: false
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
  constructor(private router: Router, private authService: LoginService){
    this.authService.user.subscribe(user=>{
      this.username = user.displayName;
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
