import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "./app.component";
import { LoginPageComponent } from "./login/login.component";
import { HomePageComponent } from "./home/home.component";
import { NewrutaComponent } from "./newruta/newruta.component";
import { StartPageComponent } from "./startruta/start-ruta.component";
import { RequestRutaComponent } from "./request-ruta/request-ruta.component";
import { LoginService } from "./login.service";
import { AppGuard } from "./app.guard";
import { LoginGuard } from "./login.guard";
import { ViajerosViajeComponent } from "./viajeros-viaje/viajeros-viaje.component";

const properties: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "login", component: LoginPageComponent, canActivate: [LoginGuard]},
  { path: "home", component: HomePageComponent ,  canActivate: [AppGuard]},
  { path: "newruta", component: NewrutaComponent,  canActivate: [AppGuard] },
  { path: "requestruta", component: RequestRutaComponent,  canActivate: [AppGuard] },
  { path: "started/:id", component: StartPageComponent,  canActivate: [AppGuard] },
  { path: "viajeros-viaje/:id", component: ViajerosViajeComponent, canActivate: [AppGuard] }
  
];

@NgModule({
  imports: [RouterModule.forRoot(properties)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
