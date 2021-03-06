import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from 'src/environments/environment.prod';
import * as fromSettings from './settings/settings.reducer';
import * as fromCategories from './categories';
import * as fromProducts from './products';
import * as fromOrders from './orders';
import * as fromCart from './cart';


export interface RootState {
  settings: fromSettings.State,
  cart: fromCart.State,
  categories: fromCategories.State,
  products: fromProducts.State,
  orders: fromOrders.State
}

export const reducers: ActionReducerMap<RootState> = {
  settings: fromSettings.reducer,
  cart: fromCart.reducer,
  categories: fromCategories.reducer,
  products: fromProducts.reducer,
  orders: fromOrders.reducer
}

export const metaReducers: MetaReducer<RootState>[] =!environment.production ? [] : [];
