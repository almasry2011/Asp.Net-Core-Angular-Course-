import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AccountService } from '../services/account.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private acct: AccountService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    const destination: string = state.url;
    const productId = route.params.id;

    var isLogged = false;
    this.acct.isLoggesIn.subscribe(res => isLogged = res)
    if (!isLogged) {
      this.router.navigate(['/login'], { queryParams: { returnUrl: destination } });
      alert("")
      return false;
    }

    if (isLogged) {
      // if the user is already logged in
      switch (destination) {
        case '/products':
        case '/products/' + productId:
          {
            if (localStorage.getItem("userRole") === "Customer" || localStorage.getItem("userRole") === "Admin" || localStorage.getItem("userRole") === "Moderator") {
              return true;
            }
          }

        case '/products/update':
          {
            if (localStorage.getItem("userRole") === "Customer" || localStorage.getItem("userRole") === "Moderator") {
              this.router.navigate(['/access-denied'])

              return false;
            }

            if (localStorage.getItem("userRole") === "Admin") {

              return true;
            }

          }

        default:
          return false;
      }








    }






    return false;


  }
}
