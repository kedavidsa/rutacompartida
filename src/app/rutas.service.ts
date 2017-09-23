import { Injectable } from "@angular/core";
import {
  AngularFireDatabase,
  FirebaseObjectObservable,
  FirebaseListObservable
} from "angularfire2/database";
import { LoginService } from "./login.service";
export const ACTIVO = 1;
export const BUSCAR = 2;
export const EMPEZAR = 3;
@Injectable()
export class RutasService {
  item: FirebaseObjectObservable<any>;
  routes: FirebaseListObservable<any>;
  constructor(db: AngularFireDatabase, private authService: LoginService) {
    this.authService.user.subscribe(user => {
      this.item = db.object("/" + user.uid);
      this.routes = db.list("/" + user.uid);
    });
  }
  guardarRuta(ruta: Ruta) {
    ruta.key = this.item.$ref.push().key;
    return this.item.$ref.child(ruta.key).set(ruta);
  }
  editarRuta(ruta: Ruta) {
    return this.item.$ref.child(ruta.key).set(ruta);
  }
  removeRuta(ruta: Ruta) {
    return this.item.$ref.child(ruta.key).remove();
  }
}
export interface Ruta {
  key: string;
  nombre: string;
  estado: string;
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
