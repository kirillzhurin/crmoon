import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, Observer, of } from 'rxjs';
import { RootState} from 'src/app/core/store';
import { selectcAllCategories, isLoadingCategories, LoadCategoriesAction, GetCategoryAction } from 'src/app/core/store/categories';
import Category from 'src/app/core/models/category';

declare var require: any
const data: any = require('./data.json')
@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.scss']
})
export class CategoriesPageComponent implements OnInit {
  categoriesDemo$ = of(data.categories);
  categories$: Observable<Category[]>
  loading$: Observable<boolean>;

  constructor(private store: Store<RootState>, private router: Router) {

  }

  onLoad() {
    this.store.dispatch(new LoadCategoriesAction());
  }

  ngOnInit() {

    this.categories$ = this.store.select(selectcAllCategories);
    this.loading$ = this.store.select(isLoadingCategories);
  }

}
