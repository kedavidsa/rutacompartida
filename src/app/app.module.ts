import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgmCoreModule } from '@agm/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
//Routing
import { AppRoutingModule } from "./app-routing.module";
import { AngularFontAwesomeModule } from "angular-font-awesome/angular-font-awesome";
//Pages
import { LoginPageComponent } from "./login/login.component";
import { HomePageComponent } from "./home/home.component";

import { StartPageComponent } from "./startruta/start-ruta.component";

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { HttpModule } from '@angular/http';
import { ToastModule } from 'ng2-toastr/ng2-toastr';

import {
  MdAutocompleteModule,
  MdButtonModule,
  MdButtonToggleModule,
  MdCardModule,
  MdCheckboxModule,
  MdChipsModule,
  MdDatepickerModule,
  MdDialogModule,
  MdExpansionModule,
  MdGridListModule,
  MdIconModule,
  MdInputModule,
  MdListModule,
  MdMenuModule,
  MdNativeDateModule,
  MdPaginatorModule,
  MdProgressBarModule,
  MdProgressSpinnerModule,
  MdRadioModule,
  MdRippleModule,
  MdSelectModule,
  MdSidenavModule,
  MdSliderModule,
  MdSlideToggleModule,
  MdSnackBarModule,
  MdSortModule,
  MdTableModule,
  MdTabsModule,
  MdToolbarModule,
  MdTooltipModule,
  MdStepperModule
} from "@angular/material";
import { NewrutaComponent } from './newruta/newruta.component';
import { LoginService } from "./login.service";
import { RutasService } from "./rutas.service";
import { AngularFireDatabase } from "angularfire2/database";
import { RequestRutaComponent } from './request-ruta/request-ruta.component';
import { AppGuard } from "./app.guard";
import { LoginGuard } from "./login.guard";
export const config = {
  apiKey: "AIzaSyC_CwlZTdycKDkbbmbF7ztxqmehYVj3kP8",
  authDomain: "afiny4pt.firebaseapp.com",
  databaseURL: "https://afiny4pt.firebaseio.com",
  projectId: "afiny4pt",
  storageBucket: "afiny4pt.appspot.com",
  messagingSenderId: "378278091539"
};
@NgModule({
  declarations: [AppComponent, HomePageComponent, LoginPageComponent, NewrutaComponent,StartPageComponent, RequestRutaComponent],
  imports: [
    ToastModule.forRoot(),
    HttpModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MdAutocompleteModule,
    MdButtonModule,
    MdButtonToggleModule,
    MdCardModule,
    MdCheckboxModule,
    MdChipsModule,
    MdStepperModule,
    MdDatepickerModule,
    MdDialogModule,
    MdExpansionModule,
    MdGridListModule,
    MdIconModule,
    MdInputModule,
    MdListModule,
    MdMenuModule,
    MdNativeDateModule,
    MdPaginatorModule,
    MdProgressBarModule,
    MdProgressSpinnerModule,
    MdRadioModule,
    MdRippleModule,
    MdSelectModule,
    MdSidenavModule,
    MdSliderModule,
    MdSlideToggleModule,
    MdSnackBarModule,
    MdSortModule,
    MdTableModule,
    MdTabsModule,
    MdToolbarModule,
    MdTooltipModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCb-zSaO_XizGF7fgnsBeLX5-MeRvVMagw'
    }),
    AngularFireModule.initializeApp(config),
    BrowserAnimationsModule
  ],
  exports: [
    MdAutocompleteModule,
    MdButtonModule,
    MdButtonToggleModule,
    MdCardModule,
    MdCheckboxModule,
    MdChipsModule,
    MdStepperModule,
    MdDatepickerModule,
    MdDialogModule,
    MdExpansionModule,
    MdGridListModule,
    MdIconModule,
    MdInputModule,
    MdListModule,
    MdMenuModule,
    MdNativeDateModule,
    MdPaginatorModule,
    MdProgressBarModule,
    MdProgressSpinnerModule,
    MdRadioModule,
    MdRippleModule,
    MdSelectModule,
    MdSidenavModule,
    MdSliderModule,
    MdSlideToggleModule,
    MdSnackBarModule,
    MdSortModule,
    MdTableModule,
    MdTabsModule,
    MdToolbarModule,
    MdTooltipModule
  ],
  providers: [LoginService, AngularFireAuth, AngularFireDatabase, RutasService, LoginGuard, AppGuard ],
  bootstrap: [AppComponent]
})
export class AppModule {}
