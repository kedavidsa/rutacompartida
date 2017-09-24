import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { Observable } from 'rxjs/Observable';
import { LoginService } from "./login.service";

@Injectable()
export class AppGuard implements CanActivate {
  constructor(private router: Router, private loginServ: LoginService) {}
  canActivate(): Promise<boolean> {
    return new Promise(data => {
      this.loginServ.user.subscribe(user => {
        if (user) { 
          data(true);
        } else {
          this.router.navigate(["/login"]);
          data(true);
        }
      });
    });
  }
}
