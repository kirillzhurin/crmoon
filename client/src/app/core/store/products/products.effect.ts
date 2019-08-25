import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import { ProductService } from '../../services/product.service';
import * as actions from './products.actions';

@Injectable()
export class ProductEffect {
  constructor(private actions$: Actions, private productService: ProductService, private router: Router) {}

  @Effect()
  loadProducts$: Observable<actions.ProductActions> = this.actions$.pipe(
    ofType(actions.LOAD_PRODUCTS),
    mergeMap((action: actions.LoadProductsAction) =>
      this.productService.getAll()
        .pipe(
          map(res => new actions.LoadProductsSuccessAction(res)),
          catchError(() => of(new actions.LoadProductsFailAction()))
        )
    )
  );

  @Effect()
  getProduct$: Observable<actions.ProductActions> = this.actions$.pipe(
    ofType(actions.GET_PRODUCT),
    mergeMap((action: actions.GetProductAction) =>
      this.productService.getById(action.payload)
        .pipe(
          map(res => new actions.GetProductSuccessAction(res)),
          catchError(() => of(new actions.GetProductFailAction()))
        )
    )
  );

  @Effect()
  updateProduct$: Observable<actions.ProductActions> = this.actions$.pipe(
    ofType(actions.UPDATE_PRODUCT),
    mergeMap(({ payload }: actions.UpdateProductAction) => this.productService.update(payload)
      .pipe(
        map(res => {
          return new actions.UpdateProductSuccessAction(res);
        }),
        catchError(() => of(new actions.UpdateProductFailAction()))
      )
    )
  );

  @Effect()
  deleteProduct$: Observable<actions.ProductActions> = this.actions$.pipe(
    ofType(actions.DELETE_PRODUCT),
    mergeMap(({ payload: id }: actions.DeleteProductAction) => this.productService.delete(id)
      .pipe(
        map(res => {
          return new actions.DeleteProductSuccessAction(res);
        }),
        catchError((err) => {
            return of(new actions.DeleteProductFailAction())
          }
        )
      )
    )
  );

  @Effect({ dispatch: false })
  navigateToProducts$ = this.actions$.pipe(
    ofType(actions.DELETE_PRODUCT_SUCCESS, actions.CREATE_PRODUCT_SUCCESS),
    tap(() => this.router.navigate(['/ecommerce/categories']))
  );
}
