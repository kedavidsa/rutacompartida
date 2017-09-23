import { Injectable } from "@angular/core";
import {
  AngularFireDatabase,
  FirebaseObjectObservable
} from "angularfire2/database";
import { LoginService } from "./login.service";
const ACTIVO = 1;
const BUSCAR = 2;
const EMPEZAR = 3;
@Injectable()
export class RutasService {
  item: FirebaseObjectObservable<any>;
  constructor(db: AngularFireDatabase, private authService: LoginService) {
    this.authService.user.subscribe(user => {
      this.item = db.object("/" + user.uid);
    });
  }
  guardarRuta(ruta: Ruta) {
    ruta.key =  this.item.$ref.push().key;
    return this.item.$ref.child(ruta.key).set(ruta)
  }
}
export interface Ruta {
  key: string;
  nombre: string;
  init: Direccion;
  end: Direccion;
  days: {
    L: boolean;
    M: boolean;
    I: boolean;
    J: boolean;
    V: boolean;
    S: boolean;
    D: boolean;
  };
  types: {
    taxi: boolean;
    bus: boolean;
    bike: boolean;
    car: boolean;
    walk: boolean;
  };
}
export interface Direccion {
  direccion: string;
  lat: string;
  long: string;
}
