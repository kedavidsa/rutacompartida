import { Injectable, OnInit } from "@angular/core";
import {
  AngularFireDatabase,
  FirebaseObjectObservable,
  FirebaseListObservable
} from "angularfire2/database";
@Injectable()
export class ViajesService implements OnInit {
  viajes: FirebaseListObservable<any>;
  viajesOb: FirebaseObjectObservable<any>;
  constructor(private db: AngularFireDatabase) {
    this.viajes = db.list("/viajes");
  }

  ngOnInit() {}
  viajeshoy(): FirebaseListObservable<any> {
    return this.db.list("/viajes", {
      query: {
        orderByChild: "date",
        startAt: new Date().getTime() - new Date().getTimezoneOffset() + "",
        endAt:
          new Date().getTime() -
          new Date().getTimezoneOffset() +
          "" +
          24 * 60 * 60 * 1000
      }
    });
  }


}
