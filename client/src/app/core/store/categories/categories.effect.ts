import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import { CategoryService } from '../../services/category.service';
import * as actions from './categories.actions';

@Injectable()
export class CategoryEffect {
  constructor(private actions$: Actions, private categoryService: CategoryService, private router: Router) {}

  @Effect()
  loadCateories$: Observable<actions.CategoryActions> = this.actions$.pipe(
    ofType(actions.LOAD_CATEGORIES),
    mergeMap((action: actions.LoadCategoriesAction) =>
      this.categoryService.getAll()
        .pipe(
          map(res => new actions.LoadCategoriesSuccessAction(res)),
          catchError(() => of(new actions.LoadCategoriesFailAction()))
        )
    )
  );

  @Effect()
  getCategory$: Observable<actions.CategoryActions> = this.actions$.pipe(
    ofType(actions.GET_CATEGORY),
    mergeMap((action: actions.GetCategoryAction) =>
      this.categoryService.getById(action.payload)
        .pipe(
          map(res => new actions.GetCategorySuccessAction(res)),
          catchError(() => of(new actions.GetCategoryFailAction()))
        )
    )
  );

  @Effect()
  createCategory$: Observable<actions.CategoryActions> = this.actions$.pipe(
    ofType(actions.CREATE_CATEGORY),
    mergeMap(({ payload }: actions.CreateCategoryAction) => this.categoryService.create(payload)
      .pipe(
        map(res => {
          return new actions.CreateCategorySuccessAction(res);
        }),
        catchError(() => of(new actions.CreateCategoryFailAction()))
      )
    )
  );

  @Effect()
  updateCategory$: Observable<actions.CategoryActions> = this.actions$.pipe(
    ofType(actions.UPDATE_CATEGORY),
    mergeMap(({ payload }: actions.UpdateCategoryAction) => this.categoryService.update(payload)
      .pipe(
        map(res => {
          return new actions.UpdateCategorySuccessAction(res);
        }),
        catchError(() => of(new actions.UpdateCategoryFailAction()))
      )
    )
  );

  @Effect()
  deleteCategory$: Observable<actions.CategoryActions> = this.actions$.pipe(
    ofType(actions.DELETE_CATEGORY),
    mergeMap(({ payload: id }: actions.DeleteCategoryAction) => this.categoryService.delete(id)
      .pipe(
        map(res => {
          return new actions.DeleteCategorySuccessAction(res);
        }),
        catchError((err) => {
            return of(new actions.DeleteCategoryFailAction())
          }
        )
      )
    )
  );

  @Effect({ dispatch: false })
  navigateToCategories$ = this.actions$.pipe(
    ofType(actions.DELETE_CATEGORY_SUCCESS, actions.CREATE_CATEGORY_SUCCESS),
    tap(() => this.router.navigate(['/ecommerce/categories']))
  );
}
