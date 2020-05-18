import { AccountService } from './../services/account.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {

  isLoggesIn$: Observable<boolean>;
  currentUserName$: Observable<string>;
  constructor(private acc: AccountService) { }


  ngOnInit(): void {
    this.isLoggesIn$ = this.acc.isLoggesIn;
    this.currentUserName$ = this.acc.currentUserName;
  }

  logout() {
    this.acc.logout();

  }



}
