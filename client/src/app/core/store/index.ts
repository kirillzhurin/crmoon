import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';

import * as fromSettings from './settings/settings.reducer';

export interface RootState {
  settings: fromSettings.State
}

export const reducers: ActionReducerMap<RootState> = {
  settings: fromSettings.reducer
}
