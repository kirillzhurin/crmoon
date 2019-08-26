import { Component, OnInit } from '@angular/core';
import { Store, select} from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { RootState } from 'src/app/core/store';
import Category from 'src/app/core/models/category';
import Product from 'src/app/core/models/product';
import { selectProductsByCategory, LoadProductsAction } from 'src/app/core/store/products';
import { selectAllCategories, LoadCategoriesAction, LOAD_CATEGORIES_SUCCESS } from 'src/app/core/store/categories';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss']
})
export class ProductsPageComponent implements OnInit {
  products$: Observable<Product[]>;
  categories$: Observable<Category[]>;
  loadingCategories$: Observable<boolean>;
  loadingProducts$: Observable<boolean>;
  activeCategory$: Subject<Category> = new Subject();

  constructor(private store: Store<RootState>) { }

  ngOnInit() {
    this.store.dispatch(new LoadCategoriesAction());
    this.categories$ = this.store.select(selectAllCategories);
    this.products$ = this.activeCategory$.pipe(
        switchMap(({ _id }: Category ) => this.store.select(selectProductsByCategory, {categoryId: _id}))
      );
  }

  selectCategory(category) {
    this.activeCategory$.next(category);
    this.store.dispatch(new LoadProductsAction(category._id));
  }
}
