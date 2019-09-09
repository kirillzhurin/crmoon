import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { EcommerceRouterModule } from './ecommerce-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { CategoriesPageComponent } from './categories-page/categories-page.component';
import { CategoryFormComponent } from './categories-page/category-form/category-form.component';
import { OrdersPageComponent } from './orders-page/orders-page.component';
import { ProductsPageComponent } from './products-page/products-page.component';
import { ProductFormComponent } from './products-page/product-form/product-form.component';
import { ProductDetailsComponent } from './products-page/product-details/product-details.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { OrderDetailsComponent } from './orders-page/order-details/order-details.component';

const COMPONENTS = [
  CategoriesPageComponent,
  CategoryFormComponent,
  OrdersPageComponent,
  OrderDetailsComponent,
  ProductsPageComponent,
  ProductFormComponent,
  ProductDetailsComponent,
  CartPageComponent
]

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgZorroAntdModule, SharedModule, EcommerceRouterModule],
  declarations: [...COMPONENTS],
})
export class EcommerceModule {}
