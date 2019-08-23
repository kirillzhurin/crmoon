import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable} from 'rxjs';
import { RootState} from 'src/app/core/store';
import { selectAllCategories, isLoadingCategories, LoadCategoriesAction, GetCategoryAction } from 'src/app/core/store/categories';
import Category from 'src/app/core/models/category';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.scss']
})
export class CategoriesPageComponent implements OnInit {
  categories$: Observable<Category[]>
  loading$: Observable<boolean>;
  emptyImage = 'assets/images/ecommerce/ecommerce-empty.jpg';

  constructor(private store: Store<RootState>, private router: Router) {
  }

  ngOnInit() {
    this.store.dispatch(new LoadCategoriesAction());
    this.categories$ = this.store.select(selectAllCategories);
    this.loading$ = this.store.select(isLoadingCategories);
  }

}
