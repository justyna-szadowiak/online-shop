import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { Product, Cart } from '../interfaces';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  products$: Observable<Product[]>;
  carts$: Observable<Cart[]>;

  constructor(
    private apiService: ApiService
  ) {
    this.products$ = this.apiService.getAllProducts();
    this.carts$ = this.apiService.getAllCarts();
  }




  ngOnInit(): void {
  }

}
