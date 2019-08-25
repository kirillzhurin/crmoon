import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State, adapter } from './products.state';

const selectProductsState = createFeatureSelector<State>('products');

export const { selectIds, selectAll, selectEntities, selectTotal } = adapter.getSelectors();

export const selectAllProducts = createSelector(
  selectProductsState,
  selectAll
);

export const selectProductEntities = createSelector(
  selectProductsState,
  selectEntities
)

export const selectProductById = createSelector(
  selectProductEntities,
  (entities, props) => entities[props.id]
);

export const isLoadingProducts = createSelector(
  selectProductsState,
  (state: State) => state.loading
)

