import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-viajeros-viaje',
  templateUrl: './viajeros-viaje.component.html',
  styleUrls: ['./viajeros-viaje.component.css']
})
export class ViajerosViajeComponent implements OnInit {

  constructor(route: ActivatedRoute) { 
    const viajeId = route.snapshot.paramMap.get('id');
    console.log(viajeId);
  }

  ngOnInit() {
    // Get all travelers in viaje
    
  }

}
