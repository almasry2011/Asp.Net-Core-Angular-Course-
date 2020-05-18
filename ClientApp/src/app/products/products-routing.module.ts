import { ProductDetailsComponent } from './product-details/product-details.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsListComponent } from './products-list/products-list.component';
import { AuthGuardService } from '../guards/auth-guard.service';


const routes: Routes = [
  { path: "", component: ProductsListComponent, canActivate: [AuthGuardService] },
  { path: "products-list", component: ProductsListComponent, canActivate: [AuthGuardService] },
  { path: ":id", component: ProductDetailsComponent, canActivate: [AuthGuardService] },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
