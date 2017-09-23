import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "./app.component";
import { LoginPageComponent } from "./login/login.component";
import { HomePageComponent } from "./home/home.component";
import { NewrutaComponent } from "./newruta/newruta.component";

const properties: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "login", component: LoginPageComponent },
  { path: "home", component: HomePageComponent },
  {   path: "newruta", component: NewrutaComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(properties)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
