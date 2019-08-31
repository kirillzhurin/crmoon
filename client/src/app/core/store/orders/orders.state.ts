import { createEntityAdapter,  EntityAdapter, EntityState } from '@ngrx/entity';
import Order from '../../models/order';

export interface State extends EntityState<Order>{};

export const adapter: EntityAdapter<Order> = createEntityAdapter<Order>({
  selectId: (order: Order) => order._id
});

export const initialState: State = adapter.getInitialState();
