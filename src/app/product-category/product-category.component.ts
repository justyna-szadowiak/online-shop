import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { Product } from '../interfaces';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.scss']
})
export class ProductCategoryComponent implements OnInit {
  panelOpenState = false;

  products$: Observable<Product[]> | undefined;
  productsByCategory$: Observable<any> | undefined;

  constructor(
    public endpoints: ApiService
  ) { }

  ngOnInit(): void {
    this.products$ = this.endpoints.getAllProducts();
  }

}
