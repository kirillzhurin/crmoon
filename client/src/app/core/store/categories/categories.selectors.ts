import { createFeatureSelector, createSelector } from '@ngrx/store'
import { State, adapter } from './categories.state';

const selectCategoriesState = createFeatureSelector<State>('categories');

export const { selectIds, selectAll, selectEntities, selectTotal } = adapter.getSelectors();

export const selectAllCategories = createSelector(
  selectCategoriesState,
  selectAll
);

export const selectCategoryEntities = createSelector(
  selectCategoriesState,
  selectEntities
);

export const selectCategoryById = createSelector(
  selectCategoryEntities,
  (entities, props) => entities[props.id]
);

export const isLoadingCategories = createSelector(
  selectCategoriesState,
  (state: State) => state.loading
);
