import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Cart, Product, User } from '../interfaces';

interface Summary {
  userId: number;
  sum: number;
}

interface HighestSummary {
  user?: User,
  sum: number
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {
  public carts: Cart[] = [];
  public highestSummary: HighestSummary = {sum: 0};
  public isHighestSummaryVisible = false;
  private summaryList: Summary[] = [];
  private products: Product[] = [];
  private users: User[] = [];

  constructor(private apiService: ApiService) {
  }

  async ngOnInit(): Promise<void> {
    this.carts = await this.apiService.getCarts();
    this.products = await this.apiService.getProducts();
    this.users = await this.apiService.getUsers();
  }

  public getProduct(productId: number): Product | undefined {
    return this.products.find(product => product.id === productId)
  }

  public getUser(userId: number): User | undefined {
    return this.users.find(user => user.id === userId)
  }

  public getSummary(cart: Cart): number {
    const sum = cart.products.map(cartProduct => {
      const product = this.getProduct(cartProduct.productId);
      return product ? product?.price * cartProduct.quantity : 0;
    }).reduce((prev, curr) => prev + curr);
    this.summaryList.push({userId: cart.userId, sum});
    return sum;
  }

  public calculateHighestSummary(): void {
    if(this.summaryList.length) {
      const summary = this.summaryList.sort((prev, curr) => curr.sum - prev.sum)[0];
      const user = this.getUser(summary.userId)
      const {sum} = summary;
      this.highestSummary = {user, sum}
    } else {
      this.highestSummary = {sum: 0}
    }
    this.isHighestSummaryVisible = true;
  }
}
