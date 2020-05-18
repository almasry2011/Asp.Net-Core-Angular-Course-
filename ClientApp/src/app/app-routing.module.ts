import { AuthGuardService } from './guards/auth-guard.service';
import { AccessDeniedComponent } from './errors/access-denied/access-denied.component';
import { Product } from './Interfaces/product';
import { ProductsModule } from './products/products.module';
import { RegisterComponent } from './register/register.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "products", loadChildren: "./Products/products.module#ProductsModule" },
  { path: "access-denied", component: AccessDeniedComponent },

  { path: "**", redirectTo: "/home" },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
