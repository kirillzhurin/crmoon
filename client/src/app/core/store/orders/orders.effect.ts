import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of} from 'rxjs';
import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import * as actions from './orders.actions';
import { OrderService } from '../../services/order.service';

@Injectable()
export class OrdersEffect {
  constructor(
    private actions$: Actions<actions.OrderActions>,
    private orderService: OrderService) {}

  @Effect()
  loadCateories$: Observable<actions.OrderActions> = this.actions$.pipe(
    ofType(actions.LOAD_ORDERS),
    mergeMap((action: actions.LoadOrdersAction) =>
      this.orderService.getAll()
        .pipe(
          map(res => new actions.LoadOrdersSuccessAction(res)),
          catchError(() => of(new actions.LoadOrdersFailAction()))
        )
    )
  );

  @Effect()
  createOrder$: Observable<actions.OrderActions> = this.actions$.pipe(
    ofType(actions.CREATE_ORDER),
    mergeMap(({ payload }: actions.CreateOrderAction) => this.orderService.create(payload)
      .pipe(
        map(res => {
          return new actions.CreateOrderSuccessAction(res);
        }),
        catchError(() => of(new actions.CreateOrderFailAction()))
      )
    )
  );

}
