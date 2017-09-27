import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { LoginService } from "../login.service";

@Component({
  selector: 'app-viajeros-viaje',
  templateUrl: './viajeros-viaje.component.html',
  styleUrls: ['./viajeros-viaje.component.css']
})
export class ViajerosViajeComponent implements OnInit {
  people: FirebaseListObservable<any>;
  peopleArr = [];
  viajeId;
  username: string;
  userpic: string;
  constructor(
    route: ActivatedRoute, 
    private router: Router,
    private db: AngularFireDatabase,
    private authService: LoginService,
  ) { 
    this.authService.user.subscribe(user => {
      if(user){
        this.username = user.displayName;
        this.userpic = user.photoURL;
      }
    });
    this.viajeId = route.snapshot.paramMap.get('id');
    // Obtener el listado de viajeros del viaje
    db.list("/viajes/" + this.viajeId + "/viajeros", { preserveSnapshot: true})
    .subscribe(snapshots=>{
      snapshots.forEach(snapshot => {
        let item = db.object("/usuarios/" + snapshot.val().userKey)
        .subscribe(user=>{
          console.log(user);
          let isInArr = false;
          for(let i in this.peopleArr){
            if(user.nombre == this.peopleArr[i].nombre){
              isInArr = true;
            }
          }
          if(!isInArr){
            this.peopleArr.push(user);
          } 
        });
      });
    });
  }

  ngOnInit() {
    // Get all travelers in viaje
    
  }

  openChat(){
    this.router.navigate(["/started",this.viajeId]);
  }

  back(){
    this.router.navigate(["/home"]);
  }

  logout() {
    this.authService.logout();
  }
  

}
