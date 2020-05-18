import { Injectable } from '@angular/core'; import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountService } from '../services/account.service';



@Injectable({
    providedIn: 'root'
})


export class JwtInterceptor implements HttpInterceptor {
    constructor(private acct: AccountService) { }



    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let currentuser = this.acct.isLoggesIn;
        let token = localStorage.getItem('jwt');

        if (currentuser && token !== undefined) {
            req = req.clone({
                setHeaders:
                {
                    Authorization: `Bearer ${token}`,
                    // 'Content-Type': 'application/json'
                }
            });
        }

        console.log(req);
        return next.handle(req);
    }






}