import { Component } from '@angular/core';



@Component({
  selector: 'home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomePageComponent {
  title = 'Home';

  lat: number = 51.678418;
  lng: number = 7.809007;

  lat2: number = 51.678418;
  lng2: number = 7.809007;
}