import { Component } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
  selector: "login-page",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginPageComponent {
  title = "Login";
  emailFormControl = new FormControl("", [
    Validators.required,
    Validators.pattern(EMAIL_REGEX)
  ]);
  passwordFormControl = new FormControl("", [Validators.required]);
  constructor(private router: Router) {}
  login(){
    this.router.navigate(["/home"]);
  }
}
