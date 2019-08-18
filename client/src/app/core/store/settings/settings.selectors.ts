import {
  createFeatureSelector,
  createSelector
} from '@ngrx/store';

import { State } from './settings.reducer';


export const selectSettingsState = createFeatureSelector<State>('settings');

export const selectSettings = createSelector(
  selectSettingsState,
  (state: State) => state
);
