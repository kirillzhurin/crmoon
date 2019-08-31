import { initialState, adapter, State } from './orders.state';
import * as actions from './orders.actions';

export function reducer(state: State = initialState, { type, payload }): State {
  switch (type) {
    case actions.LOAD_ORDERS:
      return state;
    case actions.LOAD_ORDERS_SUCCESS:
      return state;
    case actions.LOAD_ORDERS_FAIL:
      return state;
    default:
      return state;
  }
}
