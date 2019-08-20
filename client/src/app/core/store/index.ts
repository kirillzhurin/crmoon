import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from 'src/environments/environment.prod';
import * as fromSettings from './settings/settings.reducer';
import * as fromCategories from './categories';

export interface RootState {
  settings: fromSettings.State,
  categories: fromCategories.State
}

export const reducers: ActionReducerMap<RootState> = {
  settings: fromSettings.reducer,
  categories: fromCategories.reducer
}

export const metaReducers: MetaReducer<RootState>[] =!environment.production ? [] : [];
