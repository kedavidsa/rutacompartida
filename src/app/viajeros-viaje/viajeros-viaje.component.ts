import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-viajeros-viaje',
  templateUrl: './viajeros-viaje.component.html',
  styleUrls: ['./viajeros-viaje.component.css']
})
export class ViajerosViajeComponent implements OnInit {

  constructor(route: ActivatedRoute, private router: Router) { 
    const viajeId = route.snapshot.paramMap.get('id');
    console.log(viajeId);
  }

  ngOnInit() {
    // Get all travelers in viaje
    
  }

  openChat(){
    this.router.navigate(["/started"]);
  }

  back(){
    this.router.navigate(["/home"]);
  }
  

}
