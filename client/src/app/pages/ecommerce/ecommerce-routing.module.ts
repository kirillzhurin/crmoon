import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesPageComponent } from './categories-page/categories-page.component';
import { CategoryFormComponent } from './categories-page/category-form/category-form.component';
import { OrdersPageComponent } from './orders-page/orders-page.component';

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
    path: 'products',
    component: OrdersPageComponent
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
