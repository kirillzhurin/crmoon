import { createFeatureSelector, createSelector } from '@ngrx/store'
import { State, adapter } from './orders.state';

const selectOrdersState = createFeatureSelector<State>('orders');

export const { selectIds, selectAll, selectEntities, selectTotal } = adapter.getSelectors();

export const selectAllOrders = createSelector(
  selectOrdersState,
  selectAll
);

export const selectOrderEntities = createSelector(
  selectOrdersState,
  selectEntities
);

export const selectOrderById = createSelector(
  selectOrderEntities,
  (entities, props) => entities[props.id]
);



export const selectAllOrdersWithCounting = createSelector(
  selectAllOrders,
  orders => orders.map(order => {
    const counting = order.list.reduce((previous, current) => {
      previous.total += current.quantity * current.price;
      previous.quantity += current.quantity;
      return previous;
    }, {total: 0, quantity: 0 });
    return { ...order, ...counting };
  })
);





