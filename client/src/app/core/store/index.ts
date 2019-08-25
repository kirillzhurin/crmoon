import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from 'src/environments/environment.prod';
import * as fromSettings from './settings/settings.reducer';
import * as fromCategories from './categories';
import * as fromProducts from './products';

export interface RootState {
  settings: fromSettings.State,
  categories: fromCategories.State,
  products: fromProducts.State
}

export const reducers: ActionReducerMap<RootState> = {
  settings: fromSettings.reducer,
  categories: fromCategories.reducer,
  products: fromProducts.reducer
}

export const metaReducers: MetaReducer<RootState>[] =!environment.production ? [] : [];
