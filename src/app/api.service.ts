import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product, Cart, User } from './interfaces';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  getCarts(): Promise<Cart[]> {
    return lastValueFrom(this.http.get<Cart[]>(`${this.apiUrl}/carts`));
  }

  getProducts(): Promise<Product[]> {
    return lastValueFrom(this.http.get<Product[]>(`${this.apiUrl}/products`));
  }

  getUsers(): Promise<User[]> {
    return lastValueFrom(this.http.get<User[]>(`${this.apiUrl}/users`));
  }
}
