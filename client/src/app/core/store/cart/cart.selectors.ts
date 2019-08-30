import { createFeatureSelector, createSelector } from '@ngrx/store'
import { State, adapter } from './cart.state';

const selectCartState = createFeatureSelector<State>('cart');

export const { selectIds, selectAll, selectEntities, selectTotal } = adapter.getSelectors();

export const selectAllPositions = createSelector(
  selectCartState,
  selectAll
);

export const selectPositionEntities = createSelector(
  selectCartState,
  selectEntities
);

export const selectPositionById = createSelector(
  selectEntities,
  (entities, props) => entities[props.id]
);

export const selectCountPositions = createSelector(
  selectAllPositions,
  (positions) => positions.reduce((count, position) => count += +position.quantity, 0)
);
