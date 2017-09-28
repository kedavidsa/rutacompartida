import { Component, ElementRef, ViewChild, } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";


import { LoginService } from "../login.service";
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { Http } from "@angular/http";

@Component({
  selector: "start-page",
  templateUrl: "./start-ruta.component.html",
  styleUrls: ["./start-ruta.component.css"]
})
export class StartPageComponent {

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  title = "Started Route";
  user = {
    coords: {
      latitude: 4.6374661999999995,
      longitude: -74.0831427
    }
  };
  people = [{ name: 'Persona 1', email: 'email@email.com' }, { name: 'Persona 2', email: 'email@email.com' }, { name: 'Persona 3', email: 'email@email.com' }];

  /*messages=[{username:'Persona 1',uid:'email@email.com',message:'Hola a todos',propio:false },
  {username:'Persona 2',uid:'email@email.com',message:'Hola a todos' ,propio:false},
  {username:'Persona 3',uid:'email@email.com',message:'Hola a todos',propio:true }];*/

  lat: number = 51.678418;
  lng: number = 7.809007;

  viaje = {};
  sendMessageValue = '';
  username: string;
  userpic: string;
  uid: string;
  messages: FirebaseListObservable<any>;
  viajeId;
  constructor(
    private authService: LoginService,
    route: ActivatedRoute,
    private router: Router,
    public http: Http,
    private db: AngularFireDatabase) {
    this.authService.user.subscribe(user => {
      if (user) {
        this.username = user.displayName;
        this.userpic = user.photoURL;
      }
    });
    this.viajeId = route.snapshot.paramMap.get('id');
    db.object("/viajes/" + this.viajeId)
      .subscribe(viaje => {
        this.viaje = viaje;
        /*const gapiUrl = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?";
        let placesUrl = `${gapiUrl}location=${viaje.init.lat}${viaje.init.long}&radius=500`;
        this.http.request(placesUrl).subscribe(function(startResponse) {
          const parsedStartResponse = JSON.parse(startResponse.text());
          console.log(parsedStartResponse);
        });*/
      })
    // Obtener arreglo de lugares cercanos
    this.messages = db.list("/viajes/" + this.viajeId + "/chat");
    this.authService.user.subscribe(user => {
      this.username = user.displayName;
      this.uid = user.uid;
    })

  }

  ngOnInit() {
    const self = this;
    this.scrollToBottom();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        self.user.coords = position.coords;
      });
    }
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

  sendMessage(): void {
    if (this.sendMessageValue.trim() != '') {
      this.messages.push({ username: this.username, uid: this.uid, message: this.sendMessageValue, propio: true });
      this.sendMessageValue = '';
    }


  }

  back() {
    this.router.navigate(["/viajeros-viaje", this.viajeId]);
  }

  logout() {
    this.authService.logout();
  }

}
