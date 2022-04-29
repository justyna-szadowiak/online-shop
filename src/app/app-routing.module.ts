import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProductCategoryComponent } from './product-category/product-category.component';

const routes: Routes = [
  {path: '', redirectTo: 'product-category', pathMatch: 'full'},
  {path: 'product-category', component: ProductCategoryComponent},
  {path: 'cart', component: CartComponent},
  {
    path: '404',
    component: PageNotFoundComponent,
  },
  {
    path: '**',
    redirectTo: '/404',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
