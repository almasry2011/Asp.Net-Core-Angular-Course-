import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AccountService } from '../services/account.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  LoginForm: FormGroup;
  username: FormControl;
  password: FormControl;
  returnUrl: string;
  ErrorMessage: string;
  invalidLogin: boolean;

  constructor(private FB: FormBuilder,
    private acct: AccountService,
    private router: Router,
    private route: ActivatedRoute,

  ) { }

  ngOnInit(): void {
    this.username = new FormControl("", [Validators.required]);
    this.password = new FormControl("", [Validators.required]);

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';


    this.LoginForm = this.FB.group({
      "username": this.username,
      "password": this.password
    });

  }


  OnSubmitLogin() {
    console.log(this.LoginForm.value);
    var loginForm = this.LoginForm.value;
    this.acct.login(loginForm.username, loginForm.password).subscribe(result => {

      let token = result.token;
      console.log(token);
      console.log(result.userRole);
      console.log("User Logged In Successfully");
      this.invalidLogin = false;
      console.log(this.returnUrl);
      this.router.navigateByUrl(this.returnUrl);

    },
      error => {
        this.invalidLogin = true;

        this.ErrorMessage = error.error.loginError;

        console.log(this.ErrorMessage);
      })

    alert(this.LoginForm.value);

  }




}
