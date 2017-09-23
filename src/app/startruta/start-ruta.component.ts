import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "start-page",
  templateUrl: "./start-ruta.component.html",
  styleUrls: ["./start-ruta.component.css"]
})
export class StartPageComponent {
  title = "Started Route";

  people=[{name:'Persona 1',email:'email@email.com' },{name:'Persona 2',email:'email@email.com' },{name:'Persona 3',email:'email@email.com' }];

  messages=[{name:'Persona 1',email:'email@email.com',message:'Hola a todos',propio:false },
  {name:'Persona 2',email:'email@email.com',message:'Hola a todos' ,propio:false},
  {name:'Persona 3',email:'email@email.com',message:'Hola a todos',propio:true }];

  lat: number = 51.678418;
  lng: number = 7.809007;
  

  sendMessageValue = ' ';

  constructor(private router: Router){
    
  }

  sendMessage():void{
    this.messages.push({name:'Persona 3',email:'email@email.com',message:this.sendMessageValue,propio:true });
    this.sendMessageValue = ' ';
    
  }
  
}
