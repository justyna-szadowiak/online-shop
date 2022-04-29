import {HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cart, Product, User } from './interfaces';
import * as users from '../app/data/users.json';
import * as products from '../app/data/products.json';
import * as carts from '../app/data/carts.json';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private userCookieKey = `${environment.cookieKey}user`;
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {
  }


  getAllUsers(): Observable<User[]>{
    return of(users)
  }

  getAllProducts(): Observable<Product[]>{
    return of(products)
  }

  getAllCarts(): Observable<Cart[]>{
    return of(carts)
  }

  getAllProductsByCategory(categoryName: string): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.apiUrl}/products/${categoryName}`)
  }
}
