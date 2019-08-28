import { Component, OnInit } from '@angular/core';
import { Store, select} from '@ngrx/store';
import { Observable, Subject, combineLatest, BehaviorSubject } from 'rxjs';
import { switchMap, map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { RootState } from 'src/app/core/store';
import Category from 'src/app/core/models/category';
import Product from 'src/app/core/models/product';
import { selectProductsByCategory, LoadProductsAction } from 'src/app/core/store/products';
import { selectAllCategories, LoadCategoriesAction, LOAD_CATEGORIES_SUCCESS } from 'src/app/core/store/categories';

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
  searchTerm$: BehaviorSubject<string> = new BehaviorSubject('');
  constructor(private store: Store<RootState>) { }

  ngOnInit() {
    this.store.dispatch(new LoadCategoriesAction());
    this.categories$ = this.store.select(selectAllCategories);
    this.products$ = combineLatest(this.activeCategory$, this.searchTerm$.pipe(debounceTime(300), distinctUntilChanged())).pipe(
      switchMap(([ category, term ]) => {
        return this.store.pipe(
          select(selectProductsByCategory, {categoryId: category._id}),
          map(products => products.filter(product => product.title.toUpperCase().indexOf(term.toUpperCase()) > -1)));
      })
    );
  }

  onSearch(event) {
    this.searchTerm$.next(event.target.value);
  }

  selectCategory(category) {
    this.activeCategory$.next(category);
    this.store.dispatch(new LoadProductsAction(category._id));
  }
}
