import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";



@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient, private router: Router) { }
  private baseUrlLogin: string = "/api/account/login";
  private baseUrlRegister: string = "/api/account/register";
  private loginStatus = new BehaviorSubject<boolean>(this.checkLoginStatus());
  private UserName = new BehaviorSubject<string>(localStorage.getItem('username'));
  private UserRole = new BehaviorSubject<string>(localStorage.getItem('userRole'));


  //Login Method
  login(username: string, password: string) {
    // pipe() let you combine multiple functions into a single function. 
    // pipe() runs the composed functions in sequence.
    return this.http.post<any>(this.baseUrlLogin, { username, password }).pipe(


      map(result => {

        // login successful if there's a jwt token in the response
        if (result && result.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes

          this.loginStatus.next(true);
          localStorage.setItem('loginStatus', '1');
          localStorage.setItem('jwt', result.token);
          localStorage.setItem('username', result.username);
          localStorage.setItem('expiration', result.expiration);
          localStorage.setItem('userRole', result.userRole);
          this.UserName.next(localStorage.getItem('username'));
          this.UserRole.next(localStorage.getItem('userRole'));


        }

        return result;

      })

    );
  }


  Register(username: string, password: string, email: string) {

    return this.http.post<any>(this.baseUrlRegister, { username, password, email }).pipe(
      map(result => { return result; },
        error => { return error }
      )

    )

  }
  checkLoginStatus(): boolean {

    var loginCookie = localStorage.getItem("loginStatus");

    if (loginCookie == "1") {
      if (localStorage.getItem('jwt') === null || localStorage.getItem('jwt') === undefined) {
        return false;
      }


      if (!this.IsExpired()) {
        return true;
      }
    }
    return false;
  }

  logout() {
    localStorage.removeItem('loginStatus');
    localStorage.removeItem('jwt');
    localStorage.removeItem('username');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userRole');
    this.loginStatus.next(false);

  }

  IsExpired(): boolean {

    const helper = new JwtHelperService();
    var token = localStorage.getItem('jwt');
    const decodedToken = helper.decodeToken(token);
    const expirationDate = helper.getTokenExpirationDate(token);
    const isExpired = helper.isTokenExpired(token);

    if (isExpired) {
      alert(isExpired)
      return true;
    }
    return false
    alert(isExpired)

  }


  public get isLoggesIn() {
    return this.loginStatus.asObservable();
  }

  get currentUserName() {
    return this.UserName.asObservable();
  }

  get currentUserRole() {
    return this.UserRole.asObservable();
  }





}
