import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError, switchMap } from 'rxjs/operators';
import { CategoryService} from '../../services/category.service';
import * as actions from './categories.actions';

@Injectable()
export class CategoryEffect {
  constructor(private actions$: Actions, private categoryService: CategoryService) {}

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
    mergeMap(({ payload: { name, image } }: actions.CreateCategoryAction) => this.categoryService.create(name, image)
      .pipe(
        map(res => {
          // 'Category has been created successfully'
          return new actions.CreateCategorySuccessAction(res);
        }),
        catchError(() => of(new actions.GetCategoryFailAction()))
      )
    )
  );

  @Effect()
  updateCategory$: Observable<actions.CategoryActions> = this.actions$.pipe(
    ofType(actions.UPDATE_CATEGORY),
    mergeMap(({ payload: { id, name, image } }: actions.UpdateCategoryAction) => this.categoryService.update(id, name, image)
      .pipe(
        map(res => {
          //'Category has been updated successfully'
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
          // 'Category has been deleted'
          return new actions.DeleteCategorySuccessAction(res.id);
        }),
        catchError(() => of(new actions.DeleteCategoryFailAction()))
      )
    )
  );
}
