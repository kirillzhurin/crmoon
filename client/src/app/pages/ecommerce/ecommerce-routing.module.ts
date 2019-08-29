import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesPageComponent } from './categories-page/categories-page.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CategoryFormComponent } from './categories-page/category-form/category-form.component';
import { OrdersPageComponent } from './orders-page/orders-page.component';
import { ProductsPageComponent } from './products-page/products-page.component';
import { ProductFormComponent } from './products-page/product-form/product-form.component';
import { ProductDetailsComponent } from './products-page/product-details/product-details.component';

const routes: Routes = [
  {
    path: 'categories',
    component: CategoriesPageComponent
  },
  {
    path: 'categories/new',
    component: CategoryFormComponent
  },
  {
    path: 'categories/:id',
    component: CategoryFormComponent
  },
  {
    path: 'cart',
    component: CartPageComponent
  },
  {
    path: 'products',
    component: ProductsPageComponent
  },
  {
    path: 'products/new',
    component: ProductFormComponent
  },
  {
    path: 'products/new/:categoryId',
    component: ProductFormComponent
  },
  {
    path: 'products/:id',
    component: ProductFormComponent
  },
  {
    path: 'product-details/:id',
    component: ProductDetailsComponent
  },
  {
    path: 'orders',
    component: OrdersPageComponent,
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [],
  exports: [RouterModule],
})
export class EcommerceRouterModule {}
