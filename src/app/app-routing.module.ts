import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "./app.component";
import { LoginPageComponent } from "./login/login.component";
import { HomePageComponent } from "./home/home.component";
import { NewrutaComponent } from "./newruta/newruta.component";
import { StartPageComponent } from "./startruta/start-ruta.component";
import { RequestRutaComponent } from "./request-ruta/request-ruta.component";

const properties: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "login", component: LoginPageComponent },
  { path: "home", component: HomePageComponent },
  { path: "newruta", component: NewrutaComponent },
  { path: "requestruta", component: RequestRutaComponent },
  { path: "started", component: StartPageComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(properties)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
