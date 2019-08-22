import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { EcommerceRouterModule } from './ecommerce-routing.module';
import { SharedModule } from '../../shared/shared.module';


import { CategoriesPageComponent } from './categories-page/categories-page.component';
import { CategoryFormComponent } from './categories-page/category-form/category-form.component';
import { OrdersPageComponent } from './orders-page/orders-page.component';

const COMPONENTS = [
  CategoriesPageComponent,
  CategoryFormComponent,
  OrdersPageComponent
]

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgZorroAntdModule, SharedModule, EcommerceRouterModule],
  declarations: [...COMPONENTS],
})
export class EcommerceModule {}
