import { AuthGuardService } from './../guards/auth-guard.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DataTablesModule } from 'angular-datatables';



import { ProductsRoutingModule } from './products-routing.module';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { JwtInterceptor } from '../_helper/jwt.Interceptor';
import { AlertifyService } from '../services/alertify.service';


@NgModule({
  declarations: [ProductsListComponent, ProductDetailsComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule, DataTablesModule, FormsModule, ReactiveFormsModule, ModalModule
  ],
  providers: [AuthGuardService, AlertifyService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }

  ]
})
export class ProductsModule { }
