import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions, Headers } from "@angular/http";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  checkbox = false

  constructor(private http: Http, private route: Router) { }

  ngOnInit() {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("password");
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("password");

  }

  checkboxChecked(n) {
    if (n.target.checked) {
      this.checkbox = true
    } else {
      this.checkbox = false
    }
    console.log(this.checkbox)
  }

  login(f: NgForm) {

    let obj = {};
    if (f.value.usernameOrEmail == null || f.value.password == null || f.value.usernameOrEmail == "" || f.value.password == "") {
      console.log("All field must be filled")
    } else {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(f.value.usernameOrEmail)) {
        obj = {
          email: f.value.usernameOrEmail,
          password: f.value.password
        }
      } else {
        obj = {
          username: f.value.usernameOrEmail,
          password: f.value.password
        }
      }

      let header = new Headers({ "Content-Type": "application/json" })
      let options = new RequestOptions({ headers: header });

      this.http.post("http://localhost:3000/api/login/login", obj, options)
        .subscribe(
        result => {
          console.log(result.json());
          if (this.checkbox == true) {
            localStorage.setItem("token", result.json().token);
            localStorage.setItem("username", result.json().username);
            localStorage.setItem("password", result.json().password);
          } else {
            sessionStorage.setItem("token", result.json().token);
            sessionStorage.setItem("username", result.json().username);
            sessionStorage.setItem("password", result.json().password);
          }

          f.value.usernameOrEmail = null
          f.value.password = null

          this.route.navigate(["/"])
        },
        error => {
          console.log("User Not Found");
        }
        )
    }
  }

}
