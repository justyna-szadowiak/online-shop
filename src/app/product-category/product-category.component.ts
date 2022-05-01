import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Product } from '../interfaces';

type Categories = Map<string, Product[]>;

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html'
})
export class ProductCategoryComponent implements OnInit {
  public products: Product[] = [];
  public categories: Categories = new Map();

  constructor(private apiService: ApiService) { }

  async ngOnInit(): Promise<void> {
    this.products = await this.apiService.getProducts();

    this.products.forEach(product => {
      const productsInCategory = this.products.filter(productInCategory => productInCategory.category === product.category)
      this.categories.set(product.category, productsInCategory)
    })
  }

  public getProductsNumber(products: Product[]): number {
    return products.length;
  }
}
