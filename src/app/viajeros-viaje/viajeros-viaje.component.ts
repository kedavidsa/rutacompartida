import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";

@Component({
  selector: 'app-viajeros-viaje',
  templateUrl: './viajeros-viaje.component.html',
  styleUrls: ['./viajeros-viaje.component.css']
})
export class ViajerosViajeComponent implements OnInit {
  people: FirebaseListObservable<any>;
  peopleArr = [];
  constructor(
    route: ActivatedRoute, 
    private router: Router,
    private db: AngularFireDatabase) { 
    const viajeId = route.snapshot.paramMap.get('id');
    // Obtener el listado de viajeros del viaje
    db.list("/viajes/" + viajeId + "/viajeros", { preserveSnapshot: true})
    .subscribe(snapshots=>{
      snapshots.forEach(snapshot => {
        let item = db.object("/usuarios/" + snapshot.val().userKey)
        .subscribe(user=>{
          this.peopleArr.push(user);
        });
      });
    });
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
