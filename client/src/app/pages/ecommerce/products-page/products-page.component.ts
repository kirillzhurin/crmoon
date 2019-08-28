import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router} from '@angular/router';
import { Store, select} from '@ngrx/store';
import { Observable, Subject, combineLatest, BehaviorSubject } from 'rxjs';
import { switchMap, map, debounceTime, distinctUntilChanged, skipWhile, takeWhile } from 'rxjs/operators';
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
export class ProductsPageComponent implements OnInit, AfterViewInit {
  products$: Observable<Product[]>;
  categories$: Observable<Category[]>;
  loadingCategories$: Observable<boolean>;
  loadingProducts$: Observable<boolean>;
  activeCategory$: BehaviorSubject<Category|null> = new BehaviorSubject(null);
  searchTerm$: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(private store: Store<RootState>, private router: Router) { }

  ngOnInit() {
    this.store.dispatch(new LoadCategoriesAction());
    this.categories$ = this.store.select(selectAllCategories);

    this.products$ = combineLatest(this.activeCategory$.pipe(skipWhile(activeCategory => !!activeCategory)), this.searchTerm$.pipe(debounceTime(300), distinctUntilChanged())).pipe(
      switchMap(([ activeCategory, term ]) => {
        return this.store.pipe(
          select(selectProductsByCategory, {categoryId: activeCategory._id}),
          map(products => products.filter(product => product.title.toUpperCase().indexOf(term.toUpperCase()) > -1)));
      })
    );
  }

  ngAfterViewInit() {
    // Select first category
    this.categories$.pipe(
      takeWhile(categories => !categories.length, true)
    ).subscribe(categories => {
      if (categories.length) {
        this.selectCategory(categories[0]);
      }
    });
  }

  onSearch(event) {
    this.searchTerm$.next(event.target.value);
  }

  selectCategory(category) {
    this.activeCategory$.next(category);
    this.store.dispatch(new LoadProductsAction(category._id));
  }

  navigateTo(commands) {
    this.router.navigate(commands);
  }
}
