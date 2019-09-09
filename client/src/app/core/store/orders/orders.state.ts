import { createEntityAdapter,  EntityAdapter, EntityState } from '@ngrx/entity';
import Order from '../../models/order';

export interface State extends EntityState<Order>{};

export const adapter: EntityAdapter<Order> = createEntityAdapter<Order>({
  selectId: (order: Order) => order._id,
  sortComparer: (e1: Order, e2: Order) => e2.order - e1.order
});

export const initialState: State = adapter.getInitialState();
