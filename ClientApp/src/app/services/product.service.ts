import { Product } from './../Interfaces/product';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProdctClass } from '../_helper/prodct-class';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) { }
  baseUrl = '/api/product/';

  GetProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl + 'GetProducts');
  }
  GetProduct(id: number): Observable<Product> {
    return this.http.get<Product>(this.baseUrl + `GetProduct/${id}`);
  }


  AddProduct(model: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl + 'AddProduct', model);
  }

  UpdateProduct(id: number, model: Product): Observable<Product> {

    return this.http.put<Product>(this.baseUrl + `UpdateProduct/${id}`, model);

  }

  DeleteProduct(id: number) {
    return this.http.delete<Product>(this.baseUrl + `DeleteProduct/${id}`);
  }


}
