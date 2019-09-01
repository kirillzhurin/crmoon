import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { RootState } from '../';
import { Actions, ofType, Effect} from '@ngrx/effects';
import { adapter } from './cart.state';
import { Observable, of } from 'rxjs';
import { mergeMap, tap, withLatestFrom, switchMap } from 'rxjs/operators';
import * as actions from './cart.actions';
import { selectPositionEntities, selectCartState } from './cart.selectors';
import { environment } from 'src/environments/environment'

@Injectable()
export class CartEffect {
  cartStorageKey = environment.CART_STORAGE_KEY;
  constructor(private actions$: Actions, private store$: Store<RootState>){}

  @Effect()
  syncLocalStorageStart$: Observable<actions.CartActions> = this.actions$.pipe(
    ofType<actions.SyncLocalStorageStartAction>(actions.SYNC_LOCAL_STORAGE_START),
    switchMap(() => {
      const state = JSON.parse(localStorage.getItem(this.cartStorageKey));
      return of(new actions.SyncLocalStorageEndAction(state));
    })
  );

  @Effect()
  addPosiotion$: Observable<actions.CartActions> = this.actions$.pipe(
    ofType<actions.AddPositionAction>(actions.ADD_POSITION),
    withLatestFrom(this.store$.pipe(select(selectPositionEntities))),
    mergeMap(([action, entities]) => {
      const id = adapter.selectId(action.payload);
      if (entities[id]) {
        action.payload.quantity += entities[id].quantity;
        return of(new actions.UpdatePositionAction(action.payload));
      }
      return of(new actions.AddPositionSuccessAction(action.payload))
    })
  );

  @Effect({ dispatch: false })
  addPosiotionSuccess$ = this.actions$.pipe(
    ofType<actions.CartActions>(
      actions.ADD_POSITION_SUCCESS,
      actions.UPDATE_POSITION,
      actions.DELETE_POSITION,
      actions.CLEAR_CART
    ),
    mergeMap(() => this.store$.pipe(select(selectCartState))),
    tap((state) => localStorage.setItem(this.cartStorageKey, JSON.stringify(state)))
  );
}
